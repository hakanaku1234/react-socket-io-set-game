const { _DECK } = require('./attributes')

//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function getNewDeck() {
  let deck = [...Array(81)].map((x,i)=>i)
  shuffle(deck);
  return deck
}

const cardsInitialState = {
  deck: [],
  board: [],
  collected: [],
  selected: {}
};

function _startNewGame(initialState=cardsInitialState) {
  let newDeck = getNewDeck();
  let board = newDeck.splice(0, 12)
  return Object.assign({}, initialState, {
    deck: [ ...newDeck ],
    board,
  });
}

function _deal(state) {
  let { deck, board } = state
  let newCards = deck.splice(0, 3)
  return Object.assign({}, state, {
    deck: [ ...deck ],
    board: [ ...board, ...newCards ]
  })
}

function _toggleCard(index, state) {
  let { selected } = state
  //use a new object for immutablity
  selected = Object.assign({}, selected)
  if (selected[index]) {
    delete selected[index]
  } else {
    selected[index] = true
  }
  return Object.assign({}, state, {
    selected
  })
}

function _collectSet(indices, state) {
  //move indices from board to collected
  let { board, collected } = state
  board = [ ...board ]
  collected = [ ...collected ]
  for (let index of indices) {
    board.splice(board.indexOf(index), 1)
    collected.push(index)
  }
  return Object.assign({}, state, {
    board,
    collected,
  })
}


function _checkSet(indices, success, fail) {
  const attrs = ['color', 'count', 'shape', 'shade']
  const attrCounts = {}
  for (let i of indices) {
    const card = _DECK[i]
    for (let attr of attrs) {
      attrCounts[attr] = attrCounts[attr] || new Set();
      attrCounts[attr].add(card[attr])
    }
  }
  for (let attr in attrCounts) {
    if (attrCounts[attr].size === 2) {
      /* bad set. attribute must either be all different (3)
          or all the same (1)
      */
      if (fail) { fail() }
      return;
    }
  }
  success()
}
module.exports = {
  cardsInitialState,
  _startNewGame,
  _deal,
  _toggleCard,
  _checkSet,
  _collectSet,
}
