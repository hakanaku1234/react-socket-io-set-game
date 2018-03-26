import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { deal, startNewGame } from '../modules/cards'

class SinglePlayerControls extends React.Component {
  render() {
    const { deck, collected, startNewGame, deal } = this.props
    return (
      <React.Fragment>
        <button
          onClick={ startNewGame }
        >
          { 'New Single Player Game' }
        </button>
        <button
          onClick={ deal }
        >
          { 'Deal' }
        </button>
        { ` Cards left: ${deck.length}` }
        { ` | Sets collected: ${collected.length / 3}` }
      </React.Fragment>
    )
  }
}

SinglePlayerControls.propTypes= {
  collected: PropTypes.arrayOf(PropTypes.number).isRequired,
  deal: PropTypes.func.isRequired,
  deck: PropTypes.arrayOf(PropTypes.number).isRequired,
  startNewGame: PropTypes.func.isRequired,
}

function mapState(state) {
  const { deck, collected } = state.cards
  return {
    deck,
    collected,
  }
}
function mapDispatch(dispatch) {
  return bindActionCreators({
    deal,
    startNewGame
  }, dispatch)
}
export default connect(mapState, mapDispatch)(SinglePlayerControls);
