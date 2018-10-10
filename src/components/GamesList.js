/*eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React from 'react';

import MultiPlayerBoard from './MultiPlayerBoard';
import { Route, Link } from 'react-router-dom';

import { SocketContext } from '../App'

class MultiPlayerBoardWrapper extends React.Component {
  render() {
    return (
       <SocketContext.Consumer>
         { socket => (<MultiPlayerBoard socket={ socket } { ...this.props } />) }
       </SocketContext.Consumer>
    )
  }
}

class GamesList extends React.Component {
  constructor(props) {
    super(props)
    //TODO: maybe store rooms list in redux, and listen when app first loads
    props.socket.on('fetch_rooms_list', rooms => {
      console.log('rooms', rooms)
      this.setState({ rooms })
    })
    props.socket.emit('view_rooms')
  }

  state = {
    rooms: [],
  }

  _newRoom = (e) => {
    e.stopPropagation();
    this.props.socket.emit('new_room')
  }

  render() {
    return (
      <div className='container is-fluid'>
        <div className='columns'>
          <div className='column is-one-fifth'>
            <aside className='menu'>
              <ul className='menu-list'>
                <li>
                  <a
                    href='#'
                    onClick={ this._newRoom }
                  >{ 'New Game' }</a>
                </li>
              </ul>
              <p className='menu-label'>
                { 'Rooms' }
              </p>
              <ul className='menu-list'>
                { this.state.rooms.map(roomId =>
                    <Link
                      key={ roomId }
                      className='card-footer-item'
                      to={`${this.props.match.url}/${roomId}`}
                    >{ roomId }</Link>
                ) }
              </ul>
            </aside>
          </div>
          <div className='column'>
            <Route
              path='/multiplayer/:roomId'
              component = { MultiPlayerBoardWrapper }
            />
          </div>
        </div>
      </div>
    )
  }
}

GamesList.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired,
  }).isRequired,
}

export default GamesList;
