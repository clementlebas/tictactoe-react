import React from 'react';

import Square from './square';

class Board extends React.Component {
  renderSquare(num, col, row) {
    const {winningLine, squares, onClick} = this.props;
    const isWinningSquare = winningLine && winningLine.includes(num);

    const style = {
      backgroundColor: isWinningSquare && 'green'
    }

    return (
      <Square
        key={num}
        value={squares[num]}
        css={style}
        onClick={() => onClick(num, col, row)}
      /> 
    );
  }

  render() {
    return (
      [...Array(3)].map((el, col) => {
        return (
          <div key={col} className="board-row">
            {
              [...Array(3)].map((el2, row) => this.renderSquare(col * 3 + row, row, col))
            }
          </div>
        )
      })
    );
  }
}

export default Board;
