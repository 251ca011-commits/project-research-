import React from 'react';
import { AlertTriangle, Info, Scale } from 'lucide-react';

export const LegalDisclaimer = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-200/90 text-xs">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>AI Safety notice:</strong> AI predictions & similarity calculations are analytical estimates. They do not constitute formal legal advice or binding judicial rulings.
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-amber-950/20 border border-amber-500/30 shadow-lg shadow-black/20">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
          <Scale className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-amber-200 flex items-center gap-1.5">
            <span>Mandatory Legal & AI Verification Protocol</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            This application is an AI-assisted research and precedent discovery tool designed for legal practitioners. 
            All similarity rankings, summaries, and predicted outcomes are generated using computational legal algorithms. 
            <strong> They do not replace statutory judicial pronouncements or counsel discretion.</strong> Always verify citations via the official source link before relying on precedents in pleadings.
          </p>
        </div>
      </div>
    </div>
  );
};
