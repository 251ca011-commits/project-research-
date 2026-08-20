import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  Gavel,
  Calendar,
  UserCheck
} from 'lucide-react';
import { VerificationBadge, TagBadge } from '../common/Badge';

export const VerificationView = () => {
  const { allJudgments, navigateTo, setSelectedJudgmentId } = useApp();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJudgments = allJudgments.filter(j => {
    if (filterStatus !== 'All' && j.source.verification_status !== filterStatus) return false;
    if (searchTerm && !j.case_name.toLowerCase().includes(searchTerm.toLowerCase()) && !j.citation.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Judicial Verification Registry</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Precedent Source & Verification Registry
            </h1>
            <p className="text-xs text-slate-400">
              Audit the pedigree, official court repositories, and editorial verification stamps for all indexed citations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Verification Statuses</option>
              <option value="Verified">Verified Only</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Not Verified">Not Verified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verification Registry Table (Sections 21 & 22 Spec) */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredJudgments.map((j) => (
            <div 
              key={j.judgment_id}
              className="p-5 md:p-6 rounded-2xl glass-panel space-y-4 border border-slate-800"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <TagBadge variant="court">{j.court}</TagBadge>
                    <span className="text-xs font-mono font-bold text-indigo-400">{j.citation}</span>
                    <span className="text-xs text-slate-500">• {j.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{j.case_name}</h3>
                </div>

                <VerificationBadge status={j.source.verification_status} />
              </div>

              {/* Source Verification Details Grid (Section 22 Spec) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Official Repository</span>
                  <div className="font-semibold text-slate-200">{j.source.source_name}</div>
                  <div className="text-slate-400 text-[11px]">{j.source.source_type}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified By & Timestamp</span>
                  <div className="font-semibold text-slate-200 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{j.source.verified_by}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{j.source.verified_date}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Archival Audit Notes</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed italic">
                    "{j.source.notes}"
                  </p>
                </div>
              </div>

              {/* Action Buttons (Section 21 Spec: View Original Judgment button) */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setSelectedJudgmentId(j.judgment_id);
                    navigateTo('judgments');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View Internal Brief & Reasoning
                </button>

                <a
                  href={j.source.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Original Judgment</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
