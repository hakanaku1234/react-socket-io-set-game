import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickCard } from '../modules/cards'

import Card from './Card'

import { _DECK } from '../attributes'

class Board extends React.Component {

  _clickCard = (deckIndex) => () => {
    this.props.clickCard(deckIndex)
  }

  render() {
    return (
      <div className='board'>
        { this.props.board.map((deckIndex, i) => {
          const cardObj = _DECK[deckIndex]
          return (
            <Card
              onClick={ this._clickCard(deckIndex) }
              selected={ !!this.props.selected[deckIndex] }
              key={ i }
              count={ cardObj.count }
              color={ cardObj.color }
              shade={ cardObj.shade }
              shape={ cardObj.shape }
            />
          )
        }) }
      </div>
    )
  }
}

Board.propTypes = {
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
export default connect(mapState, mapDispatch)(Board);
