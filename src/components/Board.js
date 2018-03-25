import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card'

import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
} from '../attributes'

class Board extends React.Component {
  render() {
    return (
      <div className='board'>
        { this.props.displayedCards.map((cardObj, i) =>
          <Card
            key={ i }
            count={ cardObj.count }
            color={ cardObj.color }
            shade={ cardObj.shade }
            shape={ cardObj.shape }
          />
        ) }
      </div>
    )
  }
}

Board.propTypes = {
  displayedCards: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.oneOf([RED, GREEN, PURPLE]).isRequired,
    count: PropTypes.oneOf([1,2,3]).isRequired,
    shade: PropTypes.oneOf([EMPTY, STRIPED, SOLID]).isRequired,
    shape: PropTypes.oneOf([DIAMOND, OVAL, SQUIGGLE]).isRequired,
  })).isRequired
}
export default Board
