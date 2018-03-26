import openSocket from 'socket.io-client';

import React from 'react';

import MultiPlayerControls from './MultiPlayerControls'
import Board from './Board'

const socket = openSocket('http://localhost:8000');

class MultiPlayerBoard extends React.Component {

  constructor() {
    super()
    socket.on('sync', state => {
      const { board, selected, deck, collected } = state
      this.setState({ board, selected, deck, collected })
    })
    socket.on('is_locked', isLocked => {
      this.setState({ isLocked })
    })
  }
  state = {
    board: [],
    selected: {},
    deck: [],
    collected: [],
    isLocked: false,
  }

  _clickCard = (deckIndex) => () => {
    socket.emit('click_card', deckIndex)
  }

  render() {
    const { board, selected, isLocked } = this.state
    return (
      <React.Fragment>
        <MultiPlayerControls
          deck={ this.state.deck }
          collected={ this.state.collected }
        />
        <div style={ { position: 'relative'} }>
          { isLocked &&
            <React.Fragment>
              <div className='locked-message'>
                { 'LOCKED' }
              </div>
              <div className='board--locked'/>
            </React.Fragment>
          }

          <Board
            board={ board }
            selected={ selected }
            clickCard={ this._clickCard }
          />
        </div>
      </React.Fragment>
    )
  }
}

export default MultiPlayerBoard;
