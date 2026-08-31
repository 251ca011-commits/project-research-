import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Scale, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ArrowRight, 
  HelpCircle, 
  Gavel, 
  Sparkles,
  Info
} from 'lucide-react';
import { LegalDisclaimer } from '../common/Disclaimer';
import { TagBadge, SimilarityBadge } from '../common/Badge';

export const PredictionView = () => {
  const { 
    activeCase, 
    activePrediction, 
    navigateTo, 
    setSelectedJudgmentId 
  } = useApp();

  if (!activePrediction) {
    return (
      <div className="p-12 text-center text-slate-400 rounded-2xl glass-panel">
        No AI prediction model available for this case yet.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Mandatory Safety Alert (Section 20 Spec) */}
      <LegalDisclaimer />

      {/* Prediction Header & Score Card (Section 17 Spec) */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-purple-950/70 border border-indigo-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Analytical Precedent Forecaster</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Predicted Possible Outcome for Case #{activeCase.case_id}
            </h1>
            <p className="text-xs text-slate-300">
              Evaluated against 4 authoritative binding Supreme Court precedents and statutory provisions.
            </p>
          </div>

          {/* Confidence Dial / Metric */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 text-center min-w-[180px] shadow-lg">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Prediction Confidence</div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mt-0.5">
              {activePrediction.confidence_percentage}%
            </div>
            <div className="text-[10px] text-emerald-400 font-medium mt-0.5">High Statistical Convergence</div>
          </div>
        </div>

        {/* Possible Outcome Badge (Section 20 Rule: Always State "Possible Outcome") */}
        <div className="p-5 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Predicted Possible Outcome (Subject to Counsel Pleadings):</span>
          </div>
          <h2 className="text-base md:text-lg font-bold text-emerald-300">
            "{activePrediction.predicted_outcome}"
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-serif pt-1">
            {activePrediction.summary}
          </p>
        </div>
      </div>

      {/* Section 18: WHY THIS PREDICTION? (Detailed AI Reason Breakdown) */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>Why Was This Possible Outcome Predicted? (Reasoning Chain)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {activePrediction.why_this_prediction.map((reason, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 text-xs text-slate-200">
              <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 19: PREDICTION EVIDENCE TABLE */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Gavel className="w-4 h-4 text-cyan-400" />
            <span>Supporting Precedent Evidence Table</span>
          </h3>
          <span className="text-xs text-slate-400">Click any precedent to open judgment reasoning</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Previous Precedent Case</th>
                <th className="p-3.5">Court & Bench</th>
                <th className="p-3.5">Similarity Score</th>
                <th className="p-3.5">Historical Outcome</th>
                <th className="p-3.5">Doctrinal Applicability</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {activePrediction.evidence_table.map((ev, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3.5 font-bold text-slate-100">{ev.previous_case}</td>
                  <td className="p-3.5 text-slate-300">{ev.court}</td>
                  <td className="p-3.5 font-bold text-indigo-300">{ev.similarity}</td>
                  <td className="p-3.5 text-slate-300">{ev.outcome}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-[11px] text-slate-300">
                      {ev.applicability}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setSelectedJudgmentId(501);
                        navigateTo('judgments');
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <span>Read Judgment</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anticipated Risk Factors / Counter Arguments */}
      <div className="p-5 rounded-2xl glass-panel space-y-3 border-amber-500/20">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Anticipated Counter-Arguments & Appellate Risks</span>
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          {activePrediction.risk_factors.map((risk, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
