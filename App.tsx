import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InputSection } from './components/InputSection';
import { VideoPreview } from './components/VideoPreview';
import { DownloadManager } from './components/DownloadManager';
import { VideoDetails, AiInsights } from './types';
import { getVideoId, getThumbnailUrl } from './utils/youtube';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoDetails | null>(null);
  const [aiInsights, setAiInsights] = useState<AiInsights | null>(null);

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setAiInsights(null); // Reset insights
    setCurrentVideo(null); // Reset current video
    
    // Simulate API delay for finding video
    setTimeout(() => {
      const id = getVideoId(url);
      if (id) {
        setCurrentVideo({
          id,
          url,
          thumbnailUrl: getThumbnailUrl(id)
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-red-500/30 selection:text-red-200">
      <Navbar />
      
      <main className="container mx-auto px-4 pb-20">
        <InputSection onAnalyze={handleAnalyze} isLoading={loading} />

        {currentVideo && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 fade-in duration-500">
            <VideoPreview 
              video={currentVideo} 
              insights={aiInsights}
              setInsights={setAiInsights}
            />
            
            <div className="mt-8 mb-4 border-t border-slate-800 pt-8">
               <h2 className="text-2xl font-bold text-white mb-2">Download Options</h2>
               <p className="text-slate-400">Select your preferred quality and format to begin.</p>
            </div>
            
            <DownloadManager />
          </div>
        )}

        {!currentVideo && !loading && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto opacity-50">
            <FeatureCard 
              title="Ultra Fast" 
              desc="Optimized processing engine for quick format conversion." 
            />
            <FeatureCard 
              title="Gemini AI Inside" 
              desc="Get smart summaries, tags, and sentiment analysis for every video." 
            />
            <FeatureCard 
              title="Secure & Private" 
              desc="We do not store your download history or personal data." 
            />
          </div>
        )}
      </main>

      <footer className="w-full py-8 text-center text-slate-600 text-sm border-t border-slate-800/50 mt-auto">
        <p>&copy; {new Date().getFullYear()} TubeFetch AI. Built for demo purposes.</p>
      </footer>
    </div>
  );
}

const FeatureCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="text-center p-6 border border-slate-800 rounded-xl bg-slate-900/50">
    <h3 className="text-white font-bold mb-2">{title}</h3>
    <p className="text-sm">{desc}</p>
  </div>
);