import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { LegalDisclaimer } from '../common/Disclaimer';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Layout = ({ children }) => {
  const { currentView, toastMessage } = useApp();

  // If on welcome or login view, render a clean focused layout without standard sidebar
  if (currentView === 'welcome' || currentView === 'login') {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <main className="flex-1 flex items-center justify-center p-6">
          {children}
        </main>
        <footer className="py-4 border-t border-border text-center text-xs text-muted-foreground">
          RESEARCH Legal Intelligence & Precedent Discovery Platform • Confidential Law Firm Portal
        </footer>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* Dynamic View Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        {/* Global Footer & Disclaimer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 px-8 py-6 mt-12">
          <div className="max-w-7xl mx-auto space-y-4">
            <LegalDisclaimer compact />
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-900">
              <p>© 2026 RESEARCH Precedent Discovery Engine. Built for authorized legal practitioners.</p>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="text-slate-400">Node.js Main REST Backend API Ready</span>
                <span>•</span>
                <span className="text-emerald-400 font-mono">Status: All Sources Verified</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-indigo-500/40 text-slate-100 shadow-2xl shadow-black/80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 text-indigo-400" />}
          <span className="text-xs font-medium">{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
};
