import React, { Component } from 'react';
import Card from './components/Card';

import {
  RED, GREEN, PURPLE,
  EMPTY, STRIPED, SOLID,
  DIAMOND, OVAL, SQUIGGLE
 } from './attributes'
class App extends Component {
  render() {
    return (
      <div className="app">
        <Card
          count={ 1 }
          color={ RED }
          shade={ EMPTY }
          shape={ OVAL }
        />
        <Card
          count={ 2 }
          color={ GREEN }
          shade={ SOLID }
          shape={ DIAMOND }
        />
        <Card
          count={ 3 }
          color={ PURPLE }
          shade={ STRIPED }
          shape={ DIAMOND }
        />
      </div>
    );
  }
}

export default App;
