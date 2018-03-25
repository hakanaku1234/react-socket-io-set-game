import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
} from '../attributes'

/* ACTION TYPES */
export const START_NEW_GAME = 'START_NEW_GAME';
export const DEAL = 'DEAL';
export const COLLECT = 'COLLECT';

/* REDUCER */
const initialState = {
  deck: [],
  board: [],
  collected: []
};

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
  const counts = [1,2,3]
  const colors = [RED, GREEN, PURPLE]
  const shades = [EMPTY, STRIPED, SOLID]
  const shapes = [DIAMOND, OVAL, SQUIGGLE]

  let deck = []
  for (let count of counts) {
    for (let color of colors) {
      for (let shade of shades) {
        for (let shape of shapes) {
          deck.push({ count, color, shade, shape })
        }
      }
    }
  }
  shuffle(deck);
  return deck
}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_NEW_GAME: {
      let newDeck = getNewDeck();
      let board = newDeck.splice(0, 12)
      return Object.assign({}, initialState, {
        deck: [ ...newDeck ],
        board,
      });

    }
    case DEAL: {
      let { deck, board } = state
      let newCards = deck.splice(0, 3)
      return Object.assign({}, state, {
        deck: [ ...deck ],
        board: [ ...board, ...newCards ]
      })
    }
    case COLLECT:
    default:
      return state;
  }
}

/* ACTION CREATORS */
export function startNewGame() {
  return {
    type: START_NEW_GAME
  };
}

export function deal() {
  return {
    type: DEAL
  }
}
