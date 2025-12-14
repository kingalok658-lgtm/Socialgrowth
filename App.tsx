import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ChartsView } from './components/ChartsView';
import { DataEntry } from './components/DataEntry';
import { Advisor } from './components/Advisor';
import { DailyStats, Post, Platform } from './types';
import { getStoredStats, getStoredPosts, saveStats, savePosts } from './services/storageService';

const App: React.FC = () => {
  // State
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Load data on mount
  useEffect(() => {
    const loadedStats = getStoredStats();
    const loadedPosts = getStoredPosts();
    setStats(loadedStats);
    setPosts(loadedPosts);
  }, []);

  // Handlers to update state and persistence
  const handleAddStats = (newStat: DailyStats) => {
    const updatedStats = [...stats, newStat];
    setStats(updatedStats);
    saveStats(updatedStats);
  };

  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  // View Routing
  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard stats={stats} posts={posts} platform={platform} setPlatform={setPlatform} />;
      case 'charts':
        return <ChartsView stats={stats} platform={platform} />;
      case 'add':
        return <DataEntry onAddStats={handleAddStats} onAddPost={handleAddPost} currentPlatform={platform} />;
      case 'advisor':
        return <Advisor stats={stats} posts={posts} platform={platform} />;
      default:
        return <Dashboard stats={stats} posts={posts} platform={platform} setPlatform={setPlatform} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans">
      {/* Header - Simple Mobile Title */}
      <header className="flex-none h-14 bg-gray-900/95 backdrop-blur border-b border-gray-800 flex items-center justify-center sticky top-0 z-10 px-4">
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          SocialGrowth
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default App;