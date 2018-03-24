import PropTypes from 'prop-types';
import React from 'react';
import Shape from './Shape'

import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
} from '../attributes'

const cardStyle = {
  border: '1px solid black',
  borderRadius: 4,
  height: 150,
  width: 200,
  padding: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
class Card extends React.Component {
  render() {
    const { count, ...rest } = this.props
    return (
      <div style={ cardStyle }>
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
