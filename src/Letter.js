import React from 'react'
import PropTypes from 'prop-types'
import './Letter.css'

const Letter = ({ letter, feedback, onClick }) => (
  <div className={"letter " + feedback} onClick={()=>onClick(letter)}>
    <span>{letter}</span>
  </div>
)

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    "",
    "used",
    "matched",
    "mismatched"
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Letter
