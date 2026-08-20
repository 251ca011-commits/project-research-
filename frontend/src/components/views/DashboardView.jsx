import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Sparkles, 
  GitCompare, 
  Bookmark, 
  FileText, 
  Gavel, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Scale, 
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { VerificationBadge, SimilarityBadge, TagBadge } from '../common/Badge';

export const DashboardView = () => {
  const { 
    navigateTo, 
    allCases, 
    allJudgments, 
    recentSearches, 
    savedCaseIds, 
    toggleSaveCase, 
    executeSearch, 
    user 
  } = useApp();

  const [dashSearch, setDashSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (dashSearch.trim()) {
      executeSearch(dashSearch.trim());
    }
  };

  const savedCasesList = allCases.filter(c => savedCaseIds.includes(c.case_id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome & Universal Search */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-slate-950 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>AI-Assisted Legal Precedent Discovery</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Search case facts, analyze judicial reasoning across High Courts & the Supreme Court, uncover high-similarity precedents, and examine outcome predictions.
          </p>

          {/* Main Case Search Box */}
          <form onSubmit={handleSearch} className="pt-2">
            <div className="relative flex items-center shadow-xl">
              <Search className="w-5 h-5 text-indigo-400 absolute left-4" />
              <input
                type="text"
                value={dashSearch}
                onChange={(e) => setDashSearch(e.target.value)}
                placeholder="Search for a case, legal issue, section or keyword (e.g., Hindu Succession Section 6, Arbitration 34)..."
                className="w-full pl-12 pr-32 py-3.5 rounded-xl bg-slate-950/90 border border-indigo-500/30 text-xs md:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
              >
                Search Precedents
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Action Tiles (Section 5 Spec) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => navigateTo('search')}
            className="p-4 rounded-xl glass-panel-interactive cursor-pointer group space-y-2"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-950/70 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">Search Case</h3>
            <p className="text-xs text-slate-400">Filter precedents by Court, Section, Case Type, and Outcomes.</p>
          </div>

          <div
            onClick={() => navigateTo('similar')}
            className="p-4 rounded-xl glass-panel-interactive cursor-pointer group space-y-2"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">Find Similar Cases</h3>
            <p className="text-xs text-slate-400">Identify 90%+ similarity matches with reasoning breakdown.</p>
          </div>

          <div
            onClick={() => navigateTo('compare')}
            className="p-4 rounded-xl glass-panel-interactive cursor-pointer group space-y-2"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
              <GitCompare className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100 group-hover:text-purple-300 transition-colors">Compare Cases</h3>
            <p className="text-xs text-slate-400">Side-by-side doctrinal comparison of facts, issues, and rulings.</p>
          </div>

          <div
            onClick={() => navigateTo('saved')}
            className="p-4 rounded-xl glass-panel-interactive cursor-pointer group space-y-2"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">View Saved Cases</h3>
            <p className="text-xs text-slate-400">Access your bookmarked briefs and precedent binders.</p>
          </div>
        </div>
      </div>

      {/* Grid: Recent Cases & Recent Searches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Cases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Recent Cases Under Research</span>
            </h2>
            <button 
              onClick={() => navigateTo('search')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              <span>Explore All Cases</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {allCases.map((c) => (
              <div 
                key={c.case_id}
                className="p-4 rounded-xl glass-panel-interactive space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <TagBadge variant="court">{c.jurisdiction}</TagBadge>
                      <TagBadge variant="primary">{c.case_type}</TagBadge>
                      <span className="text-[11px] text-slate-400">{c.case_number}</span>
                    </div>
                    <h3 
                      onClick={() => navigateTo('case-details', { caseId: c.case_id })}
                      className="text-sm font-semibold text-slate-100 hover:text-indigo-400 cursor-pointer transition-colors"
                    >
                      {c.case_title}
                    </h3>
                  </div>

                  <SimilarityBadge score={c.similarity_top_score} />
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {c.short_description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>{c.sections.map(s => `${s.act_name} ${s.section_number}`).join(', ')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveCase(c.case_id)}
                      className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${
                        savedCaseIds.includes(c.case_id) ? 'text-amber-400' : 'text-slate-400'
                      }`}
                      title={savedCaseIds.includes(c.case_id) ? "Saved" : "Save Case"}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => navigateTo('similar', { caseId: c.case_id })}
                      className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900 text-xs font-medium flex items-center gap-1"
                    >
                      <span>Similar Cases</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => navigateTo('case-details', { caseId: c.case_id })}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                    >
                      View Case
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Recent Searches & Recent Judgments */}
        <div className="space-y-6">
          {/* Recent Searches */}
          <div className="p-4 rounded-xl glass-panel space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Recent Searches</span>
            </h2>
            <div className="space-y-2">
              {recentSearches.map((s, idx) => (
                <div 
                  key={idx}
                  onClick={() => executeSearch(s.query)}
                  className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 cursor-pointer group transition-colors"
                >
                  <div className="text-xs font-medium text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-1">
                    "{s.query}"
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>{s.results_count} precedents found</span>
                    <span>{s.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Judgments */}
          <div className="p-4 rounded-xl glass-panel space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Gavel className="w-4 h-4 text-cyan-400" />
              <span>Key Bench Judgments</span>
            </h2>
            <div className="space-y-2.5">
              {allJudgments.slice(0, 3).map((j) => (
                <div 
                  key={j.judgment_id}
                  onClick={() => navigateTo('judgments', { judgmentId: j.judgment_id })}
                  className="p-3 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 cursor-pointer group transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-indigo-400 font-mono font-medium">{j.citation}</span>
                    <VerificationBadge status={j.source.verification_status} />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {j.case_name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {j.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
