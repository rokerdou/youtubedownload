import React, { useState } from 'react';
import { VideoDetails, AiInsights } from '../types';
import { Sparkles, Tag, FileText, PlayCircle } from 'lucide-react';
import { generateVideoInsights } from '../services/geminiService';

interface VideoPreviewProps {
  video: VideoDetails;
  insights: AiInsights | null;
  setInsights: (insights: AiInsights) => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ video, insights, setInsights }) => {
  const [manualTitle, setManualTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateInsights = async () => {
    if (!manualTitle) return;
    setIsGenerating(true);
    try {
      const result = await generateVideoInsights(manualTitle);
      setInsights(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mt-8 flex flex-col md:flex-row">
      {/* Thumbnail Section */}
      <div className="md:w-5/12 relative group">
        <img
          src={video.thumbnailUrl}
          alt="Video Thumbnail"
          className="w-full h-full object-cover min-h-[250px]"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="w-16 h-16 text-white/90" />
        </div>
        <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">
          HD
        </div>
      </div>

      {/* Content Section */}
      <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {manualTitle || insights?.suggestedFileName || "Video Found"}
          </h3>
          <p className="text-slate-400 text-sm font-mono mb-4 break-all">
            ID: {video.id} <span className="mx-2">•</span> Source: YouTube
          </p>

          {!insights ? (
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-3 text-yellow-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Unlock AI Insights</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Enter the video title manually to generate an AI summary, tags, and SEO-friendly filename using Gemini.
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter video title here..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:border-red-500 outline-none"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                />
                <button 
                  onClick={handleGenerateInsights}
                  disabled={!manualTitle || isGenerating}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isGenerating ? "Thinking..." : "Generate"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-2 text-indigo-400 mb-2 font-semibold text-sm">
                  <FileText className="w-4 h-4" />
                  AI Summary
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {insights.summary}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {insights.tags.map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-1 bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs hover:text-white hover:bg-slate-700 transition-colors cursor-default">
                    <Tag className="w-3 h-3" /> #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};