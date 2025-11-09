
import React, { useState, useEffect, useCallback } from 'react';
import { BoardState, Player, Difficulty, Scores } from './types';
import { checkWinner, isBoardFull } from './services/gameLogic';
import { chooseAiMove } from './services/ai';
import Board from './components/Board';
import GameControls from './components/GameControls';
import Scoreboard from './components/Scoreboard';
import StatusDisplay from './components/StatusDisplay';

const HUMAN_PLAYER: Player = 'X';
const AI_PLAYER: Player = 'O';
const INITIAL_BOARD: BoardState = Array(9).fill(null);

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [isHumanTurn, setIsHumanTurn] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('Hard');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState<Scores>({ human: 0, ai: 0, draw: 0 });
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const handleGameEnd = useCallback((currentWinner: Player | 'Draw' | null) => {
    if (currentWinner) {
      setWinner(currentWinner);
      setScores(prevScores => {
        if (currentWinner === HUMAN_PLAYER) return { ...prevScores, human: prevScores.human + 1 };
        if (currentWinner === AI_PLAYER) return { ...prevScores, ai: prevScores.ai + 1 };
        if (currentWinner === 'Draw') return { ...prevScores, draw: prevScores.draw + 1 };
        return prevScores;
      });
    }
  }, []);

  useEffect(() => {
    if (!isHumanTurn && !winner) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const aiMove = chooseAiMove(newBoard, difficulty);

        if (aiMove !== null) {
          newBoard[aiMove] = AI_PLAYER;
          setBoard(newBoard);
          
          const gameResult = checkWinner(newBoard);
          if (gameResult) {
            handleGameEnd(gameResult.winner);
            setWinningLine(gameResult.line);
          } else if (isBoardFull(newBoard)) {
            handleGameEnd('Draw');
          } else {
            setIsHumanTurn(true);
          }
        }
        setIsAiThinking(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isHumanTurn, board, winner, difficulty, handleGameEnd]);

  const handleCellClick = (index: number) => {
    if (board[index] || !isHumanTurn || winner || isAiThinking) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = HUMAN_PLAYER;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      handleGameEnd(gameResult.winner);
      setWinningLine(gameResult.line);
    } else if (isBoardFull(newBoard)) {
      handleGameEnd('Draw');
    } else {
      setIsHumanTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setIsHumanTurn(true);
    setWinner(null);
    setWinningLine(null);
    setIsAiThinking(false);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
    setScores({ human: 0, ai: 0, draw: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 tracking-wider">
          Tic-Tac-Toe AI
        </h1>
        <p className="text-slate-400 mt-2">Can you beat the Minimax algorithm?</p>
      </header>
      
      <main className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-6 ring-1 ring-slate-700">
        <StatusDisplay winner={winner} isHumanTurn={isHumanTurn} isAiThinking={isAiThinking} />
        <Board board={board} onCellClick={handleCellClick} winningLine={winningLine} disabled={!isHumanTurn || !!winner || isAiThinking} />
        <Scoreboard scores={scores} />
        <GameControls
          onReset={resetGame}
          onDifficultyChange={handleDifficultyChange}
          difficulty={difficulty}
        />
      </main>

      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>Built with React, TypeScript & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
