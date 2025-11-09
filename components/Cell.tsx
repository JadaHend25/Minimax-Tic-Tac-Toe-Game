
import React from 'react';
import { CellValue } from '../types';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinner: boolean;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinner, disabled }) => {
  const baseClasses = 'flex items-center justify-center text-5xl md:text-6xl font-bold rounded-lg aspect-square transition-all duration-200';
  const stateClasses = disabled
    ? 'bg-slate-700 cursor-not-allowed'
    : 'bg-slate-700/50 hover:bg-slate-700 cursor-pointer';
  
  const winnerClasses = isWinner
    ? 'bg-emerald-500/80 text-white animate-pulse'
    : '';

  const playerXClasses = value === 'X' ? 'text-cyan-400' : '';
  const playerOClasses = value === 'O' ? 'text-amber-400' : '';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`${baseClasses} ${stateClasses} ${winnerClasses} ${playerXClasses} ${playerOClasses}`}
    >
      {value}
    </button>
  );
};

export default Cell;
