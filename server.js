const { getNewDeck } = require('./src/utils')

const io = require('socket.io')();

let deck = []
let board = []
let selected = {}

io.on('connection', (client) => {
  client.on('subscribeToSync', (interval) => {
    setInterval(() => {
      client.emit('sync', { deck, board, selected});
    }, interval);
  });

  client.on('new_game', () => {
    deck = getNewDeck()
    board = deck.splice(0, 12)

    client.emit('sync', board)
  })

  client.on('clickCard', (cardIndex) => {
    if (selected[cardIndex]) {
      delete selected[cardIndex]
    } else {
      selected[cardIndex] = true
    }
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
