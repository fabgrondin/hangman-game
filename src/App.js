import React, { Component } from 'react';
import Letter from './Letter.js';
import './App.css';

const wordsList = ["arbre", "chat", "abricot", "jupe", "tournevis"];

class App extends Component {
  state = {
    word: this.getWordToFind(),
    guesses: 0,
    usedLetters: new Set()
  }
  checkLetter = (letter) => {
    var {word, guesses, usedLetters} = this.state;

    if (word.search(letter) !== -1) {
      usedLetters.add(letter);
    }

    guesses++;

    this.setState({
      guesses: guesses,
      usedLetters: usedLetters
    });
  }
  computeDisplay(phrase) {
    return phrase.replace(/\w/g,
      (letter) => (this.state.usedLetters.has(letter) ? letter : '_')
    )
  }
  getWordToFind() {
    return wordsList[Math.floor(Math.random()*wordsList.length)].toUpperCase();
  }
  render() {
    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    return (
      <div className="App">
        <header className="App-header">
          <h1 id="wordToFind">{this.computeDisplay(this.state.word)}</h1>
        </header>
        <div id="keyboard">
        {
          letters.map((letter,index) => (<Letter letter={letter} key={index} isUsed={this.state.usedLetters.has(letter)} onClick={this.checkLetter} />))
        }
        </div>
      </div>
    );
  }
}

export default App;
