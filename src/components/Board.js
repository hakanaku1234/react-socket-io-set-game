import PropTypes from 'prop-types';
import React from 'react';

import Card from './Card'

const { _DECK } = require('../attributes')

class Board extends React.Component {

  render() {
    return (
      <div className='board'>
        { this.props.board.map((deckIndex) => {
          const cardObj = _DECK[deckIndex]
          return (
            <Card
              onClick={ this.props.clickCard(deckIndex) }
              selected={ !!this.props.selected[deckIndex] }
              key={ deckIndex }
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

export default Board;
