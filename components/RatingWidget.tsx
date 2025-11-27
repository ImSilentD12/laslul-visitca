import React, { useState, useEffect } from 'react';
import { Star, Calculator, TrendingUp } from 'lucide-react';
import { BurrText } from './BurrText';
import { ViewMode } from '../types';

interface RatingWidgetProps {
  mode: ViewMode;
}

export const RatingWidget: React.FC<RatingWidgetProps> = ({ mode }) => {
  const [hovered, setHovered] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  // Initial state: 4.7 average, 137 votes (math constants references ideally, but simple integers work best for UI)
  const [average, setAverage] = useState<number>(4.7);
  const [totalVotes, setTotalVotes] = useState<number>(137);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rasul_rating');
    if (saved) {
      setSelected(parseInt(saved));
      setHasVoted(true);
    }
  }, []);

  const handleVote = (star: number) => {
    if (hasVoted) return;
    
    setSelected(star);
    setHasVoted(true);
    localStorage.setItem('rasul_rating', star.toString());

    // Simulate average update (weighted average simulation)
    const newTotal = totalVotes + 1;
    // Formula to slightly shift average towards the vote
    const newAvg = ((average * totalVotes) + star) / newTotal;
    
    setAverage(newAvg);
    setTotalVotes(newTotal);
  };

  const getResponse = () => {
    if (!hasVoted) return "Оцени уровень энтропии:";
    if (selected === 5) return "Аксиоматически верно. Ты разбираешься в людях.";
    if (selected === 4) return "Приемлемо. Погрешность в пределах нормы.";
    if (selected === 3) return "Слишком нормальная оценка. Скучно.";
    if (selected <= 2) return "Твоя оценка иррациональна, как корень из двух.";
    return "";
  };

  return (
    <div className="border-2 border-dashed border-zinc-700 bg-zinc-900/30 p-8 max-w-lg mx-auto my-12 text-center relative overflow-hidden group hover:border-green-500 transition-colors">
      <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 font-mono">
        BETA
      </div>
      
      <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2 text-white font-syne">
        <Calculator size={20} className="text-pink-500"/>
        <BurrText text="РЕЙТИНГ ГЕНИАЛЬНОСТИ" mode={mode} />
      </h3>
      
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-white tracking-tighter">{average.toFixed(1)}</span>
            <span className="text-zinc-500 text-lg font-mono">/ 5.0</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-500 font-mono mt-1">
            <TrendingUp size={12} />
            <BurrText text="Растет экспоненциально" mode={mode} />
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => !hasVoted && setHovered(star)}
            onMouseLeave={() => !hasVoted && setHovered(0)}
            onClick={() => handleVote(star)}
            disabled={hasVoted}
            className={`transition-all duration-200 transform hover:scale-125 focus:outline-none ${
              star <= (hovered || selected) ? 'text-yellow-400' : 'text-zinc-800 hover:text-yellow-200'
            }`}
          >
            <Star 
              size={36} 
              fill={star <= (hovered || selected) ? "currentColor" : "none"} 
              strokeWidth={star <= (hovered || selected) ? 0 : 1.5}
            />
          </button>
        ))}
      </div>

      <div className="text-sm font-mono text-pink-500 min-h-[1.5em] font-bold">
        <BurrText text={getResponse()} mode={mode} />
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-600 font-mono flex justify-between px-4">
        <span>n = {totalVotes}</span>
        <BurrText text="Доверительный интервал: 95%" mode={mode} />
      </div>
    </div>
  );
};