import React from 'react';
import { ShieldCheck, ShieldAlert, Clock, Sparkles } from 'lucide-react';

export const VerificationBadge = ({ status }) => {
  if (status === 'Verified') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        Verified Source
      </span>
    );
  }
  if (status === 'Pending Verification') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30">
        <Clock className="w-3.5 h-3.5 text-amber-400" />
        Pending Verification
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/30">
      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
      Not Verified
    </span>
  );
};

export const SimilarityBadge = ({ score }) => {
  let colorClasses = "bg-indigo-950 text-indigo-300 border-indigo-500/30";
  if (score >= 90) colorClasses = "bg-emerald-950/90 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-900/50";
  else if (score >= 80) colorClasses = "bg-cyan-950/90 text-cyan-300 border-cyan-500/40";
  else if (score >= 70) colorClasses = "bg-amber-950/90 text-amber-300 border-amber-500/40";

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${colorClasses}`}>
      <Sparkles className="w-3.5 h-3.5" />
      {score}% Similarity
    </span>
  );
};

export const TagBadge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-800/80 text-slate-300 border-slate-700/50',
    primary: 'bg-blue-950/70 text-blue-300 border-blue-600/30',
    purple: 'bg-purple-950/70 text-purple-300 border-purple-600/30',
    court: 'bg-slate-900 text-slate-200 border-slate-700/70'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};
