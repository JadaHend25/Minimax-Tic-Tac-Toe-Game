
import React from 'react';
import { Scores } from '../types';

interface ScoreboardProps {
  scores: Scores;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => {
  return (
    <div className="flex justify-around text-center p-4 bg-slate-900/50 rounded-lg mt-4">
      <div className="px-2">
        <p className="text-sm text-cyan-400 font-semibold">You (X)</p>
        <p className="text-2xl font-bold">{scores.human}</p>
      </div>
      <div className="border-l border-slate-600"></div>
      <div className="px-2">
        <p className="text-sm text-slate-400 font-semibold">Draws</p>
        <p className="text-2xl font-bold">{scores.draw}</p>
      </div>
       <div className="border-l border-slate-600"></div>
      <div className="px-2">
        <p className="text-sm text-amber-400 font-semibold">AI (O)</p>
        <p className="text-2xl font-bold">{scores.ai}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
