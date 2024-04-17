import { useState } from 'react';
import './index.css';
import { Board } from './Board';
import { GameState, SnapShot } from './GameState';

export function Game() {
  const snap: SnapShot = {
    squares: Array(9).fill(null, 0, 9)
  };

  const [state, setState] = useState<GameState>({
    history: [snap],
    stepNumber: 0,
    xIsNext: true
  });

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step: any, move: number) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) ?? squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    });
  };

  const jumpTo = (step: number) => {
    setState({
      history: Object.assign(state.history),
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => {
            handleClick(i);
          }}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
