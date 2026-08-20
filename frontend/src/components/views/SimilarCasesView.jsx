import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  GitCompare, 
  Gavel, 
  FileText, 
  ExternalLink, 
  HelpCircle, 
  BookOpen, 
  Scale, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { SimilarityBadge, TagBadge } from '../common/Badge';
import { LegalDisclaimer } from '../common/Disclaimer';

export const SimilarCasesView = () => {
  const { 
    activeCase, 
    activeSimilarities, 
    navigateTo, 
    toggleComparisonCase, 
    comparisonCaseIds,
    setSelectedJudgmentId 
  } = useApp();

  const [expandedReasons, setExpandedReasons] = useState({ 501: true, 502: true, 503: false, 504: true, 505: true });

  const toggleExpand = (id) => {
    setExpandedReasons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Precedent Similarity Engine</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Similar Cases & Precedents for ID #{activeCase.case_id}
            </h1>
            <p className="text-xs text-slate-400">
              Cross-court precedent discovery analyzing facts, statutory sections, and judicial reasoning.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('compare')}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
            >
              <GitCompare className="w-4 h-4 text-purple-400" />
              <span>Launch Comparison Matrix</span>
            </button>
            <button
              onClick={() => navigateTo('prediction')}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Scale className="w-4 h-4" />
              <span>Generate AI Prediction</span>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold text-indigo-300">Target Case: {activeCase.case_title}</span>
          <span className="text-slate-400">{activeSimilarities.length} authoritative precedents ranked</span>
        </div>
      </div>

      <LegalDisclaimer compact />

      {/* Similar Cases List (Sections 12 & 13 Spec) */}
      <div className="space-y-5">
        {activeSimilarities.map((match, idx) => {
          const isExpanded = expandedReasons[match.judgment_id] ?? true;
          const isCompared = comparisonCaseIds.includes(match.judgment_id);

          return (
            <div 
              key={match.judgment_id || idx}
              className="p-5 md:p-6 rounded-2xl glass-panel-interactive space-y-4 border border-slate-800 hover:border-indigo-500/40"
            >
              {/* Precedent Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                      Rank #{match.rank_position || idx + 1}
                    </span>
                    <TagBadge variant="court">{match.court}</TagBadge>
                    <span className="text-xs text-slate-400 font-mono">{match.citation}</span>
                    <span className="text-xs text-slate-500">• {match.date}</span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-slate-100">
                    {match.case_name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <SimilarityBadge score={match.similarity_score} />
                </div>
              </div>

              {/* Judgment Outcome Summary */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200">
                <Gavel className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-300">Ruling & Outcome: </strong>
                  <span>{match.outcome}</span>
                </div>
              </div>

              {/* Section 13: WHY ARE THESE CASES SIMILAR? (Mandatory Detailed Breakdown) */}
              <div className="space-y-3 pt-2">
                <div 
                  onClick={() => toggleExpand(match.judgment_id)}
                  className="flex items-center justify-between cursor-pointer p-2.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-950/70 border border-indigo-500/20 text-xs font-semibold text-indigo-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-400" />
                    <span>Why Are These Cases Similar? (Doctrinal & Fact Breakdown)</span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                {isExpanded && match.why_similar && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs animate-in fade-in">
                    <div className="space-y-1 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[11px] font-bold text-indigo-300 block flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        1. Similar Facts
                      </span>
                      <p className="text-slate-300 leading-relaxed">{match.why_similar.facts}</p>
                    </div>

                    <div className="space-y-1 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[11px] font-bold text-cyan-300 block flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        2. Same Legal Issue
                      </span>
                      <p className="text-slate-300 leading-relaxed">{match.why_similar.legal_issue}</p>
                    </div>

                    <div className="space-y-1 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[11px] font-bold text-purple-300 block flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        3. Same Legal Section
                      </span>
                      <p className="text-slate-300 leading-relaxed">{match.why_similar.legal_section}</p>
                    </div>

                    <div className="space-y-1 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[11px] font-bold text-emerald-300 block flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        4. Similar Arguments & Ratio
                      </span>
                      <p className="text-slate-300 leading-relaxed">{match.why_similar.arguments}</p>
                    </div>

                    <div className="md:col-span-2 space-y-1 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20">
                      <span className="text-[11px] font-bold text-indigo-200 block flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-indigo-400" />
                        5. Court Reasoning & Precedent Effect
                      </span>
                      <p className="text-slate-300 leading-relaxed">{match.why_similar.court_reasoning}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons (Section 12 Spec: View Case, Compare) */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => toggleComparisonCase(match.judgment_id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isCompared 
                      ? 'bg-purple-950/80 border-purple-500/50 text-purple-300' 
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'Added to Comparison' : 'Add to Comparison'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedJudgmentId(match.judgment_id);
                      navigateTo('judgments');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1"
                  >
                    <span>View Judgment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigateTo('verification')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow"
                  >
                    View Original Source
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
