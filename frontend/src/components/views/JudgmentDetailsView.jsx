import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Gavel, 
  Scale, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  Users, 
  BookOpen, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { VerificationBadge, TagBadge } from '../common/Badge';

export const JudgmentDetailsView = () => {
  const { 
    activeJudgment, 
    allJudgments, 
    setSelectedJudgmentId, 
    navigateTo, 
    savedJudgmentIds, 
    toggleSaveJudgment,
    showToast 
  } = useApp();

  const isSaved = savedJudgmentIds.includes(activeJudgment.judgment_id);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Precedent Selector & Header */}
      <div className="p-6 md:p-8 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <TagBadge variant="court">{activeJudgment.court}</TagBadge>
              <span className="text-xs font-mono text-indigo-400 font-bold">{activeJudgment.citation}</span>
              <VerificationBadge status={activeJudgment.source.verification_status} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {activeJudgment.case_name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Date: {activeJudgment.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Bench: {activeJudgment.bench}</span>
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveJudgment(activeJudgment.judgment_id)}
              className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isSaved 
                  ? 'bg-amber-950/70 border-amber-500/40 text-amber-300' 
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>{isSaved ? 'Bookmarked' : 'Bookmark Precedent'}</span>
            </button>

            <a
              href={activeJudgment.source.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Original Judgment Source</span>
            </a>
          </div>
        </div>

        {/* Quick Switcher across judgments */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800 text-xs overflow-x-auto">
          <span className="text-slate-400 font-semibold shrink-0">Switch Judgment:</span>
          {allJudgments.map(j => (
            <button
              key={j.judgment_id}
              onClick={() => setSelectedJudgmentId(j.judgment_id)}
              className={`px-3 py-1 rounded-lg shrink-0 transition-colors ${
                j.judgment_id === activeJudgment.judgment_id
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {j.case_name.slice(0, 22)}...
            </button>
          ))}
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Judgment Outcome & Court Reasoning (Sections 15 & 16 Spec) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Judgment Outcome Card */}
          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Gavel className="w-4 h-4 text-cyan-400" />
              <span>Final Judgment Outcome</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-sm font-semibold text-cyan-200 leading-relaxed">
              {activeJudgment.outcome}
            </div>
          </div>

          {/* Section 16: Detailed Court Reasoning */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Court Reasoning & Ratio Decidendi</span>
            </h3>
            
            <div className="space-y-4 text-xs md:text-sm text-slate-200 leading-relaxed font-serif">
              <p className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                {activeJudgment.court_reasoning}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Important Findings of Law (Held)
              </h4>
              <div className="space-y-2">
                {activeJudgment.important_findings.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Statutory Provisions & Official Source Box (Section 21 Spec) */}
        <div className="space-y-6">
          {/* Statutory Sections Applied */}
          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Sections Interpreted</span>
            </h3>
            <div className="space-y-2">
              {activeJudgment.sections_applied.map((sec, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-indigo-300 font-medium">
                  {sec}
                </div>
              ))}
            </div>
          </div>

          {/* Official Source & Verification Panel (Section 21 Spec) */}
          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Judgment Source & Verification</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="text-slate-400">Source Repository:</div>
                <div className="font-semibold text-slate-200">{activeJudgment.source.source_name}</div>
                
                <div className="text-slate-400 pt-1">Source Classification:</div>
                <div className="text-indigo-300">{activeJudgment.source.source_type}</div>

                <div className="text-slate-400 pt-1">Verification Status:</div>
                <div><VerificationBadge status={activeJudgment.source.verification_status} /></div>

                <div className="text-slate-400 pt-1">Verified By & Date:</div>
                <div className="text-slate-300">{activeJudgment.source.verified_by} • {activeJudgment.source.verified_date}</div>

                <div className="text-slate-400 pt-1">Archival Notes:</div>
                <div className="text-slate-400 text-[11px] italic">{activeJudgment.source.notes}</div>
              </div>

              <a
                href={activeJudgment.source.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span>Open External Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
