import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  GitCompare, 
  Gavel, 
  ExternalLink, 
  Bookmark, 
  Calendar, 
  Users, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck,
  Scale,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { TagBadge, SimilarityBadge } from '../common/Badge';

export const CaseDetailsView = () => {
  const { 
    activeCase, 
    navigateTo, 
    toggleSaveCase, 
    savedCaseIds, 
    toggleComparisonCase, 
    comparisonCaseIds,
    setSelectedJudgmentId 
  } = useApp();

  const [activeTab, setActiveTab] = useState('facts');

  if (!activeCase) {
    return (
      <div className="p-12 text-center text-slate-400">
        No case selected. Please select a case from the Search or Dashboard.
      </div>
    );
  }

  const isSaved = savedCaseIds.includes(activeCase.case_id);
  const isCompared = comparisonCaseIds.includes(activeCase.case_id);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Case Header Card (Section 8 Spec) */}
      <div className="p-6 md:p-8 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <TagBadge variant="court">{activeCase.jurisdiction}</TagBadge>
              <TagBadge variant="primary">{activeCase.case_type}</TagBadge>
              <span className="text-xs font-mono text-indigo-400">Case ID #{activeCase.case_id}</span>
              <span className="text-xs text-slate-400">• {activeCase.case_number}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {activeCase.case_title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Date: {activeCase.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Bench: {activeCase.bench || 'Division Bench'}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons Toolbar (Section 8 Spec) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => toggleSaveCase(activeCase.case_id)}
              className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isSaved 
                  ? 'bg-amber-950/70 border-amber-500/40 text-amber-300' 
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>{isSaved ? 'Saved in Binder' : 'Save Case'}</span>
            </button>

            <button
              onClick={() => toggleComparisonCase(activeCase.case_id)}
              className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isCompared 
                  ? 'bg-purple-950/70 border-purple-500/40 text-purple-300' 
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>{isCompared ? 'In Comparison' : 'Compare'}</span>
            </button>

            <button
              onClick={() => navigateTo('similar', { caseId: activeCase.case_id })}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Find Similar Cases</span>
            </button>

            <button
              onClick={() => navigateTo('prediction', { caseId: activeCase.case_id })}
              className="px-3.5 py-2 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span>AI Prediction</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-800 overflow-x-auto">
          {[
            { id: 'facts', label: '1. Case Facts & Parties', icon: FileText },
            { id: 'issues', label: '2. Legal Issues', icon: HelpCircle, count: activeCase.legal_issues.length },
            { id: 'sections', label: '3. Legal Sections', icon: BookOpen, count: activeCase.sections.length },
            { id: 'reasoning', label: '4. Judicial Reasoning & Precedents', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Case Facts (Section 9 Spec: Background, What happened, Parties, Important Events, Key Circumstances) */}
      {activeTab === 'facts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Facts, Narrative & Key circumstances */}
            <div className="lg:col-span-2 space-y-6">
              {/* Background & Narrative */}
              <div className="p-5 rounded-2xl glass-panel space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Case Background & What Happened</span>
                </h3>
                <div className="space-y-3 text-xs md:text-sm text-slate-200 leading-relaxed">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-indigo-300 block mb-1 text-xs">Background:</strong>
                    {activeCase.case_facts.background}
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-indigo-300 block mb-1 text-xs">What Happened:</strong>
                    {activeCase.case_facts.what_happened}
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-amber-300 block mb-1 text-xs">Key Circumstances & Contention:</strong>
                    {activeCase.case_facts.key_circumstances}
                  </div>
                </div>
              </div>

              {/* Key Facts Bullet Summary */}
              <div className="p-5 rounded-2xl glass-panel space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Key Material Facts
                </h3>
                <ul className="space-y-2">
                  {activeCase.case_facts.key_facts.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col: Parties Involved & Timeline */}
            <div className="space-y-6">
              {/* Parties */}
              <div className="p-5 rounded-2xl glass-panel space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Parties Involved</span>
                </h3>
                <div className="space-y-2.5">
                  {activeCase.case_facts.parties.map((p, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">{p.role}</span>
                      <div className="text-xs font-semibold text-slate-100">{p.name}</div>
                      {p.representation && (
                        <div className="text-[11px] text-slate-400">{p.representation}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chronological Events */}
              <div className="p-5 rounded-2xl glass-panel space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Important Events Timeline</span>
                </h3>
                <div className="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {activeCase.case_facts.important_events.map((ev, idx) => (
                    <div key={idx} className="relative space-y-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 absolute -left-4 top-1" />
                      <div className="text-[10px] font-mono text-indigo-300">{ev.date}</div>
                      <div className="text-xs text-slate-300">{ev.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Legal Issues (Section 10 Spec) */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
            <strong>Substantive Questions of Law:</strong> The primary legal issues identified in this case which require judicial determination against existing precedents.
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeCase.legal_issues.map((issue) => (
              <div key={issue.issue_id} className="p-5 rounded-2xl glass-panel space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      Legal Issue #{issue.issue_id}
                    </span>
                    <h3 className="text-sm md:text-base font-semibold text-slate-100 leading-snug">
                      "{issue.issue_text}"
                    </h3>
                  </div>
                  <TagBadge variant="primary">{issue.related_section}</TagBadge>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">{issue.precedent_count} relevant judgments mapped to this question</span>
                  <button 
                    onClick={() => navigateTo('similar', { caseId: activeCase.case_id })}
                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                  >
                    <span>View Matching Precedents</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Legal Sections (Section 11 Spec) */}
      {activeTab === 'sections' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCase.sections.map((sec) => (
              <div key={sec.section_id} className="p-5 rounded-2xl glass-panel space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">{sec.act_name}</span>
                  <TagBadge variant="purple">{sec.section_number}</TagBadge>
                </div>
                <h3 className="text-sm font-semibold text-slate-100">{sec.section_title}</h3>
                <p className="text-xs text-slate-400">
                  Statutory provision governing coparcenary, partition, and rights by birth.
                </p>
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => navigateTo('legal-sections', { sectionId: sec.section_id })}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Explore Section Precedents</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Reasoning & Precedents */}
      {activeTab === 'reasoning' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Doctrinal Reasoning & Precedent Matrix</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on the 3-Judge Bench ratio in <em>Vineeta Sharma (2020)</em>, the living status of the father on September 9, 2005 is no longer required for daughters to exercise unobstructed coparcenary rights. 
              The unregistered 2004 family arrangement executed by the brothers does not qualify as a recognized exception under Section 6(5).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedJudgmentId(501);
                  navigateTo('judgments');
                }}
                className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>Read Full Judgment: Vineeta Sharma (2020)</span>
              </button>
              <button
                onClick={() => navigateTo('verification')}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verify Official Sources</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
