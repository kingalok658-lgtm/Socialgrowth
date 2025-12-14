import { DailyStats, Post, INITIAL_STATS, INITIAL_POSTS } from '../types';

const STATS_KEY = 'social_growth_stats';
const POSTS_KEY = 'social_growth_posts';

export const getStoredStats = (): DailyStats[] => {
  const stored = localStorage.getItem(STATS_KEY);
  if (!stored) {
    // Return initial data for demo purposes if nothing is stored
    return INITIAL_STATS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse stats", e);
    return INITIAL_STATS;
  }
};

export const saveStats = (stats: DailyStats[]) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const getStoredPosts = (): Post[] => {
  const stored = localStorage.getItem(POSTS_KEY);
  if (!stored) {
    return INITIAL_POSTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse posts", e);
    return INITIAL_POSTS;
  }
};

export const savePosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const clearData = () => {
  localStorage.removeItem(STATS_KEY);
  localStorage.removeItem(POSTS_KEY);
};