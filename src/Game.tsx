import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { Board } from './Board';
import { GameState } from './models/GameState';
import { SnapShot } from './models/SnapShot';
import './index.css';
import { Stack } from '@mui/material';

export function Game() {
  const snap: SnapShot = {
    squares: ['', '', '', '', '', '', '', '', '']
  };

  const [state, setState] = useState<GameState>({
    history: [snap],
    stepNumber: 0,
    xIsNext: true
  });

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((_step: any, move: number) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <Chip
        key={move}
        onClick={() => {
          jumpTo(move);
        }}
        label={desc}
      />
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
        <Typography variant="h6" component="h1">
          {status}
        </Typography>
        <Stack spacing={1}>{moves}</Stack>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
