import React from 'react';

import Square from './square';

class Board extends React.Component {
  renderSquare(num, col, row) {
    const isWinningSquare = this.props.winningLine && this.props.winningLine.includes(num);

    const style = {
      backgroundColor: isWinningSquare && 'green'
    }

    return (
      <Square
        key={num}
        value={this.props.squares[num]}
        css={style}
        onClick={() => this.props.onClick(num, col, row)}
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
