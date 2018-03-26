import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Controls from './Controls'
import { deal, startNewGame } from '../modules/cards'

class SinglePlayerControls extends React.Component {
  render() {
    return (
      <Controls
        { ...this.props }
        newGameLabel='New Single Player Game'
      />
    )
  }
}

function mapState(state) {
  const { board, collected, deck } = state.cards
  return {
    board,
    collected,
    deck,
  }
}
function mapDispatch(dispatch) {
  return bindActionCreators({
    deal,
    startNewGame
  }, dispatch)
}
export default connect(mapState, mapDispatch)(SinglePlayerControls);
