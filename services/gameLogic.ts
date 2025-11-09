
import { BoardState, Player } from '../types';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

export const checkWinner = (board: BoardState): { winner: Player; line: number[] } | null => {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return null;
};

export const isBoardFull = (board: BoardState): boolean => {
  return board.every(cell => cell !== null);
};

export const getValidMoves = (board: BoardState): number[] => {
  return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
};
