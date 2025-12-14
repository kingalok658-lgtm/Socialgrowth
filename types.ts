export type Platform = 'instagram' | 'youtube';

export interface DailyStats {
  id: string;
  date: string;
  platform: Platform;
  followers: number;
  views: number;
  likes: number;
  comments: number;
  postsCount: number;
}

export interface Post {
  id: string;
  title: string; // e.g., Caption snippet
  platform: Platform;
  type: 'reel' | 'photo' | 'carousel' | 'video';
  views: number;
  likes: number;
  comments: number;
  engagementRate: number; // calculated
}

export interface AdvisorResponse {
  advice: string;
  focusArea: string;
  actionItems: string[];
}

export const INITIAL_STATS: DailyStats[] = [
  { id: '1', date: '2023-10-20', platform: 'instagram', followers: 1200, views: 500, likes: 120, comments: 10, postsCount: 1 },
  { id: '2', date: '2023-10-21', platform: 'instagram', followers: 1215, views: 600, likes: 150, comments: 15, postsCount: 1 },
  { id: '3', date: '2023-10-22', platform: 'instagram', followers: 1230, views: 450, likes: 100, comments: 8, postsCount: 0 },
  { id: '4', date: '2023-10-20', platform: 'youtube', followers: 5000, views: 2500, likes: 600, comments: 40, postsCount: 2 },
  { id: '5', date: '2023-10-21', platform: 'youtube', followers: 5050, views: 3000, likes: 750, comments: 60, postsCount: 1 },
  { id: '6', date: '2023-10-22', platform: 'youtube', followers: 5100, views: 2800, likes: 650, comments: 45, postsCount: 1 },
];

export const INITIAL_POSTS: Post[] = [
  { id: '101', title: 'Morning Routine', platform: 'instagram', type: 'reel', views: 5000, likes: 500, comments: 45, engagementRate: 10.9 },
  { id: '102', title: 'Dance Trend', platform: 'youtube', type: 'video', views: 15000, likes: 2500, comments: 120, engagementRate: 17.5 },
];