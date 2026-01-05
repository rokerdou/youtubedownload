import React, { useState, useEffect } from 'react';
import { DownloadOption, DownloadStatus } from '../types';
import { Download, CheckCircle, Video, Music, AlertCircle, Loader2 } from 'lucide-react';

const options: DownloadOption[] = [
  { quality: '1080p Full HD', format: 'mp4', size: '154.2 MB', badge: 'Best' },
  { quality: '720p HD', format: 'mp4', size: '84.5 MB' },
  { quality: '480p SD', format: 'mp4', size: '42.1 MB' },
  { quality: '320kbps Audio', format: 'mp3', size: '8.4 MB' },
];

export const DownloadManager: React.FC = () => {
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [progress, setProgress] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    if (status === DownloadStatus.PREPARING) {
      const timer = setTimeout(() => {
        setStatus(DownloadStatus.DOWNLOADING);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (status === DownloadStatus.DOWNLOADING) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus(DownloadStatus.CONVERTING);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);
      return () => clearInterval(interval);
    }

    if (status === DownloadStatus.CONVERTING) {
      const timer = setTimeout(() => {
        setStatus(DownloadStatus.COMPLETED);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleDownload = () => {
    setStatus(DownloadStatus.PREPARING);
    setProgress(0);
  };

  const reset = () => {
    setStatus(DownloadStatus.IDLE);
    setProgress(0);
  };

  return (
    <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Options Panel */}
      <div className="lg:col-span-2 space-y-3">
        <h3 className="text-xl font-bold text-white mb-4">Select Format</h3>
        {options.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`cursor-pointer flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
              selectedIdx === idx
                ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                : 'bg-slate-900 border-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${selectedIdx === idx ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {opt.format === 'mp4' ? <Video className="w-5 h-5" /> : <Music className="w-5 h-5" />}
              </div>
              <div>
                <p className={`font-bold ${selectedIdx === idx ? 'text-white' : 'text-slate-300'}`}>{opt.quality}</p>
                <p className="text-xs text-slate-500 uppercase">{opt.format} • {opt.size}</p>
              </div>
            </div>
            {opt.badge && (
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                {opt.badge}
              </span>
            )}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedIdx === idx ? 'border-red-500' : 'border-slate-600'}`}>
              {selectedIdx === idx && <div className="w-3 h-3 bg-red-500 rounded-full" />}
            </div>
          </div>
        ))}
      </div>

      {/* Action Panel */}
      <div className="lg:col-span-1">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-full flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white mb-2">Ready to Download</h4>
            <p className="text-sm text-slate-400 mb-6">
              File: <span className="text-white font-mono">video-{options[selectedIdx].format}</span><br/>
              Size: {options[selectedIdx].size}
            </p>
          </div>

          {status === DownloadStatus.IDLE && (
            <button
              onClick={handleDownload}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20"
            >
              <Download className="w-5 h-5" />
              Download Now
            </button>
          )}

          {status !== DownloadStatus.IDLE && status !== DownloadStatus.COMPLETED && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-400">
                <span>
                  {status === DownloadStatus.PREPARING && "Connecting..."}
                  {status === DownloadStatus.DOWNLOADING && "Downloading..."}
                  {status === DownloadStatus.CONVERTING && "Processing..."}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-center py-2">
                 <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
              </div>
            </div>
          )}

          {status === DownloadStatus.COMPLETED && (
             <div className="text-center animate-in fade-in zoom-in duration-300">
               <div className="bg-green-500/10 text-green-500 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                 <CheckCircle className="w-8 h-8" />
               </div>
               <h4 className="font-bold text-white text-lg">Download Ready</h4>
               <p className="text-xs text-slate-500 mt-2 mb-4">
                 Your file is ready to save to device.
               </p>
               <button 
                 onClick={reset}
                 className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium"
               >
                 Download Another
               </button>
             </div>
          )}
          
          <div className="mt-6 flex items-start gap-2 bg-slate-800/50 p-3 rounded text-xs text-slate-500">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-slate-400" />
            <p>
              Note: This is a client-side demo. Direct stream download requires a backend server due to CORS policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};