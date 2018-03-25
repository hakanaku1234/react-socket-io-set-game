import React from 'react';

import Controls from './components/Controls';
import MultiplayerBoard from './components/MultiplayerBoard';
import Board from './components/Board';

function App() {
  return (
    <div className="app">
      <Controls/>
      <MultiplayerBoard/>
      <Board/>
    </div>
  );
}

export default App
