import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames'

import Shape from './Shape'

import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
} from '../attributes'
function Card(props) {
  const { count, onClick, selected, ...rest } = props
  return (
    <div
      className={ classnames('card', {
        'card--selected': selected
      }) }
      onClick={ onClick }
    >
      { [...Array(count)].map((x, i) =>
        <Shape
          key={ i }
          { ...rest }
        />
      ) }
    </div>
  )
}

Card.propTypes = {
  color: PropTypes.oneOf([RED, GREEN, PURPLE]).isRequired,
  count: PropTypes.oneOf([1,2,3]).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  shade: PropTypes.oneOf([EMPTY, STRIPED, SOLID]).isRequired,
  shape: PropTypes.oneOf([DIAMOND, OVAL, SQUIGGLE]).isRequired,
}
export default Card
