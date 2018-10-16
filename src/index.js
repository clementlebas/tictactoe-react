import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//revoir passage de classe en fonction
function Square (props) {
    // console.log('props', this.props);
    // console.log('state', this.state);
    return (
      <button
        className="square"
        // onClick ajoute un event listener
        // quand le button est cliqué, le onClick de Board est appelé
        // this.props.onClick() est passé dans Board ou est défini this.handleClick(i)
        onClick={props.onClick} //() => this.props.onClick() -> props.onClick car function components
      > {
        props.value
        }
      </button>
    );
}

class Board extends React.Component {

  /* constructor(props){
  super(props);
    this.state = {
  squares: Array(9).fill(null), //tableau null
  xIsNext: true,
    };
  } */

  //passe 2 props de Board à Square (value,onClick)
  renderSquare(i) {
    return (
      <Square
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)} // ??
      /> //i = props
    );
  }
  

  render() {
    // console.log('state', this.state)
    return (
      <div>
        <div className="board-row">
        
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0, //reflète le indexMove actuel affiché à l'utilisateur
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
    console.log("squares", squares);
    console.log("history", history);
    console.log("current", current);  

  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);


    const moves = history.map((step, indexMove) => {
      const desc = indexMove ?
        'Go to move #' + indexMove :
        'Go to game start';
      return (
        <li key = {indexMove}>
          <button onClick={() => this.jumpTo(indexMove)}>{desc}</button>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = `GG player ${winner}`;
    } else{
      status = `Next p layer: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root'),
);
