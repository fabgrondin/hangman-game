import React from 'react'
import './Letter.css'

const Letter = ({ letter, feedback, onClick }) => (
  <div className={"letter " + feedback} onClick={()=>onClick(letter)}>
    <span>{letter}</span>
  </div>
)

export default Letter
