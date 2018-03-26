import React from 'react';

import MultiPlayerBoard from './components/MultiPlayerBoard';
import SinglePlayerBoard from './components/SinglePlayerBoard';

function App() {
  return (
    <div className="app">
      <MultiPlayerBoard/>
      <SinglePlayerBoard/>
    </div>
  );
}

export default App
