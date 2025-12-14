import React, { useMemo } from 'react';
import { DailyStats, Post, Platform } from '../types';
import { StatsCard } from './StatsCard';
import { Trophy, TrendingUp, Users, Eye } from 'lucide-react';

interface DashboardProps {
  stats: DailyStats[];
  posts: Post[];
  platform: Platform;
  setPlatform: (p: Platform) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, posts, platform, setPlatform }) => {
  
  const currentStats = useMemo(() => {
    return stats
      .filter(s => s.platform === platform)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }, [stats, platform]);

  const prevStats = useMemo(() => {
    const sorted = stats
      .filter(s => s.platform === platform)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sorted.length > 1 ? sorted[1] : null;
  }, [stats, platform]);

  const topPosts = useMemo(() => {
    return posts
      .filter(p => p.platform === platform)
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 5);
  }, [posts, platform]);

  const calculateTrend = (current: number, prev: number) => {
    if (!prev) return 0;
    return parseFloat((((current - prev) / prev) * 100).toFixed(1));
  };

  return (
    <div className="space-y-6 pb-24 px-4 pt-6">
      
      {/* Platform Toggle */}
      <div className="flex p-1 bg-gray-800 rounded-lg mx-auto max-w-sm">
        <button
          onClick={() => setPlatform('instagram')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            platform === 'instagram' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          Instagram
        </button>
        <button
          onClick={() => setPlatform('youtube')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            platform === 'youtube' ? 'bg-gradient-to-r from-red-600 to-red-800 text-white border border-red-700 shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          YouTube
        </button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard 
          title={platform === 'youtube' ? 'Subscribers' : 'Followers'}
          value={currentStats?.followers.toLocaleString() || 0} 
          trend={prevStats ? calculateTrend(currentStats?.followers || 0, prevStats.followers) : 0}
          color={platform === 'instagram' ? 'purple' : 'red'}
        />
        <StatsCard 
          title="Avg Views" 
          value={currentStats?.views.toLocaleString() || 0}
          trend={prevStats ? calculateTrend(currentStats?.views || 0, prevStats.views) : 0}
          color={platform === 'instagram' ? 'pink' : 'red'}
        />
        <StatsCard 
          title="Engagement" 
          value={currentStats ? `${((currentStats.likes + currentStats.comments) / (currentStats.views || 1) * 100).toFixed(2)}%` : '0%'}
          subtext="Rate per view"
          color="blue"
        />
        <StatsCard 
          title="Posts" 
          value={currentStats?.postsCount || 0}
          subtext="Posted today"
          color="purple"
        />
      </div>

      {/* Top Performing Posts */}
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="flex items-center gap-2 mb-4 text-amber-400">
          <Trophy size={20} />
          <h2 className="text-lg font-bold text-white">Top Performers</h2>
        </div>
        
        <div className="space-y-3">
          {topPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-4 text-sm">No post data yet. Add some!</p>
          ) : (
            topPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-200 line-clamp-1">{post.title}</span>
                  <span className="text-xs text-gray-500 capitalize">{post.type}</span>
                </div>
                <div className="flex items-end flex-col">
                  <span className="text-green-400 font-bold text-sm">{post.engagementRate.toFixed(1)}% ER</span>
                  <span className="text-xs text-gray-500">{post.views.toLocaleString()} views</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};