import PropTypes from 'prop-types';
import React from 'react';

import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
} from '../attributes'

class Shape extends React.Component {

  getStripedDef() {
    const { color } = this.props
    const stripeSpacing = 5
    const stripeWidth = 1
    return (
      <defs>
        <pattern
          id="pattern-stripe"
          width={ stripeSpacing }
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(90)"
        >
          <rect
            width={ stripeWidth }
            height="4"
            // transform="translate(0,0)"
            fill={ color }
          />
        </pattern>
      </defs>
    )
  }

  render() {
    const { color, shade, shape } = this.props;

    let fill = 'transparent'
    if (shade == STRIPED) { fill = 'url(#pattern-stripe)' }
    if (shade == SOLID) { fill = color }

    const borderSize = 5
    const w = 40
    const h = 80

    const diamondPoints = [
      `${w / 2 + borderSize} ${borderSize}`, //north
      `${w + borderSize} ${h / 2 + borderSize}`, //east
      `${w / 2 + borderSize} ${h + borderSize}`, //south
      `${borderSize} ${h / 2 + borderSize}`, //west
    ]
    return (
      <svg style={ {
        display: 'inline-block',
        width: w + borderSize * 2,
        height: h + borderSize * 2,
        marginRight: 10
      } }
      >
        { shade == STRIPED && this.getStripedDef() }
        { shape == DIAMOND &&
          <polygon
            points={ diamondPoints.join(',')}
            strokeWidth={ borderSize }
            stroke={ color }
            fill={ fill }
          />
        }
        { shape == OVAL &&
          <rect
            x={ borderSize }
            y={ borderSize }
            width={ w }
            height={ h }
            rx={ w / 2 }
            ry={ w / 2 }
            stroke={ color }
            fill={ fill }
            strokeWidth={ borderSize }
          />
          // <ellipse
          //   cx={ (w / 2) + borderSize }
          //   cy={ (h / 2) + borderSize }
          //   rx={ w / 2 }
          //   ry={ h / 2 }
          //   stroke={ color }
          //   fill={ fill }
          //   strokeWidth={ borderSize }
          // />
        }

      </svg>
    )
  }
}

Shape.propTypes = {
  color: PropTypes.oneOf([RED, GREEN, PURPLE]).isRequired,
  shade: PropTypes.oneOf([EMPTY, STRIPED, SOLID]).isRequired,
  shape: PropTypes.oneOf([DIAMOND, OVAL, SQUIGGLE]).isRequired,
}
export default Shape
