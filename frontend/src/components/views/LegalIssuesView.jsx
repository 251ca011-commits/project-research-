import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  Scale, 
  ArrowRight, 
  Gavel, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { TagBadge } from '../common/Badge';

export const LegalIssuesView = () => {
  const { allIssues, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = allIssues.filter(i => 
    i.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.case_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.act_and_section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Substantive Issues Catalog</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Legal Issues & Questions of Law
            </h1>
            <p className="text-xs text-slate-400">
              Browse crystallized questions of law across indexed cases and their judicial resolutions.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search legal questions..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950/90 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Issues Grid (Section 10 Spec) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIssues.map((issue) => (
          <div 
            key={issue.issue_id}
            className="p-5 rounded-2xl glass-panel-interactive space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  Issue ID #{issue.issue_id}
                </span>
                <TagBadge variant="purple">{issue.act_and_section}</TagBadge>
              </div>

              <h3 className="text-sm md:text-base font-semibold text-slate-100 leading-snug">
                "{issue.question}"
              </h3>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Originating Case: <strong className="text-slate-200">{issue.case_title}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Gavel className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Leading Precedent: <strong className="text-cyan-300">{issue.leading_precedent}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Doctrinal Status: <strong className="text-emerald-300">{issue.status}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">{issue.jurisdiction}</span>
              <button
                onClick={() => navigateTo('case-details', { caseId: issue.case_id })}
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <span>View Full Case File</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
