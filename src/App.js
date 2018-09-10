import React, { Component } from 'react';
import Letter from './Letter.js';
import './App.css';

const LIST_OF_WORDS = ["arbre", "chat", "abricot", "jupe", "tournevis"];
const VISUAL_DELAY = 750

class App extends Component {
  state = {
    word: this.getWordToFind(),
    guesses: 0,
    currentLetter: "",
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
      currentLetter: letter,
      usedLetters: usedLetters
    });

    setTimeout(() => this.setState({currentLetter: ""}), VISUAL_DELAY)
  }
  computeDisplay(phrase) {
    return phrase.replace(/\w/g,
      (letter) => (this.state.usedLetters.has(letter) ? letter : '_')
    )
  }
  getFeedback(letter) {
    const { currentLetter, usedLetters } = this.state

    if (currentLetter === letter) {
      return usedLetters.has(letter) ? "matched" : "mismatched"
    }

    return usedLetters.has(letter) ? "used" : ""
  }
  getWordToFind() {
    return LIST_OF_WORDS[Math.floor(Math.random()*LIST_OF_WORDS.length)].toUpperCase();
  }
  resetGame() {
    this.setState({
      word: this.getWordToFind(),
      guesses: 0,
      usedLetters: new Set()
    })
  }
  render() {
    const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const wordDisplay = this.computeDisplay(this.state.word)
    return (
      <div className="App">
        <header className="App-header">
          <h1 id="wordToFind">{wordDisplay}</h1>
          <span>{this.state.guesses}</span>
        </header>
        <div id="keyboard">
        {
          (wordDisplay.search("_") === -1) ?
            (<button id="reset" onClick={()=>this.resetGame()}>Reset</button>)
            :
            LETTERS.map((letter,index) => (<Letter letter={letter} key={index} feedback={this.getFeedback(letter)} onClick={this.checkLetter} />))
        }
        </div>
      </div>
    );
  }
}

export default App;
