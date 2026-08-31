import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  Sparkles, 
  GitCompare, 
  FileText, 
  RotateCcw, 
  ArrowUpDown, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { TagBadge, SimilarityBadge } from '../common/Badge';

export const SearchCasesView = () => {
  const { 
    allCases, 
    navigateTo, 
    toggleComparisonCase, 
    comparisonCaseIds, 
    savedCaseIds, 
    toggleSaveCase,
    searchQuery,
    setSearchQuery 
  } = useApp();

  const [caseName, setCaseName] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [keywords, setKeywords] = useState(searchQuery || '');
  const [legalIssue, setLegalIssue] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('All Courts');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCaseType, setSelectedCaseType] = useState('All Types');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [selectedOutcome, setSelectedOutcome] = useState('All Outcomes');
  const [sortOption, setSortOption] = useState('similarity');

  const courts = ['All Courts', 'Supreme Court of India', 'Madras High Court', 'Delhi High Court', 'Bombay High Court', 'Calcutta High Court'];
  const locations = ['All Locations', 'New Delhi', 'Chennai', 'Mumbai', 'Kolkata', 'Coimbatore'];
  const caseTypes = ['All Types', 'Civil - Succession & Partition', 'Commercial - Contract & Arbitration', 'Criminal - Negotiable Instruments', 'Constitutional'];
  const sections = ['All Sections', 'Section 6 - Hindu Succession Act', 'Section 34 - Arbitration Act', 'Section 138 - NI Act', 'Section 73 - Contract Act'];
  const outcomes = ['All Outcomes', 'Allowed', 'Dismissed', 'Partially Allowed', 'Pending'];

  const resetFilters = () => {
    setCaseName('');
    setCaseNumber('');
    setKeywords('');
    setLegalIssue('');
    setSelectedCourt('All Courts');
    setSelectedLocation('All Locations');
    setSelectedCaseType('All Types');
    setSelectedSection('All Sections');
    setSelectedOutcome('All Outcomes');
    setSortOption('similarity');
  };

  // Filtered cases logic
  const filteredCases = allCases.filter((c) => {
    if (caseName && !c.case_title.toLowerCase().includes(caseName.toLowerCase())) return false;
    if (caseNumber && !c.case_number.toLowerCase().includes(caseNumber.toLowerCase())) return false;
    if (keywords && !c.short_description.toLowerCase().includes(keywords.toLowerCase()) && !c.case_title.toLowerCase().includes(keywords.toLowerCase())) return false;
    if (selectedCourt !== 'All Courts' && !c.jurisdiction.includes(selectedCourt)) return false;
    if (selectedCaseType !== 'All Types' && c.case_type !== selectedCaseType) return false;
    return true;
  }).sort((a, b) => {
    if (sortOption === 'similarity') return b.similarity_top_score - a.similarity_top_score;
    if (sortOption === 'date') return new Date(b.date) - new Date(a.date);
    return 0; // relevance
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight flex items-center gap-2.5">
            <Search className="w-6 h-6 text-primary" />
            <span>Search Legal Cases & Precedents</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search case facts, court jurisdictions, legal sections, and similarity rankings.
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Search Input & Advanced Filters Panel (Section 6 Spec) */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">Case Name</label>
            <input
              type="text"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              placeholder="e.g. Sundaram, NexTech..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">Case Number</label>
            <input
              type="text"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              placeholder="e.g. CA/4892/2024..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">Keywords / Legal Terms</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. Coparcenary, Arbitral Award..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">Legal Issue</label>
            <input
              type="text"
              value={legalIssue}
              onChange={(e) => setLegalIssue(e.target.value)}
              placeholder="e.g. Daughter equal rights..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* 6 Filter Dropdowns */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Court</label>
            <select
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {courts.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Case Type</label>
            <select
              value={selectedCaseType}
              onChange={(e) => setSelectedCaseType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {caseTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Legal Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Outcome</label>
            <select
              value={selectedOutcome}
              onChange={(e) => setSelectedOutcome(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {outcomes.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header with Sorting (Section 7 Spec) */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs font-semibold text-slate-300">
          Showing <span className="text-indigo-400 font-bold">{filteredCases.length}</span> matching cases
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="similarity">Similarity % (Highest first)</option>
            <option value="date">Date (Most recent)</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </div>

      {/* Search Results List (Section 7 Spec) */}
      {filteredCases.length > 0 ? (
        <div className="space-y-4">
          {filteredCases.map((c) => {
            const isCompared = comparisonCaseIds.includes(c.case_id);
            const isSaved = savedCaseIds.includes(c.case_id);

            return (
              <div 
                key={c.case_id}
                className="p-5 rounded-2xl glass-panel-interactive space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <TagBadge variant="court">{c.jurisdiction}</TagBadge>
                      <TagBadge variant="primary">{c.case_type}</TagBadge>
                      <span className="text-xs text-slate-400 font-mono">{c.case_number}</span>
                      <span className="text-xs text-slate-500">• {c.date}</span>
                    </div>

                    <h3 
                      onClick={() => navigateTo('case-details', { caseId: c.case_id })}
                      className="text-base font-bold text-slate-100 hover:text-indigo-400 cursor-pointer transition-colors"
                    >
                      {c.case_title}
                    </h3>
                  </div>

                  <SimilarityBadge score={c.similarity_top_score} />
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {c.short_description}
                </p>

                {/* Legal Sections Pill List */}
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-slate-400 font-semibold">Legal Sections:</span>
                  {c.sections.map((sec) => (
                    <span 
                      key={sec.section_id}
                      onClick={() => navigateTo('legal-sections', { sectionId: sec.section_id })}
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-800 cursor-pointer text-xs"
                    >
                      {sec.act_name} — {sec.section_number}
                    </span>
                  ))}
                </div>

                {/* Action Buttons (Section 7 Spec: View Case, Find Similar Cases, Compare) */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleSaveCase(c.case_id)}
                      className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                        isSaved ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => toggleComparisonCase(c.case_id)}
                      className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        isCompared 
                          ? 'bg-purple-950/80 border-purple-500/50 text-purple-300' 
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                      }`}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('similar', { caseId: c.case_id })}
                      className="px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Find Similar Cases</span>
                    </button>

                    <button
                      onClick={() => navigateTo('case-details', { caseId: c.case_id })}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow"
                    >
                      View Case
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State (Section 28 Spec) */
        <div className="p-12 rounded-2xl glass-panel text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No matching legal cases found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms, changing the court filters, or removing specific section filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold mt-2"
          >
            Clear All Search Criteria
          </button>
        </div>
      )}
    </div>
  );
};
