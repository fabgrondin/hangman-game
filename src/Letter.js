import React from 'react'
import './Letter.css'

const Letter = ({ letter, isUsed, onClick }) => (
  <div className={"letter" + (isUsed ? " used" : "")} onClick={()=>onClick(letter)}>
    <span>{letter}</span>
  </div>
)

export default Letter
