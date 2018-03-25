import openSocket from 'socket.io-client';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickCard } from '../modules/cards'

import Card from './Card'

import { _DECK } from '../attributes'

const  socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
  socket.on('sync', board => cb(null, board));
  socket.emit('subscribeToSync', 500);
}

class MultiplayerBoard extends React.Component {

  constructor() {
    super()
    subscribeToTimer((err, board) =>  {
      this.setState({ board })
    });
  }
  state = {
    board: []
  }

  _clickCard = (deckIndex) => () => {
    this.props.clickCard(deckIndex)
  }

  render() {
    return (
      <div className='board'>
        { this.state.board.map((deckIndex) => {
          const cardObj = _DECK[deckIndex]
          return (
            <Card
              onClick={ this._clickCard(deckIndex) }
              selected={ !!this.props.selected[deckIndex] }
              key={ deckIndex }
              count={ cardObj.count }
              color={ cardObj.color }
              shade={ cardObj.shade }
              shape={ cardObj.shape }
            />
          )
        }) }
      </div>
    )
  }
}

MultiplayerBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  clickCard: PropTypes.func.isRequired,
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
}

function mapState(state) {
  const { board, selected } = state.cards
  return {
    board,
    selected,
  }
}
function mapDispatch(dispatch) {
  return bindActionCreators({
    clickCard,
  }, dispatch)
}
export default connect(mapState, mapDispatch)(MultiplayerBoard);
