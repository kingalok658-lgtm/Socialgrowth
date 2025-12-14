import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { DailyStats, Platform } from '../types';

interface ChartsViewProps {
  stats: DailyStats[];
  platform: Platform;
}

export const ChartsView: React.FC<ChartsViewProps> = ({ stats, platform }) => {
  const data = useMemo(() => {
    return stats
      .filter(s => s.platform === platform)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(s => ({
        ...s,
        dateFormatted: new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        engagementRate: ((s.likes + s.comments) / (s.views || 1)) * 100
      }));
  }, [stats, platform]);

  if (data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
        <p>No data available for charts.</p>
        <p className="text-sm mt-2">Add daily stats to see trends.</p>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-6 px-4 space-y-8 overflow-y-auto h-full">
      <h2 className="text-xl font-bold text-white mb-4 px-2">Growth Trends</h2>

      {/* Follower Growth */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">
          {platform === 'youtube' ? 'Subscriber' : 'Follower'} Growth
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis 
                dataKey="dateFormatted" 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="followers" 
                stroke="#a855f7" 
                strokeWidth={3} 
                dot={{ fill: '#a855f7', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Rate */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">Daily Engagement Rate (%)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis 
                dataKey="dateFormatted" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                 itemStyle={{ color: '#fff' }}
                 formatter={(val: number) => [val.toFixed(2) + '%', 'Engagement']}
              />
              <Line 
                type="monotone" 
                dataKey="engagementRate" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Posts Activity */}
       <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">Posting Consistency</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis 
                dataKey="dateFormatted" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                 itemStyle={{ color: '#fff' }}
              />
              <Bar 
                dataKey="postsCount" 
                name="Posts"
                fill="#ec4899" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};