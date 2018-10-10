import PropTypes from 'prop-types';
import React from 'react';

import MultiPlayerControls from './MultiPlayerControls'
import Board from './Board'

class MultiPlayerBoard extends React.Component {
  constructor(props) {
    super(props)
    const { match: { params } } = props;
    props.socket.emit('join_room', params.roomId)
    props.socket.emit('init_board', params.roomId)
    props.socket.on('sync', state => {
      console.log(state)
      const { board, selected, deck, collected } = state
      this.setState({ board, selected, deck, collected })
    })
    props.socket.on('is_locked', isLocked => {
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

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = this.props;
    const { match: { params: nextParams } } = nextProps;

    if (params.roomId != nextParams.roomId) {
      this.props.socket.emit('join_room', nextParams.roomId)
      this.props.socket.emit('init_board', nextParams.roomId)
    }
  }

  _clickCard = (deckIndex) => () => {
    const { match: { params } } = this.props;
    this.props.socket.emit('click_card', params.roomId, deckIndex)
  }

  _startMultiNewGame = () => {
    const { match: { params } } = this.props;
    this.props.socket.emit('init_game', params.roomId)
  }

  _deal = () => {
    const { match: { params } } = this.props;
    this.props.socket.emit('deal', params.roomId)
  }

  render() {
    const { board, selected, isLocked } = this.state
    return (
      <React.Fragment>
        <MultiPlayerControls
          board={ this.state.board }
          deck={ this.state.deck }
          collected={ this.state.collected }
          startNewGame={ this._startMultiNewGame }
          deal={ this._deal }
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

MultiPlayerBoard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired,
  }).isRequired,
}

export default MultiPlayerBoard;
