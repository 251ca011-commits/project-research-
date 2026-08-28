import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MOCK_CASES, 
  MOCK_JUDGMENTS, 
  MOCK_SIMILARITIES, 
  MOCK_PREDICTIONS, 
  MOCK_LEGAL_SECTIONS, 
  MOCK_LEGAL_ISSUES, 
  MOCK_RECENT_SEARCHES 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation (Default to Landing / Welcome Page)
  const [currentView, setCurrentView] = useState('welcome');
  
  // Selected Entities
  const [selectedCaseId, setSelectedCaseId] = useState(101);
  const [selectedJudgmentId, setSelectedJudgmentId] = useState(501);
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  
  // Comparison Basket
  const [comparisonCaseIds, setComparisonCaseIds] = useState([101, 102]);
  
  // Saved / Bookmarks
  const [savedCaseIds, setSavedCaseIds] = useState([101]);
  const [savedJudgmentIds, setSavedJudgmentIds] = useState([501, 504]);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    court: 'All Courts',
    caseType: 'All Types',
    location: 'All Locations',
    section: 'All Sections',
    outcome: 'All Outcomes'
  });
  const [sortOption, setSortOption] = useState('relevance');
  const [recentSearches, setRecentSearches] = useState(MOCK_RECENT_SEARCHES);
  
  // Auth State (Mock)
  const [user, setUser] = useState({
    name: 'Adv. Rajeshwari Iyer',
    role: 'Senior Legal Researcher',
    email: 'r.iyer@chambers-legal.in',
    organization: 'Supreme Court & Madras High Court Bar Association',
    isLoggedIn: false
  });
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper getters
  const activeCase = MOCK_CASES.find(c => c.case_id === selectedCaseId) || MOCK_CASES[0];
  const activeJudgment = MOCK_JUDGMENTS.find(j => j.judgment_id === selectedJudgmentId) || MOCK_JUDGMENTS[0];
  const activeSimilarities = MOCK_SIMILARITIES[selectedCaseId] || MOCK_SIMILARITIES[101] || [];
  const activePrediction = MOCK_PREDICTIONS[selectedCaseId] || MOCK_PREDICTIONS[101];

  // Actions
  const navigateTo = (view, extraParams = {}) => {
    if (extraParams.caseId) setSelectedCaseId(extraParams.caseId);
    if (extraParams.judgmentId) setSelectedJudgmentId(extraParams.judgmentId);
    if (extraParams.sectionId) setSelectedSectionId(extraParams.sectionId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveCase = (caseId) => {
    if (savedCaseIds.includes(caseId)) {
      setSavedCaseIds(savedCaseIds.filter(id => id !== caseId));
      showToast('Case removed from Saved Collection', 'warning');
    } else {
      setSavedCaseIds([...savedCaseIds, caseId]);
      showToast('Case saved to Research Briefs', 'success');
    }
  };

  const toggleSaveJudgment = (judgmentId) => {
    if (savedJudgmentIds.includes(judgmentId)) {
      setSavedJudgmentIds(savedJudgmentIds.filter(id => id !== judgmentId));
      showToast('Judgment removed from Bookmarks', 'warning');
    } else {
      setSavedJudgmentIds([...savedJudgmentIds, judgmentId]);
      showToast('Judgment saved to Precedent Binder', 'success');
    }
  };

  const toggleComparisonCase = (caseId) => {
    if (comparisonCaseIds.includes(caseId)) {
      if (comparisonCaseIds.length <= 1) {
        showToast('Must keep at least one case in comparison', 'error');
        return;
      }
      setComparisonCaseIds(comparisonCaseIds.filter(id => id !== caseId));
      showToast('Case removed from Comparison', 'info');
    } else {
      if (comparisonCaseIds.length >= 3) {
        showToast('Maximum 3 cases can be compared side-by-side', 'warning');
        return;
      }
      setComparisonCaseIds([...comparisonCaseIds, caseId]);
      showToast('Case added to Comparison Matrix', 'success');
    }
  };

  const executeSearch = (query) => {
    if (!query) return;
    setSearchQuery(query);
    const newSearchEntry = { query, date: 'Just now', results_count: 8 };
    setRecentSearches([newSearchEntry, ...recentSearches.slice(0, 5)]);
    navigateTo('search-results');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        selectedCaseId,
        setSelectedCaseId,
        selectedJudgmentId,
        setSelectedJudgmentId,
        selectedSectionId,
        setSelectedSectionId,
        comparisonCaseIds,
        setComparisonCaseIds,
        toggleComparisonCase,
        savedCaseIds,
        savedJudgmentIds,
        toggleSaveCase,
        toggleSaveJudgment,
        searchQuery,
        setSearchQuery,
        activeFilters,
        setActiveFilters,
        sortOption,
        setSortOption,
        recentSearches,
        executeSearch,
        user,
        setUser,
        toastMessage,
        showToast,
        // Computed entities
        activeCase,
        activeJudgment,
        activeSimilarities,
        activePrediction,
        allCases: MOCK_CASES,
        allJudgments: MOCK_JUDGMENTS,
        allSections: MOCK_LEGAL_SECTIONS,
        allIssues: MOCK_LEGAL_ISSUES
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
