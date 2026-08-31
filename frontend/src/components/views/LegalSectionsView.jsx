import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Search, 
  FileText, 
  ArrowRight, 
  Layers, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TagBadge, SimilarityBadge } from '../common/Badge';

export const LegalSectionsView = () => {
  const { allSections, allCases, selectedSectionId, setSelectedSectionId, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const activeSection = allSections.find(s => s.section_id === selectedSectionId) || allSections[0];

  // Cases that use this legal section
  const relatedCases = allCases.filter(c => 
    c.sections.some(s => s.section_number === activeSection.section_number || s.act_name.includes(activeSection.act_name))
  );

  const filteredSections = allSections.filter(s => 
    s.act_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.section_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.section_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Statutory Sections Catalog</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Legal Acts & Sections Directory
            </h1>
            <p className="text-xs text-slate-400">
              Explore primary legislation provisions and discover every case indexed under specific sections.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Acts & Sections..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950/90 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Grid: Sections Selector & Related Cases Matrix (Section 11 Spec) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Section Selector List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Section</h2>
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredSections.map((sec) => {
              const isSelected = sec.section_id === activeSection.section_id;
              return (
                <div
                  key={sec.section_id}
                  onClick={() => setSelectedSectionId(sec.section_id)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                    isSelected 
                      ? 'bg-indigo-950/90 border-indigo-500/50 shadow-lg shadow-indigo-950/40 text-white' 
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-indigo-300">{sec.act_name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 font-mono">
                      {sec.related_cases_count} cases
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{sec.section_number}: {sec.section_title}</h4>
                  <div className="text-[10px] text-slate-400 mt-1">{sec.category}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Active Section Details & Related Cases List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Summary Card */}
          <div className="p-6 rounded-2xl glass-panel space-y-3 border-indigo-500/30">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-indigo-400">{activeSection.act_name}</span>
              <TagBadge variant="purple">{activeSection.section_number}</TagBadge>
            </div>
            <h2 className="text-lg font-bold text-primary">{activeSection.section_title}</h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-serif p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              "{activeSection.description}"
            </p>
          </div>

          {/* Related Cases under this Section (Section 11 Spec) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Cases Invoking {activeSection.section_number} ({relatedCases.length})</span>
              </h3>
            </div>

            {relatedCases.length > 0 ? (
              <div className="space-y-3">
                {relatedCases.map((c) => (
                  <div 
                    key={c.case_id}
                    className="p-4 rounded-xl glass-panel-interactive space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <TagBadge variant="court">{c.jurisdiction}</TagBadge>
                          <span className="text-xs text-slate-400 font-mono">{c.case_number}</span>
                        </div>
                        <h4 
                          onClick={() => navigateTo('case-details', { caseId: c.case_id })}
                          className="text-sm font-semibold text-slate-100 hover:text-indigo-400 cursor-pointer transition-colors"
                        >
                          {c.case_title}
                        </h4>
                      </div>

                      <SimilarityBadge score={c.similarity_top_score} />
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">
                      {c.short_description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <span className="text-slate-400">{c.date}</span>
                      <button
                        onClick={() => navigateTo('case-details', { caseId: c.case_id })}
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                      >
                        <span>Open Case File</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 rounded-xl glass-panel">
                No active demo cases currently linked to this section.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
