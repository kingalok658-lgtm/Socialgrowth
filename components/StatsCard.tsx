import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage change
  subtext?: string;
  color?: 'purple' | 'blue' | 'pink' | 'red';
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  trend, 
  subtext,
  color = 'purple' 
}) => {
  const colorClasses = {
    purple: 'bg-purple-900/20 border-purple-500/30 text-purple-100',
    blue: 'bg-blue-900/20 border-blue-500/30 text-blue-100',
    pink: 'bg-pink-900/20 border-pink-500/30 text-pink-100',
    red: 'bg-red-900/20 border-red-500/30 text-red-100',
  };

  const isPositive = trend && trend >= 0;

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]} flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium opacity-80">{title}</span>
        {trend !== undefined && (
          <div className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            <span className="ml-1">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        {subtext && <p className="text-xs opacity-60 mt-1">{subtext}</p>}
      </div>
    </div>
  );
};