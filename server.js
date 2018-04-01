const { cardsInitialState, _startNewGame, _toggleCard, _checkSet, _collectSet, _deal, _cleanBoard, tTime } = require('./src/utils')

const io = require('socket.io')();

function getServerInitialState() {
  return Object.assign({}, cardsInitialState, {
    activeUser: '',
    lockedUsers: {},
  })
}

let gameStates = {}; //map<roomId, gameState>
let lockTimeouts = {}; //map<roomId, lockTimeout>
//have to store the clientIds here for to emit locked state
let clientIds = []
var roomPK = 1;
let rooms = []

function syncRooms(clientId) {
  (clientId ? io.to(clientId) : io).emit('fetch_rooms_list', rooms)
}

function sync(roomId) {
  let gameState = gameStates[roomId]
  io.in(roomId).emit('sync', gameState)

  for (let clientId of clientIds) {
    const isLocked = gameState && gameState.lockedUsers ? !!gameState.lockedUsers[clientId] : false
    io.to(clientId).emit('is_locked', isLocked)
  }
}

let modStateAndSync = (roomId, fn) => (...args) => {
  gameStates[roomId] = fn(...args)
  sync(roomId)
  return gameStates[roomId]
}

io.on('connection', (client) => {
  console.log(client.id)
  clientIds.push(client.id)

  client.on('view_rooms', () => {
    syncRooms(client.id)
  })

  client.on('new_room', () => {
    const newRoomId = `Room_${roomPK++}`;
    rooms.push(newRoomId)
    syncRooms()
  })

  client.on('join_room', (roomId) => {
    //client should leave all other rooms and join this one room.
    for (let room of rooms.filter(r=>r!=roomId)) {
      client.leave(room)
    }
    client.join(roomId, () => {
      if (gameStates[roomId]) {
        sync(roomId)
      } else {
        newGame(roomId)
      }
    })

  })

  client.on('init_board', (roomId) => {
    sync(roomId)
  })

  client.on('init_game', (roomId) => {
    newGame(roomId)
  })

  client.on('deal', (roomId) => {
    let gameState = gameStates[roomId]
    modStateAndSync(roomId, _deal)(gameState)
  })

  function newGame(roomId) {
    modStateAndSync(roomId, _startNewGame)(getServerInitialState())
  }
  function onBadSet(gameState) {
    //bad set. lock user and clear out selected and active user
    gameState.activeUser = null
    gameState.selected = {}
    gameState.lockedUsers[client.id] = true
  }

  client.on('click_card', (roomId, cardIndex) => {
    let gameState = gameStates[roomId]
    if (!gameState) { return newGame(roomId) }
    //don't allow locked users to click
    if (gameState.lockedUsers[client.id]) { return; }

    //enforce only one player being able to click cards during turn
    if (!gameState.activeUser) {
      gameState.activeUser = client.id
      //start countdown of turn and lock out if unsuccessful
      lockTimeouts[roomId] = setTimeout(() => {
        //must always get current state at start of timeout callback if modifying
        //since we don't know if gameState has been updated since
        let gameState = gameStates[roomId]
        onBadSet(gameState)
        sync(roomId)
      }, 3000)
    } else if (gameState.activeUser !== client.id) {
      return;
    }

    //change state so that player has clicked a card
    gameState = modStateAndSync(roomId, _toggleCard)(cardIndex, gameState)

    //now check
    const indices = Object.keys(gameState.selected).map(str => parseInt(str))
    if (indices.length === 3) {
      gameState.activeUser = null
      _checkSet(indices, () => {
        //successful set
        let gameState = gameStates[roomId]
        //clear out locking timeout if player has successfully found a set
        clearTimeout(lockTimeouts[roomId])
        console.log('player found a set!')
        gameState.lockedUsers = {}
        gameState.selected = {}
        gameState = modStateAndSync(roomId, _collectSet)(indices, gameState)
        setTimeout(() => {
          //must always get current state at start of timeout callback if modifying
          //since we don't know if gameState has been updated since
          let gameState = gameStates[roomId]
          if (gameState.board.filter(i => i !== null).length < 12) {
            gameState = modStateAndSync(roomId, _deal)(gameState)
          } else {
            gameState = modStateAndSync(roomId, _cleanBoard)(gameState)
          }
        }, tTime)
      }, () => {
        //bad set. lock user and clear out selected
        let gameState = gameStates[roomId]
        onBadSet(gameState)
        //sync after transition time, so that UI shows which 3rd card was selected
        setTimeout(() => {
          sync(roomId)
        }, 2*tTime)
      })
    }
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
