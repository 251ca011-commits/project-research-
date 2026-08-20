import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bookmark, 
  Trash2, 
  FileText, 
  Gavel, 
  ArrowRight, 
  Download, 
  GitCompare, 
  Sparkles,
  Layers
} from 'lucide-react';
import { TagBadge, SimilarityBadge, VerificationBadge } from '../common/Badge';

export const SavedCasesView = () => {
  const { 
    allCases, 
    allJudgments, 
    savedCaseIds, 
    savedJudgmentIds, 
    toggleSaveCase, 
    toggleSaveJudgment, 
    navigateTo, 
    setSelectedJudgmentId,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('cases');

  const savedCases = allCases.filter(c => savedCaseIds.includes(c.case_id));
  const savedJudgments = allJudgments.filter(j => savedJudgmentIds.includes(j.judgment_id));

  const exportResearchBinder = () => {
    showToast('Research brief exported to Legal Markdown / PDF Binder', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Precedent Binder</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Saved Cases & Bookmarked Judgments
            </h1>
            <p className="text-xs text-slate-400">
              Manage your curated library of active case files, similar precedents, and landmark citations.
            </p>
          </div>

          <button
            onClick={exportResearchBinder}
            className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Export Research Brief</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'cases'
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Saved Cases ({savedCases.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('judgments')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'judgments'
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Gavel className="w-4 h-4" />
            <span>Bookmarked Judgments ({savedJudgments.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Saved Cases */}
      {activeTab === 'cases' && (
        <div className="space-y-4">
          {savedCases.length > 0 ? (
            <div className="space-y-3">
              {savedCases.map((c) => (
                <div key={c.case_id} className="p-5 rounded-2xl glass-panel space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <TagBadge variant="court">{c.jurisdiction}</TagBadge>
                        <TagBadge variant="primary">{c.case_type}</TagBadge>
                        <span className="text-xs text-slate-400 font-mono">{c.case_number}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-100">{c.case_title}</h3>
                    </div>
                    <SimilarityBadge score={c.similarity_top_score} />
                  </div>

                  <p className="text-xs text-slate-300">{c.short_description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => toggleSaveCase(c.case_id)}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove from Saved</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateTo('similar', { caseId: c.case_id })}
                        className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900 font-semibold"
                      >
                        Find Similar Cases
                      </button>
                      <button
                        onClick={() => navigateTo('case-details', { caseId: c.case_id })}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
                      >
                        Open Case
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 rounded-2xl glass-panel">
              You haven't saved any cases yet. Click the bookmark icon on any case to save it here.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bookmarked Judgments */}
      {activeTab === 'judgments' && (
        <div className="space-y-4">
          {savedJudgments.length > 0 ? (
            <div className="space-y-3">
              {savedJudgments.map((j) => (
                <div key={j.judgment_id} className="p-5 rounded-2xl glass-panel space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <TagBadge variant="court">{j.court}</TagBadge>
                        <span className="text-xs font-mono font-bold text-indigo-400">{j.citation}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-100">{j.case_name}</h3>
                    </div>
                    <VerificationBadge status={j.source.verification_status} />
                  </div>

                  <p className="text-xs text-slate-300 font-serif line-clamp-2">
                    "{j.court_reasoning}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => toggleSaveJudgment(j.judgment_id)}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Bookmark</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJudgmentId(j.judgment_id);
                        navigateTo('judgments');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1"
                    >
                      <span>Read Judgment Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 rounded-2xl glass-panel">
              No landmark judgments bookmarked yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
