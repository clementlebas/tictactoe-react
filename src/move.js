import React from 'react';

const Move = props => {
  const {
    col,
    row,
    indexMove,
    stepNumber,
    gameResult,
    jumpTo,
  } = props;

  const desc = indexMove
    ? `Go to move # ${indexMove} (${col}, ${row})`
    : `Go to game start`;

  const style = {
    fontWeight: indexMove === stepNumber ? 'bold' : 'normal', 
  };

  return (
    <li>
      <button style={style} onClick={jumpTo}>{desc}</button>
      {indexMove === 9 &&
        !gameResult && (
          <span className="draw">IT'S A DRAW</span>
        )
      }
    </li>
  );
}

export default Move;
