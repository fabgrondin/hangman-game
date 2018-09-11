import React, { Component } from 'react';
import Letter from './Letter';
import Canvas from './Canvas';
import './App.css';

import { LIST_OF_WORDS } from './listOfWords.js';

const VISUAL_DELAY = 750

class App extends Component {
  state = {
    word: this.getWordToFind(),
    guesses: 0,
    score: 0,
    errors: 0,
    currentLetter: "",
    usedLetters: new Set(),
    won: false,
    lost: false
  }
  componentDidMount() {
    document.addEventListener("keypress", this.keypressFunc)
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressFunc)
  }
  checkLetter = (letter) => {
    var {word, guesses, score, errors, usedLetters, won, lost} = this.state;

    if (won | lost) {
      this.resetGame()
    } else {
      if (usedLetters.has(letter)) {
        score-=2
      }else if (word.search(letter) !== -1) {
        usedLetters.add(letter)
        score += 2
      } else {
        score--
        errors++
      }

      guesses++

      const wordDisplay = this.computeDisplay(this.state.word)
      won = wordDisplay.search("_") === -1
      lost = this.state.errors > 9

      this.setState({
        guesses: guesses,
        score: score,
        errors: errors,
        currentLetter: letter,
        usedLetters: usedLetters,
        won: won,
        lost: lost
      });

      setTimeout(() => this.setState({currentLetter: ""}), VISUAL_DELAY)
    }
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
  keypressFunc = (event) => {
    event.preventDefault()
    var letter = event.key.toUpperCase()
    var regexp = RegExp('[A-Z]')

    if (regexp.test(letter)) {
      this.checkLetter(letter)
    }
  }
  resetGame() {
    this.setState({
      word: this.getWordToFind(),
      score: 0,
      guesses: 0,
      errors: 0,
      usedLetters: new Set(),
      won: false,
      lost: false
    })
  }
  render() {
    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const wordDisplay = this.computeDisplay(this.state.word)

    return (
      <div className="App">
        <header>
          <h1>Jeu du pendu</h1>
        </header>
        <div className="word_wrapper">
          <h1 id="word_to_find">{ this.state.lost ? this.state.word : wordDisplay}</h1>
          <div id="score">
            <span>Essais : {this.state.guesses}</span>
            <br/>
            <span>Score : {this.state.score}</span>
          </div>
        </div>
        <div id="keyboard">
        {
          (this.state.won | this.state.lost) ?
            (
              <div id="play_again">
                <p>{ this.state.won ? "Gagné !" : "Perdu !"}</p>
                <button id="reset" onClick={()=>this.resetGame()}>Rejouer</button>
              </div>
            )
            :
            letters.map((letter,index) => (<Letter letter={letter} key={index} feedback={this.getFeedback(letter)} onClick={this.checkLetter} />))
        }
        </div>
        <Canvas errors={this.state.errors} />
      </div>
    );
  }
}

export default App;
