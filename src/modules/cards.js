import { _DECK } from '../attributes'

/* ACTION TYPES */
export const START_NEW_GAME = 'START_NEW_GAME';
export const DEAL = 'DEAL';
export const TOGGLE_CARD = 'TOGGLE_CARD';
export const RESET_SELECTED = 'RESET_SELECTED';
export const COLLECT_SET = 'COLLECT_SET'
/* REDUCER */
const initialState = {
  deck: [],
  board: [],
  collected: [],
  selected: {}
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
  let deck = [...Array(81)].map((x,i)=>i)
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
    // case COLLECT:
    case TOGGLE_CARD: {
      let { selected } = state
      //use a new object for immutablity
      selected = Object.assign({}, selected)
      const { index } = action
      if (selected[index]) {
        delete selected[index]
      } else {
        selected[index] = true
      }
      return Object.assign({}, state, {
        selected
      })
    }
    case COLLECT_SET: {
      //move indices from board to collected
      let { board, collected } = state
      board = [ ...board ]
      collected = [ ...collected ]
      for (let index of action.indices) {
        board.splice(board.indexOf(index), 1)
        collected.push(index)
      }
      return Object.assign({}, state, {
        board,
        collected,
      })
    }
    case RESET_SELECTED:
      return Object.assign({}, state, {
        selected: {}
      })
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

export function clickCard(index) {
  return function(dispatch) {
    dispatch(toggleCard(index))
    setTimeout(function() {
      dispatch(checkSelected())
    }, 500)
  }
}

/* checks to see if three cards are selected.
    if they are a set, collect them,
    else clear out the selected cards
 */
function checkSelected() {
  return function(dispatch, getState) {
    const { selected } =  getState().cards
    const indices = Object.keys(selected).map(str => parseInt(str))
    if (indices.length === 3) {
      dispatch(checkSet(indices))
      dispatch({ type: RESET_SELECTED })
    }

  }
}

function checkSet(indices) {
  return function(dispatch, getState) {
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
          console.log('bad set')
        return;
      }
    }
          console.log('you found a set!')

    dispatch({
      type: COLLECT_SET,
      indices
    })
    if (getState().cards.board.length < 12) {
      dispatch(deal())
    }
  }

}
function toggleCard(index) {
  return {
    type: TOGGLE_CARD,
    index
  }
}
