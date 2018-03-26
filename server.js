const { cardsInitialState, _startNewGame, _toggleCard, _checkSet, _collectSet, _deal } = require('./src/utils')

const io = require('socket.io')();


let gameState = Object.assign({}, cardsInitialState)

function sync() {
  io.emit('sync', gameState)
}

io.on('connection', (client) => {
  sync()

  client.on('new_game', () => {
    gameState = _startNewGame()
    sync()
  })

  client.on('deal', () => {
    gameState = _deal(gameState)
    sync()
  })
  client.on('click_card', (cardIndex) => {
    gameState = _toggleCard(cardIndex, gameState)

    const { selected } =  gameState
    const indices = Object.keys(selected).map(str => parseInt(str))
    if (indices.length === 3) {
      _checkSet(indices, () => {
        console.log('you found a set!')
        gameState = _collectSet(indices, gameState)
        if (gameState.board.length < 12) {
          gameState = _deal(gameState)
        }
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
