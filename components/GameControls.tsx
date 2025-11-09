
import React from 'react';
import { Difficulty } from '../types';

interface GameControlsProps {
  onReset: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  difficulty: Difficulty;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset, onDifficultyChange, difficulty }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="difficulty" className="text-slate-400 font-medium">Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-1/2 p-2.5"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <button
        onClick={onReset}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
      >
        New Game
      </button>
    </div>
  );
};

export default GameControls;
