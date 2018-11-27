import React from 'react';

import Board from './board';
import Move from './move';

class Game extends React.Component {
  state = {
    history: [{
      id: '00',
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
    const {history: stateHistory, stepNumber, xIsNext} = this.state;

    const history = stateHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];

    const squares = current.squares.slice();
    if(calculateGameResult(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        id: String(col) + String(row),
        squares,
        move: {
          col,
          row,
        },
      }]),
      xIsNext: !xIsNext,
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
    const {isAsc} = this.state;
    this.setState({isAsc: !isAsc});
  }

  resetFunction = () => {
    this.setState({
      history: [{
        id: '00',
        squares: Array(9).fill(null),
        move: {
          col: null,
          row: null,
        },
      }],
      stepNumber: 0,
      xIsNext: true,
    })
  }

  render() {
    const {history, stepNumber, isAsc, xIsNext} = this.state;
    console.log('this.state', this.state);
    
    const current = history[stepNumber];
    const gameResult = calculateGameResult(current.squares);

    const moves = history.map((step, indexMove) => {
      const {col, row} = history[indexMove].move;

      return <Move
        key={indexMove}
        indexMove={indexMove}
        col={col}
        row={row}
        stepNumber={stepNumber}
        gameResult={gameResult}
        jumpTo={() => this.jumpTo(indexMove)}
      />
    });

    let status;
    if (gameResult && gameResult.winner) {
      status = `GG player ${gameResult.winner}`;
    } else{
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
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
            <button 
              className="reset" 
              onClick={this.resetFunction}
            >
            Reset
            </button>
          </div>
          <ol>{isAsc ? moves : moves.slice().reverse()}</ol>
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
    }
  }
  return null;
}

export default Game;
