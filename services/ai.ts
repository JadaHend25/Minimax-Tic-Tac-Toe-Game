
import { BoardState, Difficulty, Player } from '../types';
import { checkWinner, getValidMoves, isBoardFull } from './gameLogic';

const HUMAN_PLAYER: Player = 'X';
const AI_PLAYER: Player = 'O';

const evaluate = (board: BoardState): number => {
  const winnerInfo = checkWinner(board);
  if (winnerInfo) {
    if (winnerInfo.winner === AI_PLAYER) return 10;
    if (winnerInfo.winner === HUMAN_PLAYER) return -10;
  }
  return 0;
};

const minimax = (board: BoardState, depth: number, isMaximizing: boolean, alpha: number, beta: number): number => {
  const score = evaluate(board);

  if (score === 10 || score === -10) return score - depth;
  if (isBoardFull(board) || depth === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of getValidMoves(board)) {
      board[move] = AI_PLAYER;
      best = Math.max(best, minimax(board, depth - 1, !isMaximizing, alpha, beta));
      board[move] = null;
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of getValidMoves(board)) {
      board[move] = HUMAN_PLAYER;
      best = Math.min(best, minimax(board, depth - 1, !isMaximizing, alpha, beta));
      board[move] = null;
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
};

const findBestMove = (board: BoardState, depth: number): number | null => {
  let bestVal = -Infinity;
  let bestMove: number | null = null;
  const moves = getValidMoves(board);

  for (const move of moves) {
    board[move] = AI_PLAYER;
    const moveVal = minimax(board, depth, false, -Infinity, Infinity);
    board[move] = null;

    if (moveVal > bestVal) {
      bestMove = move;
      bestVal = moveVal;
    }
  }
  return bestMove;
};


export const chooseAiMove = (board: BoardState, difficulty: Difficulty): number | null => {
  const validMoves = getValidMoves(board);
  if (validMoves.length === 0) return null;

  switch (difficulty) {
    case 'Easy':
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    case 'Medium':
      // 50% chance of optimal move, 50% random
      if (Math.random() > 0.5) {
          return findBestMove(board, 2); // Limited depth
      }
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    case 'Hard':
      return findBestMove(board, 9); // Full depth
    default:
      return validMoves[Math.floor(Math.random() * validMoves.length)];
  }
};
