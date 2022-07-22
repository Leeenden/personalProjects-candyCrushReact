import React from 'react';

const ScoreBoard = ({score}) => {
  return (
    <div className="score-board">
      <h1 className="score-text"> Current Score </h1>
      <div className="score-counter">
        <h2>{score}</h2>
      </div>
      
    </div>
  )
}

export default ScoreBoard