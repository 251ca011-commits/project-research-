import React from 'react';
import { Loader2, Sparkles, Scale, Search, GitCompare } from 'lucide-react';

export const LoadingState = ({ message = "Processing legal request...", type = "default" }) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="w-8 h-8 text-indigo-400 animate-pulse" />;
      case 'similar':
        return <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />;
      case 'predict':
        return <Scale className="w-8 h-8 text-amber-400 animate-bounce" />;
      case 'compare':
        return <GitCompare className="w-8 h-8 text-purple-400 animate-pulse" />;
      default:
        return <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl shadow-indigo-950/20">
        {getIcon()}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-200">{message}</h3>
        <p className="text-xs text-slate-400">Querying authoritative legal repositories and precedent graphs...</p>
      </div>
    </div>
  );
};
