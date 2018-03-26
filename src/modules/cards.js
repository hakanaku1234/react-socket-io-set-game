
const { cardsInitialState, _startNewGame, _deal, _toggleCard, _checkSet, _collectSet } = require('../utils')
/* ACTION TYPES */
export const START_NEW_GAME = 'START_NEW_GAME';
export const DEAL = 'DEAL';
export const TOGGLE_CARD = 'TOGGLE_CARD';
export const RESET_SELECTED = 'RESET_SELECTED';
export const COLLECT_SET = 'COLLECT_SET'

/* REDUCER */
export default function (state = cardsInitialState, action) {
  switch (action.type) {
    case START_NEW_GAME: {
      return _startNewGame()
    }
    case DEAL: {
      return _deal(state)
    }
    // case COLLECT:
    case TOGGLE_CARD: {
      const { index } = action
      return _toggleCard(index, state)
    }
    case COLLECT_SET: {
      const { indices } = action
      return _collectSet(indices, state)
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
    _checkSet(indices, () => {
      console.log('you found a set!')
      dispatch({
        type: COLLECT_SET,
        indices
      })
      if (getState().cards.board.length < 12) {
        dispatch(deal())
      }
    })

  }

}
function toggleCard(index) {
  return {
    type: TOGGLE_CARD,
    index
  }
}
