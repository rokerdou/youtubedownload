import React from 'react';
import { Youtube, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-red-600 p-2 rounded-lg">
          <Youtube className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          TubeFetch <span className="text-red-500">AI</span>
        </h1>
      </div>
      <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-400">
        <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>Powered by Gemini</span>
        </div>
        <a href="#" className="hover:text-white transition-colors">How it works</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
      </div>
    </nav>
  );
};