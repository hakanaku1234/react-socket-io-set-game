import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickCard } from '../modules/cards'

import Board from './Board'

class SinglePlayerBoard extends React.Component {

  _clickCard = (deckIndex) => () => {
    this.props.clickCard(deckIndex)
  }

  render() {
    const { board, selected } = this.props
    return (
      <Board
        board={ board }
        selected={ selected }
        clickCard={ this._clickCard }
      />
    )
  }
}

SinglePlayerBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  clickCard: PropTypes.func.isRequired,
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
}

function mapState(state) {
  const { board, selected } = state.cards
  return {
    board,
    selected,
  }
}
function mapDispatch(dispatch) {
  return bindActionCreators({
    clickCard,
  }, dispatch)
}
export default connect(mapState, mapDispatch)(SinglePlayerBoard);
