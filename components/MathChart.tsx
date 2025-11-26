import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { stage: 'Школа', ego: 10, mathAbility: 5, socialSkills: 10 },
  { stage: 'Бакалавр', ego: 90, mathAbility: 20, socialSkills: 2 },
  { stage: 'Аспирантура', ego: 100, mathAbility: 40, socialSkills: -5 },
  { stage: 'Постдок', ego: 40, mathAbility: 80, socialSkills: -20 },
  { stage: 'Сейчас', ego: 120, mathAbility: 99, socialSkills: -50 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-green-500 p-2 font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,255,0,1)]">
        <p className="text-green-400 font-bold">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MathChart: React.FC = () => {
  return (
    <div className="w-full h-64 bg-zinc-900 border-2 border-dashed border-zinc-700 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1 bg-yellow-400 text-black font-bold text-xs uppercase z-10">
            Жизненные Показатели
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="stage" stroke="#666" tick={{fill: '#888', fontSize: 10}} />
          <YAxis stroke="#666" tick={{fill: '#888', fontSize: 10}} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="stepAfter" dataKey="ego" stroke="#ff00ff" strokeWidth={2} dot={false} name="ЧСВ" />
          <Line type="monotone" dataKey="mathAbility" stroke="#00ff41" strokeWidth={2} dot={false} name="Скилл Матана" />
          <Line type="linear" dataKey="socialSkills" stroke="#ffff00" strokeWidth={2} strokeDasharray="5 5" name="Социалочка" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};