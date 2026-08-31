import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Sparkles, 
  GitCompare, 
  TrendingUp, 
  Bookmark, 
  ChevronRight, 
  Layers,
  FolderOpen,
  LogIn
} from 'lucide-react';

export const Header = () => {
  const { 
    currentView, 
    navigateTo, 
    allCases, 
    selectedCaseId, 
    setSelectedCaseId, 
    executeSearch,
    savedCaseIds,
    savedJudgmentIds,
    activeCase
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      executeSearch(inputVal.trim());
    }
  };

  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard Overview';
      case 'search': return 'Case & Precedent Search';
      case 'search-results': return 'Search Results Matrix';
      case 'case-details': return `Case File: ${activeCase ? activeCase.case_title : 'Details'}`;
      case 'similar': return 'Similar Precedents & Match Explanations';
      case 'compare': return 'Side-by-Side Case Comparison';
      case 'judgments': return 'Judgment Details & Court Reasoning';
      case 'legal-issues': return 'Legal Issues Repository';
      case 'legal-sections': return 'Acts & Sections Catalog';
      case 'prediction': return 'AI Judgment Outcome Prediction';
      case 'verification': return 'Source Verification Registry';
      case 'saved': return 'Saved Research Binder';
      case 'settings': return 'System & Preferences';
      case 'login': return 'Authentication Portal';
      default: return 'Legal Research Workbench';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between gap-4">
      {/* Left: Breadcrumbs & Current View */}
      <div className="flex items-center gap-3 min-w-0">
        <button 
          onClick={() => navigateTo('dashboard')}
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors shrink-0"
        >
          RESEARCH
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        <h2 className="text-xs font-medium text-indigo-300 truncate font-mono">
          {getBreadcrumbTitle()}
        </h2>
      </div>

      {/* Center: Global Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search case title, legal issue, section (e.g. Section 6 Hindu Succession Act)..."
            className="w-full pl-10 pr-24 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors shadow"
          >
            Search
          </button>
        </div>
      </form>

      {/* Right: Quick Action Controls & Case Switcher */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Active Case Switcher */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
          <select
            value={selectedCaseId}
            onChange={(e) => {
              setSelectedCaseId(Number(e.target.value));
            }}
            className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
          >
            {allCases.map((c) => (
              <option key={c.case_id} value={c.case_id} className="bg-slate-900 text-slate-200">
                Case #{c.case_id}: {c.case_title.slice(0, 24)}...
              </option>
            ))}
          </select>
        </div>

        {/* Quick Shortcut Buttons */}
        <button
          onClick={() => navigateTo('similar')}
          title="Find Similar Cases"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Similar Precedents</span>
        </button>

        <button
          onClick={() => navigateTo('prediction')}
          title="AI Outcome Prediction"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all"
        >
          <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          <span>AI Prediction</span>
        </button>

        <button
          onClick={() => navigateTo('compare')}
          title="Compare Cases"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-all"
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span>Compare</span>
        </button>

        <button
          onClick={() => navigateTo('saved')}
          title="Saved Items"
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 relative transition-all"
        >
          <Bookmark className="w-4 h-4" />
          {(savedCaseIds.length + savedJudgmentIds.length > 0) && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
              {savedCaseIds.length + savedJudgmentIds.length}
            </span>
          )}
        </button>

        <button
          onClick={() => navigateTo('login')}
          title="Account / Sign In"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary border border-border text-secondary-foreground text-xs font-semibold hover:border-primary transition-all cursor-pointer"
        >
          <LogIn className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">Sign In</span>
        </button>
      </div>
    </header>
  );
};
