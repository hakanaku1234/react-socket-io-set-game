import openSocket from 'socket.io-client';

import React from 'react';

import Board from './Board'

const  socket = openSocket('http://localhost:8000');

function subscribeToSync(cb) {
  socket.on('sync', state => cb(null, state));
  socket.emit('subscribeToSync', 200);
}

class MultiplayerBoard extends React.Component {

  constructor() {
    super()
    subscribeToSync((err, state) =>  {
      const { board, selected } = state
      this.setState({ board, selected })
    });
  }
  state = {
    board: [],
    selected: {}
  }

  _clickCard = (deckIndex) => () => {
    socket.emit('clickCard', deckIndex)
  }

  render() {
    const { board, selected } = this.state
    return (
      <Board
        board={ board }
        selected={ selected }
        clickCard={ this._clickCard }
      />
    )
  }
}

export default MultiplayerBoard;
