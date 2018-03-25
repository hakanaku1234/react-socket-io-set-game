import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card'

import { _DECK } from '../attributes'

class Board extends React.Component {
  render() {
    return (
      <div className='board'>
        { this.props.displayedCards.map((deckIndex, i) => {
          const cardObj = _DECK[deckIndex]
          return (
            <Card
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
  displayedCards: PropTypes.arrayOf(PropTypes.number).isRequired
}
export default Board
