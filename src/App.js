import React from 'react';

import Controls from './components/Controls';
import MultiPlayerBoard from './components/MultiPlayerBoard';
import SinglePlayerBoard from './components/SinglePlayerBoard';

function App() {
  return (
    <div className="app">
      <Controls/>
      <MultiPlayerBoard/>
      <SinglePlayerBoard/>
    </div>
  );
}

export default App
