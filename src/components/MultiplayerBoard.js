import openSocket from 'socket.io-client';

import React from 'react';

import MultiPlayerControls from './MultiPlayerControls'
import Board from './Board'

const  socket = openSocket('http://localhost:8000');

class MultiplayerBoard extends React.Component {

  constructor() {
    super()
    socket.on('sync', state => {
      const { board, selected, deck, collected } = state
      this.setState({ board, selected, deck, collected })
    })
  }
  state = {
    board: [],
    selected: {},
    deck: [],
    collected: [],
  }

  _clickCard = (deckIndex) => () => {
    socket.emit('click_card', deckIndex)
  }

  render() {
    const { board, selected } = this.state
    return (
      <React.Fragment>
        <MultiPlayerControls
          deck={ this.state.deck }
          collected={ this.state.collected }
        />
        <Board
          board={ board }
          selected={ selected }
          clickCard={ this._clickCard }
        />
      </React.Fragment>
    )
  }
}

export default MultiplayerBoard;
