import React, { useState } from 'react';
import { DailyStats, Post, Platform, AdvisorResponse } from '../types';
import { generateSocialAdvice } from '../services/geminiService';
import { Sparkles, BrainCircuit, CheckCircle2, Target } from 'lucide-react';

interface AdvisorProps {
  stats: DailyStats[];
  posts: Post[];
  platform: Platform;
}

export const Advisor: React.FC<AdvisorProps> = ({ stats, posts, platform }) => {
  const [advice, setAdvice] = useState<AdvisorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAdvice = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Filter data for the current platform to give relevant advice
      const platformStats = stats.filter(s => s.platform === platform);
      const platformPosts = posts.filter(p => p.platform === platform);

      if (platformStats.length < 2) {
        throw new Error("Need at least 2 days of data to generate trends.");
      }

      const response = await generateSocialAdvice(platformStats, platformPosts);
      setAdvice(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-lg mx-auto h-full overflow-y-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-900/50 p-2 rounded-lg">
          <BrainCircuit className="text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Growth Advisor</h2>
          <p className="text-xs text-gray-400">Powered by Gemini 2.5</p>
        </div>
      </div>

      {!advice && !loading && (
        <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700 border-dashed">
          <Sparkles className="mx-auto text-yellow-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-200 mb-2">Ready to Grow?</h3>
          <p className="text-gray-500 text-sm px-6 mb-6">
            Get personalized strategy based on your stats for <span className="capitalize font-bold text-white">{platform}</span>.
          </p>
          <button
            onClick={handleGenerateAdvice}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-900/40 hover:scale-105 transition-transform"
          >
            Generate Advice
          </button>
          {error && <p className="text-red-400 text-sm mt-4 px-4">{error}</p>}
        </div>
      )}

      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400 animate-pulse">Analyzing your growth patterns...</p>
        </div>
      )}

      {advice && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Focus Area */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl border border-indigo-500/30 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-indigo-300">
              <Target size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Primary Focus</span>
            </div>
            <h3 className="text-2xl font-bold text-white leading-tight">{advice.focusArea}</h3>
          </div>

          {/* Detailed Advice */}
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
             <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">Analysis</h4>
             <p className="text-gray-300 leading-relaxed text-sm">
               {advice.advice}
             </p>
          </div>

          {/* Action Items */}
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
            <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wide">Action Plan</h4>
            <ul className="space-y-4">
              {advice.actionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-sm text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleGenerateAdvice}
            className="w-full py-4 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Refresh Advice
          </button>
        </div>
      )}
    </div>
  );
};