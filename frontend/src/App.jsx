import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { getHealth } from './services/api';

// 15 Core Views
import { WelcomeView } from './components/views/WelcomeView';
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { SearchCasesView } from './components/views/SearchCasesView';
import { CaseDetailsView } from './components/views/CaseDetailsView';
import { SimilarCasesView } from './components/views/SimilarCasesView';
import { CaseComparisonView } from './components/views/CaseComparisonView';
import { JudgmentDetailsView } from './components/views/JudgmentDetailsView';
import { LegalIssuesView } from './components/views/LegalIssuesView';
import { LegalSectionsView } from './components/views/LegalSectionsView';
import { PredictionView } from './components/views/PredictionView';
import { VerificationView } from './components/views/VerificationView';
import { SavedCasesView } from './components/views/SavedCasesView';
import { SettingsView } from './components/views/SettingsView';

const MainViewRouter = () => {
  const { currentView } = useApp();

  switch (currentView) {
    case 'welcome':
      return <WelcomeView />;
    case 'login':
      return <LoginView />;

    case 'dashboard':
      return <DashboardView />;

    case 'search':
    case 'search-results':
      return <SearchCasesView />;

    case 'case-details':
      return <CaseDetailsView />;

    case 'similar':
      return <SimilarCasesView />;

    case 'compare':
      return <CaseComparisonView />;

    case 'judgments':
      return <JudgmentDetailsView />;

    case 'legal-issues':
      return <LegalIssuesView />;

    case 'legal-sections':
      return <LegalSectionsView />;

    case 'prediction':
      return <PredictionView />;

    case 'verification':
      return <VerificationView />;

    case 'saved':
      return <SavedCasesView />;

    case 'settings':
      return <SettingsView />;

    default:
      return <DashboardView />;
  }
};

function App() {
  useEffect(() => {
    getHealth()
      .then((data) => {
        console.log('Backend connected:', data);
      })
      .catch((error) => {
        console.error('Backend connection failed:', error);
      });
  }, []);

  return (
    <AppProvider>
      <Layout>
        <MainViewRouter />
      </Layout>
    </AppProvider>
  );
}

export default App;