import React, { Component } from 'react';
import Board from './components/Board';

import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
 } from './attributes'

 const dummyCards = [
   { count: 1, color: RED, shade: STRIPED, shape: SQUIGGLE },
   { count: 2, color: GREEN, shade: SOLID, shape: DIAMOND },
   { count: 3, color: PURPLE, shade: STRIPED, shape: DIAMOND },
   { count: 1, color: RED, shade: EMPTY, shape: OVAL },
   { count: 2, color: GREEN, shade: SOLID, shape: DIAMOND },
   { count: 3, color: PURPLE, shade: STRIPED, shape: DIAMOND },
   { count: 2, color: RED, shade: EMPTY, shape: OVAL },
   { count: 2, color: GREEN, shade: SOLID, shape: DIAMOND },
   { count: 3, color: PURPLE, shade: STRIPED, shape: SQUIGGLE },
 ]
class App extends Component {
  render() {
    return (
      <div className="app">
        <Board
          displayedCards={ dummyCards }
        />
      </div>
    );
  }
}

export default App;
