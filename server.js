const { cardsInitialState, _startNewGame, _toggleCard, _checkSet, _collectSet, _deal, _cleanBoard, tTime } = require('./src/utils')

const io = require('socket.io')();

let serverInitialState = Object.assign({}, cardsInitialState, {
  activeUser: '',
  lockedUsers: {},
})
let gameState = Object.assign({}, serverInitialState)

//TODO: use namespaces/rooms for multiple games

let lockTimeout;

var clientIds = []
io.on('connection', (client) => {
  clientIds.push(client.id)
  function sync() {
    io.emit('sync', gameState)
    for (let clientId of clientIds) {
      io.to(clientId).emit('is_locked', !!gameState.lockedUsers[clientId])
    }
  }

  let modStateAndSync = (fn) => (...args) => {
    gameState = fn(...args)
    sync()
  }
  function setCountDown() {
    if (!gameState.activeUser) {
      gameState.activeUser = client.id
      //start countdown of turn and lock out if unsuccessful
      lockTimeout = setTimeout(function() {
        gameState.activeUser = null
        gameState.selected = {}
        gameState.lockedUsers[client.id] = true
        sync()
      }, 3000)
    }
  }

  sync()

  client.on('new_game', () => {
    modStateAndSync(_startNewGame)(serverInitialState)
  })

  client.on('deal', () => {
    modStateAndSync(_deal)(gameState)
  })
  client.on('click_card', (cardIndex) => {
    if (gameState.lockedUsers[client.id]) { return; }
    setCountDown() //sets activeUser, must do this before activeUser check below
    if (gameState.activeUser !== client.id) { return; }
    modStateAndSync(_toggleCard)(cardIndex, gameState)
    const { selected } =  gameState
    const indices = Object.keys(selected).map(str => parseInt(str))
    if (indices.length === 3) {
      gameState.activeUser = null
      _checkSet(indices, () => {
        //clear out locking timeout if player has successfully found a set
        clearTimeout(lockTimeout)
        console.log('you found a set!')
        gameState.lockedUsers = {}
        gameState.selected = {}
        modStateAndSync(_collectSet)(indices, gameState)
        setTimeout(function() {
          if (gameState.board.filter(i => i !== null).length < 12) {
            modStateAndSync(_deal)(gameState)
          } else {
            modStateAndSync(_cleanBoard)(gameState)
          }
        }, tTime)
      }, () => {
        gameState.lockedUsers[client.id] = true
      })
      //reset selected
      gameState.selected = {}
    }
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
