import React, { Component } from 'react';
import Letter from './Letter.js';
import './App.css';

import { LIST_OF_WORDS } from './listOfWords.js';

const VISUAL_DELAY = 750

class App extends Component {
  state = {
    word: this.getWordToFind(),
    guesses: 0,
    score: 0,
    currentLetter: "",
    usedLetters: new Set()
  }
  checkLetter = (letter) => {
    var {word, guesses, score, usedLetters} = this.state;

    if (usedLetters.has(letter)) {
      score-=2
    }else if (word.search(letter) !== -1) {
      usedLetters.add(letter)
      score += 2
    } else {
      score--
    }

    guesses++;

    this.setState({
      guesses: guesses,
      score: score,
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
      score: 0,
      guesses: 0,
      usedLetters: new Set()
    })
  }
  render() {
    const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const wordDisplay = this.computeDisplay(this.state.word)
    const won = wordDisplay.search("_") === -1
    return (
      <div className="App">
        <header>
          <h1>Jeu du pendu</h1>
        </header>
        <div className="word_wrapper">
          <h1 id="word_to_find">{wordDisplay}</h1>
          <div id="score">
            <span>Essais : {this.state.guesses}</span>
            <br/>
            <span>Score : {this.state.score}</span>
          </div>
        </div>
        <div id="keyboard">
        {
          won ?
            (<button id="reset" onClick={()=>this.resetGame()}>Rejouer</button>)
            :
            LETTERS.map((letter,index) => (<Letter letter={letter} key={index} feedback={this.getFeedback(letter)} onClick={this.checkLetter} />))
        }
        </div>
      </div>
    );
  }
}

export default App;
