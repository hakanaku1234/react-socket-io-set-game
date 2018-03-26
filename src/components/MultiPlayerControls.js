import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import React from 'react';

const  socket = openSocket('http://localhost:8000');


class MultiPlayerControls extends React.Component {

  startMultiNewGame = () => {
    socket.emit('new_game')
  }

  _deal = () => {
    socket.emit('deal')
  }

  render() {
    const { deck, collected } = this.props
    return (
      <React.Fragment>
        <button
          onClick={ this.startMultiNewGame }
        >
          { 'New Multi Player Game' }
        </button>
        <button
          onClick={ this._deal }
        >
          { 'Deal' }
        </button>
        { ` Cards left: ${deck.length}` }
        { ` | Sets collected: ${collected.length / 3}` }
      </React.Fragment>
    )
  }
}

MultiPlayerControls.propTypes = {
  collected: PropTypes.arrayOf(PropTypes.number).isRequired,
  deck: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export default MultiPlayerControls;
