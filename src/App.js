// src/App.js
import React from 'react';
import Planner from './components/Planner'; // Re-ligamos o nosso Planner
import './index.css'; 

function App() {
  return (
    <div className="App">
      <Planner /> {/* E mandamos ele aparecer aqui */}
    </div>
  );
}

export default App;