import React from 'react'
import './Letter.css'

const Letter = ({ letter, isUsed }) => (
  <div className={"letter" + (isUsed ? " used" : "")}>
    <span>{letter}</span>
  </div>
)

export default Letter
