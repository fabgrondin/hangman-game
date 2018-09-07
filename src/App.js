import React, { Component } from 'react';
import Letter from './Letter.js';
import './App.css';

class App extends Component {
  render() {
    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div id="keyboard">
        {
          letters.map((letter) => (<Letter letter={letter} isUsed={false} />))
        }
        </div>
      </div>
    );
  }
}

export default App;
