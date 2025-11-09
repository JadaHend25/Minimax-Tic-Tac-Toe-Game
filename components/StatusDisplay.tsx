
import React from 'react';
import { Player } from '../types';

interface StatusDisplayProps {
  winner: Player | 'Draw' | null;
  isHumanTurn: boolean;
  isAiThinking: boolean;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ winner, isHumanTurn, isAiThinking }) => {
  const getStatus = () => {
    if (winner) {
      if (winner === 'Draw') return { text: "🤝 It's a Draw! 🤝", color: 'text-slate-300' };
      if (winner === 'X') return { text: '🎉 You Win! 🎉', color: 'text-emerald-400' };
      return { text: '🤖 AI Wins! 🤖', color: 'text-red-500' };
    }
    if (isAiThinking) {
      return { text: 'AI is thinking...', color: 'text-amber-400' };
    }
    if (isHumanTurn) {
      return { text: 'Your Turn (X)', color: 'text-cyan-400' };
    }
    return { text: "AI's Turn (O)", color: 'text-amber-400' };
  };

  const { text, color } = getStatus();

  return (
    <div className="h-10 flex items-center justify-center">
      <p className={`text-xl font-bold transition-colors duration-300 ${color}`}>
        {text}
      </p>
    </div>
  );
};

export default StatusDisplay;
