const { getNewDeck } = require('./src/utils')

const io = require('socket.io')();

let deck = []
let board = []

io.on('connection', (client) => {

  client.on('subscribeToSync', (interval) => {
    setInterval(() => {
      client.emit('sync', board);
    }, interval);
  });

  client.on('new_game', () => {
    deck = getNewDeck()
    board = deck.splice(0, 12)

    client.emit('sync', board)
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
