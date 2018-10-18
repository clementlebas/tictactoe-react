import React from 'react';

import Board from './board';

class Game extends React.Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
      move: {
        col: null,
        row: null,
      },
    }],
    stepNumber: 0,
    xIsNext: true,
    isAsc: true,
  }

  handleClick(i, col, row) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const squares = current.squares.slice();
    if(calculateGameResult(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        move: {
          col: col,
          row: row,
        },
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
 
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleToggle = () => {
    this.setState({isAsc: !this.state.isAsc});
  }

  render() {
    const {history, stepNumber} = this.state;
    const current = history[stepNumber];
    const gameResult = calculateGameResult(current.squares);

    const moves = history.map((step, indexMove) => {
        const {col, row} = history[indexMove].move;

        const desc = indexMove
          ? `Go to move # ${indexMove} (${col}, ${row})`
          : `Go to game start`;

        const style = {
          fontWeight: indexMove === stepNumber ? 'bold' : 'normal', 
        };

        return (
          <li key={indexMove}>
            <button style={style} onClick={() => this.jumpTo(indexMove)}>{desc}</button>
            {indexMove === 9 &&
              !gameResult && (
                <span className="draw">IT'S A DRAW</span>
              )
            }
          </li>
        );
      });

    let status;
    if (gameResult && gameResult.winner) {
      status = `GG player ${gameResult.winner}`;
    } else{
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningLine={gameResult && gameResult.winningLine}
            onClick={(i, col, row) => {
              this.handleClick(i, col, row);
            }}
          />
        </div>
        <div className="game-info">
          <div>
            {status}
            <button
              className="toggle"
              onClick={this.handleToggle}
            >
              Toggle
            </button>
          </div>
          <ol>{this.state.isAsc ? moves : moves.slice().reverse()}</ol>
        </div>
      </div>
    );
  }
}

const calculateGameResult = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningLine: [a, b, c],
      };
    } else{
      return null;
    }
  }
}

export default Game;
