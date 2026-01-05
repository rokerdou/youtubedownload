import React, { useState } from 'react';
import { Search, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { validateUrl } from '../utils/youtube';

interface InputSectionProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!inputUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!validateUrl(inputUrl)) {
      setError('Invalid YouTube URL format');
      return;
    }

    onAnalyze(inputUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Download Video & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            Generate AI Insights
          </span>
        </h2>
        <p className="text-slate-400 text-lg">
          Paste a YouTube link to fetch formats and get a Gemini-powered summary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-slate-900 rounded-xl p-2 border border-slate-700 shadow-2xl">
          <div className="pl-4 text-slate-500">
            <LinkIcon className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-4 py-3 text-lg"
            placeholder="Paste YouTube URL here..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></span>
            ) : (
              <>
                Start <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
      {error && (
        <p className="text-red-500 mt-3 text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
          {error}
        </p>
      )}
    </div>
  );
};