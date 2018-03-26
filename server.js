const { cardsInitialState, _startNewGame, _toggleCard, _checkSet, _collectSet, _deal } = require('./src/utils')

const io = require('socket.io')();

let serverInitialState = Object.assign({}, cardsInitialState, {
  activeUser: '',
  lockedUsers: {},
})
let gameState = Object.assign({}, serverInitialState)

//TODO: use namespaces/rooms for multiple games

let lockTimeout;

io.on('connection', (client) => {
  function sync() {
    io.emit('sync', gameState)
    io.to(client.id).emit('is_locked', !!gameState.lockedUsers[client.id])
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
    gameState = _startNewGame(serverInitialState)
    sync()
  })

  client.on('deal', () => {
    gameState = _deal(gameState)
    sync()
  })
  client.on('click_card', (cardIndex) => {
    if (gameState.lockedUsers[client.id]) { return; }
    setCountDown() //sets activeUser, must do this before activeUser check below
    if (gameState.activeUser !== client.id) { return; }
    gameState = _toggleCard(cardIndex, gameState)

    const { selected } =  gameState
    const indices = Object.keys(selected).map(str => parseInt(str))
    if (indices.length === 3) {
      gameState.activeUser = null
      _checkSet(indices, () => {
        //clear out locking timeout if player has successfully found a set
        clearTimeout(lockTimeout)
        console.log('you found a set!')
        gameState.lockedUsers = {}
        gameState = _collectSet(indices, gameState)
        if (gameState.board.length < 12) {
          gameState = _deal(gameState)
        }
      }, () => {
        gameState.lockedUsers[client.id] = true
      })
      //reset selected
      gameState.selected = {}
    }
    sync()
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
