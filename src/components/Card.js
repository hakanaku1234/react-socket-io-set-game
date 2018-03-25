import PropTypes from 'prop-types';
import React from 'react';
import Shape from './Shape'

import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
} from '../attributes'
class Card extends React.Component {
  render() {
    const { count, ...rest } = this.props
    return (
      <div className='card'>
        { [...Array(count)].map((x, i) =>
          <Shape
            key={ i }
            { ...rest }
          />
        ) }
      </div>
    )
  }
}

Card.propTypes = {
  color: PropTypes.oneOf([RED, GREEN, PURPLE]).isRequired,
  count: PropTypes.oneOf([1,2,3]).isRequired,
  shade: PropTypes.oneOf([EMPTY, STRIPED, SOLID]).isRequired,
  shape: PropTypes.oneOf([DIAMOND, OVAL, SQUIGGLE]).isRequired,
}
export default Card
