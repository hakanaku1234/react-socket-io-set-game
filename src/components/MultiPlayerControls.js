import PropTypes from 'prop-types';
import React from 'react';

import Controls from './Controls'

class MultiPlayerControls extends React.Component {

  render() {
    return (
      <Controls
        { ...this.props }
        newGameLabel='New Multiplayer Game'
      />
    )
  }
}

MultiPlayerControls.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  collected: PropTypes.arrayOf(PropTypes.number).isRequired,
  deck: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default MultiPlayerControls;
