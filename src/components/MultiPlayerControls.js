import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import React from 'react';

import Controls from './Controls'
const  socket = openSocket('http://localhost:8000');


class MultiPlayerControls extends React.Component {

  _startMultiNewGame = () => {
    socket.emit('new_game')
  }

  _deal = () => {
    socket.emit('deal')
  }

  render() {
    return (
      <Controls
        { ...this.props }
        deal={ this._deal }
        startNewGame={ this._startMultiNewGame }
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
