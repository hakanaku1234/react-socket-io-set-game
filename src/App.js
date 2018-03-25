import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { deal, startNewGame } from './modules/cards'
import Board from './components/Board';

class App extends Component {
  render() {
    const { deck, board, startNewGame, deal } = this.props
    return (
      <div className="app">
        <button
          onClick={ startNewGame }
        >
          { 'New Game' }
        </button>
        <button
          onClick={ deal }
        >
          { 'Deal' }
        </button>
        { `Cards left: ${deck.length}` }
        <Board
          displayedCards={ board }
        />
      </div>
    );
  }
}

App.propTypes= {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  deal: PropTypes.func.isRequired,
  deck: PropTypes.arrayOf(PropTypes.number).isRequired,
  startNewGame: PropTypes.func.isRequired,
}

function mapState(state) {
  const { deck, board } = state.cards
  return {
    deck,
    board,
  }
}
function mapDispatch(dispatch) {
  return bindActionCreators({
    deal,
    startNewGame
  }, dispatch)
}
export default connect(mapState, mapDispatch)(App);
