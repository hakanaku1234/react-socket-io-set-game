/*eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Card from './Card'

const { _DECK } = require('../attributes')

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={ 300 }
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

Fade.propTypes = {
  children: PropTypes.node
}

class Board extends React.Component {

  render() {
    return (
      <TransitionGroup
        appear
        className='board'
      >
        { this.props.board.map((deckIndex, i) => {
          if (deckIndex === null) { return null }
          const cardObj = _DECK[deckIndex]
          return (
            <Fade
              key={ i }
            >
              <Card
                onClick={ this.props.clickCard(deckIndex) }
                selected={ !!this.props.selected[deckIndex] }
                count={ cardObj.count }
                color={ cardObj.color }
                shade={ cardObj.shade }
                shape={ cardObj.shape }
              />
            </Fade>
          )
        }) }
      </TransitionGroup>
    )
  }
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  clickCard: PropTypes.func.isRequired,
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
}

export default Board;
