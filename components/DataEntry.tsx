import React, { useState } from 'react';
import { DailyStats, Post, Platform } from '../types';
import { Plus, Save, BarChart2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Actually we will use simple Math.random for demo if UUID package not available, but let's just stick to simple string generation

interface DataEntryProps {
  onAddStats: (stats: DailyStats) => void;
  onAddPost: (post: Post) => void;
  currentPlatform: Platform;
}

export const DataEntry: React.FC<DataEntryProps> = ({ onAddStats, onAddPost, currentPlatform }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'post'>('daily');
  
  // Daily Stats Form State
  const [statsForm, setStatsForm] = useState({
    date: new Date().toISOString().split('T')[0],
    followers: '',
    views: '',
    likes: '',
    comments: '',
    postsCount: ''
  });

  // Post Form State
  const [postForm, setPostForm] = useState({
    title: '',
    type: 'reel',
    views: '',
    likes: '',
    comments: ''
  });

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStats: DailyStats = {
      id: Math.random().toString(36).substr(2, 9),
      platform: currentPlatform,
      date: statsForm.date,
      followers: Number(statsForm.followers),
      views: Number(statsForm.views),
      likes: Number(statsForm.likes),
      comments: Number(statsForm.comments),
      postsCount: Number(statsForm.postsCount)
    };
    onAddStats(newStats);
    setStatsForm(prev => ({ ...prev, followers: '', views: '', likes: '', comments: '', postsCount: '' }));
    alert("Daily stats saved!");
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const views = Number(postForm.views);
    const likes = Number(postForm.likes);
    const comments = Number(postForm.comments);
    const er = views > 0 ? ((likes + comments) / views) * 100 : 0;

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      platform: currentPlatform,
      title: postForm.title,
      type: postForm.type as any,
      views,
      likes,
      comments,
      engagementRate: parseFloat(er.toFixed(2))
    };
    onAddPost(newPost);
    setPostForm({ title: '', type: 'reel', views: '', likes: '', comments: '' });
    alert("Post added to tracking!");
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">Add New Data</h2>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
            activeTab === 'daily' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <BarChart2 size={18} />
          <span>Daily Stats</span>
        </button>
        <button
          onClick={() => setActiveTab('post')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
            activeTab === 'post' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Plus size={18} />
          <span>Top Post</span>
        </button>
      </div>

      {activeTab === 'daily' ? (
        <form onSubmit={handleStatsSubmit} className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-xl space-y-4 border border-gray-700">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Date</label>
              <input
                type="date"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={statsForm.date}
                onChange={e => setStatsForm({...statsForm, date: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {currentPlatform === 'youtube' ? 'Subscribers' : 'Followers'}
                </label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={statsForm.followers}
                  onChange={e => setStatsForm({...statsForm, followers: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Total Views</label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={statsForm.views}
                  onChange={e => setStatsForm({...statsForm, views: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Total Likes</label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={statsForm.likes}
                  onChange={e => setStatsForm({...statsForm, likes: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Total Comments</label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={statsForm.comments}
                  onChange={e => setStatsForm({...statsForm, comments: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Posts Published Today</label>
              <input
                type="number"
                required
                placeholder="0"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={statsForm.postsCount}
                onChange={e => setStatsForm({...statsForm, postsCount: e.target.value})}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Save size={20} />
            <span>Save Stats</span>
          </button>
        </form>
      ) : (
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-xl space-y-4 border border-gray-700">
             <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Post Title / Caption</label>
              <input
                type="text"
                required
                placeholder="e.g. Morning Vlog"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={postForm.title}
                onChange={e => setPostForm({...postForm, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Type</label>
              <select
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={postForm.type}
                onChange={e => setPostForm({...postForm, type: e.target.value})}
              >
                <option value="reel">Reel / Short</option>
                <option value="photo">Photo</option>
                <option value="carousel">Carousel</option>
                <option value="video">Long Video</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Views</label>
                <input
                  type="number"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={postForm.views}
                  onChange={e => setPostForm({...postForm, views: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Likes</label>
                <input
                  type="number"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={postForm.likes}
                  onChange={e => setPostForm({...postForm, likes: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Comments</label>
                <input
                  type="number"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={postForm.comments}
                  onChange={e => setPostForm({...postForm, comments: e.target.value})}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Post</span>
          </button>
        </form>
      )}
    </div>
  );
};