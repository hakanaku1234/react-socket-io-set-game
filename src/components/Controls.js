import PropTypes from 'prop-types';
import React from 'react';

function Controls(props) {
  const { board, collected, deck, startNewGame, deal, newGameLabel } = props
  const cardsLeft = board.length + deck.length;
  const setsCollected = collected.length / 3
  const progressPct = deck.length ? Math.round((1 - cardsLeft / 81) * 100) : 0
  return (
    <div className='container is-fluid'>
      <div className='buttons'>
        <button
          className='button'
          onClick={ startNewGame }
        >
          { newGameLabel }
        </button>
        <button
          className='button'
          onClick={ deal }
        >
          { 'Deal' }
        </button>
      </div>
      <progress
        className='progress'
        value={ progressPct }
        max='100'
      >
        { `${progressPct}%` }
      </progress>
      { ` Cards left: ${cardsLeft}` }
      { ` | Sets collected: ${setsCollected}` }
    </div>
  )
}

Controls.propTypes= {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  collected: PropTypes.arrayOf(PropTypes.number).isRequired,
  deal: PropTypes.func.isRequired,
  deck: PropTypes.arrayOf(PropTypes.number).isRequired,
  newGameLabel: PropTypes.string.isRequired,
  startNewGame: PropTypes.func.isRequired,
}

export default Controls
