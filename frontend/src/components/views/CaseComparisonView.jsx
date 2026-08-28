import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitCompare, 
  Plus, 
  Trash2, 
  FileText, 
  Scale, 
  CheckCircle, 
  AlertCircle, 
  Gavel, 
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TagBadge, SimilarityBadge } from '../common/Badge';

export const CaseComparisonView = () => {
  const { 
    allCases, 
    allJudgments, 
    comparisonCaseIds, 
    setComparisonCaseIds, 
    toggleComparisonCase,
    navigateTo 
  } = useApp();

  const [selectedCaseToAdd, setSelectedCaseToAdd] = useState('');

  // Find all items selected for comparison
  const casesToCompare = allCases.filter(c => comparisonCaseIds.includes(c.case_id));
  
  // Available cases to add
  const availableToAdd = allCases.filter(c => !comparisonCaseIds.includes(c.case_id));

  const handleAddCase = () => {
    if (selectedCaseToAdd) {
      toggleComparisonCase(Number(selectedCaseToAdd));
      setSelectedCaseToAdd('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <GitCompare className="w-3.5 h-3.5" />
              <span>Comparative Legal Matrix</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Side-by-Side Case & Precedent Comparison
            </h1>
            <p className="text-xs text-slate-400">
              Evaluate differences in material facts, statutory interpretation, judicial reasoning, and final outcomes.
            </p>
          </div>

          {/* Add to Comparison Selector */}
          {availableToAdd.length > 0 && (
            <div className="flex items-center gap-2">
              <select
                value={selectedCaseToAdd}
                onChange={(e) => setSelectedCaseToAdd(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="">-- Add another case to matrix --</option>
                {availableToAdd.map(c => (
                  <option key={c.case_id} value={c.case_id}>
                    Case #{c.case_id}: {c.case_title.slice(0, 30)}...
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddCase}
                disabled={!selectedCaseToAdd}
                className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>

        {/* Selected Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800 text-xs text-slate-300">
          <span className="font-semibold text-purple-300">Comparing {casesToCompare.length} Cases:</span>
          {casesToCompare.map(c => (
            <span 
              key={c.case_id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-purple-500/30 text-purple-200 text-xs font-medium"
            >
              <span>{c.case_title.slice(0, 24)}...</span>
              <button
                onClick={() => toggleComparisonCase(c.case_id)}
                className="text-slate-400 hover:text-rose-400 ml-1"
                title="Remove from comparison"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Comparison Grid (Section 14 Spec) */}
      {casesToCompare.length > 0 ? (
        <div className="space-y-6">
          {/* Side-by-Side Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="p-4 w-44 font-bold text-slate-400 uppercase tracking-wider text-[11px] border-r border-slate-800">
                    Comparison Dimension
                  </th>
                  {casesToCompare.map(c => (
                    <th key={c.case_id} className="p-4 min-w-[280px] font-bold text-slate-200 border-r border-slate-800 last:border-r-0">
                      <div className="space-y-1">
                        <TagBadge variant="court">{c.jurisdiction}</TagBadge>
                        <h4 className="text-sm font-bold text-white line-clamp-2">{c.case_title}</h4>
                        <div className="text-[10px] text-slate-400 font-mono">Case #{c.case_id} • {c.case_number}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {/* 1. Date & Jurisdiction */}
                <tr className="hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-indigo-300 bg-slate-950/40 border-r border-slate-800">
                    Court & Date
                  </td>
                  {casesToCompare.map(c => (
                    <td key={c.case_id} className="p-4 text-slate-300 border-r border-slate-800 last:border-r-0">
                      <div><strong>Court:</strong> {c.jurisdiction}</div>
                      <div className="mt-0.5 text-slate-400"><strong>Date:</strong> {c.date}</div>
                    </td>
                  ))}
                </tr>

                {/* 2. Facts Summary */}
                <tr className="hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-indigo-300 bg-slate-950/40 border-r border-slate-800">
                    Core Facts & Background
                  </td>
                  {casesToCompare.map(c => (
                    <td key={c.case_id} className="p-4 text-slate-300 leading-relaxed border-r border-slate-800 last:border-r-0 space-y-1.5">
                      <p>{c.case_facts.background}</p>
                      <div className="p-2 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400">
                        <strong className="text-slate-300">Contention:</strong> {c.case_facts.key_circumstances}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 3. Legal Issues */}
                <tr className="hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-indigo-300 bg-slate-950/40 border-r border-slate-800">
                    Legal Issues Involved
                  </td>
                  {casesToCompare.map(c => (
                    <td key={c.case_id} className="p-4 text-slate-300 border-r border-slate-800 last:border-r-0">
                      <ul className="space-y-1.5 list-disc list-inside">
                        {c.legal_issues.map(iss => (
                          <li key={iss.issue_id} className="leading-snug">
                            {iss.issue_text}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 4. Legal Sections Applied */}
                <tr className="hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-indigo-300 bg-slate-950/40 border-r border-slate-800">
                    Statutory Sections
                  </td>
                  {casesToCompare.map(c => (
                    <td key={c.case_id} className="p-4 text-slate-300 border-r border-slate-800 last:border-r-0">
                      <div className="flex flex-wrap gap-1.5">
                        {c.sections.map(sec => (
                          <span key={sec.section_id} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-300 text-[11px]">
                            {sec.act_name} — {sec.section_number}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 5. Judgment Outcome & Status */}
                <tr className="hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-indigo-300 bg-slate-950/40 border-r border-slate-800">
                    Judgment Outcome
                  </td>
                  {casesToCompare.map(c => (
                    <td key={c.case_id} className="p-4 text-slate-300 border-r border-slate-800 last:border-r-0">
                      <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 font-medium">
                        {c.status === 'Active Research' ? 'Under Active Judicial Review / Pending' : c.status}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Doctrinal Synthesis: Similarities vs Differences (Section 14 Spec) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Similarities Card */}
            <div className="p-5 rounded-2xl glass-panel space-y-3">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Shared Doctrinal Similarities</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Both matters invoke statutory exceptions requiring mandatory registered documentation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Substantive reliance placed on Supreme Court constitutional and division bench precedents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>High court appellate jurisdiction invoked under standard statutory appeal provisions.</span>
                </li>
              </ul>
            </div>

            {/* Differences Card */}
            <div className="p-5 rounded-2xl glass-panel space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Key Distinctions & Divergences</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Subject Matter:</strong> Case #101 pertains to personal law / coparcenary property, whereas Case #102 centers on commercial arbitration damages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Applicable Standard:</strong> Substantive birthright entitlement vs strict patent illegality review standard under Section 34.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Remedies:</strong> Partition preliminary decree vs setting aside an arbitral award.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 rounded-2xl glass-panel">
          No cases selected for comparison. Please select at least two cases to view the side-by-side comparative matrix.
        </div>
      )}
    </div>
  );
};
