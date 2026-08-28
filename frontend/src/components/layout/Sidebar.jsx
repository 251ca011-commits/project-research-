import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Search,
  FileText,
  Sparkles,
  GitCompare,
  Gavel,
  HelpCircle,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Bookmark,
  Settings,
  LogIn,
  LogOut,
  Scale,
  ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    currentView, 
    navigateTo, 
    savedCaseIds, 
    savedJudgmentIds, 
    activeCase, 
    user, 
    setUser,
    showToast 
  } = useApp();

  const navGroups = [
    {
      title: "Core Workflow",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'search', label: 'Search Cases', icon: Search },
        { id: 'case-details', label: 'Case Details', icon: FileText, badge: activeCase ? `#${activeCase.case_id}` : null },
      ]
    },
    {
      title: "Case Intelligence",
      items: [
        { id: 'similar', label: 'Similar Cases', icon: Sparkles, highlight: true },
        { id: 'compare', label: 'Case Comparison', icon: GitCompare },
        { id: 'prediction', label: 'Outcome Prediction', icon: TrendingUp, tag: 'AI' },
      ]
    },
    {
      title: "Legal Knowledge",
      items: [
        { id: 'judgments', label: 'Judgment Details', icon: Gavel },
        { id: 'legal-issues', label: 'Legal Issues', icon: HelpCircle },
        { id: 'legal-sections', label: 'Legal Sections', icon: BookOpen },
        { id: 'verification', label: 'Source Verification', icon: ShieldCheck },
      ]
    },
    {
      title: "Workspace",
      items: [
        { 
          id: 'saved', 
          label: 'Saved Research', 
          icon: Bookmark, 
          count: savedCaseIds.length + savedJudgmentIds.length 
        },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'login', label: 'Login / Portal', icon: LogIn },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <Scale className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wider text-primary uppercase">
              RESEARCH
            </h1>
            <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">Legal Precedent Engine</p>
          </div>
        </div>
      </div>

      {/* Current Active Case Context Indicator */}
      {activeCase && (
        <div className="mx-3 my-2 px-3 py-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs">
          <div className="flex items-center justify-between text-indigo-300 font-semibold mb-1">
            <span>ACTIVE CASE CONTEXT</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 rounded">ID #{activeCase.case_id}</span>
          </div>
          <p className="text-slate-300 font-medium truncate" title={activeCase.case_title}>
            {activeCase.case_title}
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>{activeCase.jurisdiction}</span>
            <button 
              onClick={() => navigateTo('case-details')} 
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              Open <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              {group.title}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-300 group-hover:text-indigo-400'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.tag && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isActive ? 'bg-white/20 text-white' : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {item.tag}
                      </span>
                    )}
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-indigo-700' : 'bg-indigo-950 text-indigo-300 border border-indigo-600/30'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Session Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        {user.isLoggedIn ? (
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-200 truncate">{user.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user.role}</div>
              </div>
            </div>
            <button 
              onClick={() => {
                setUser({ ...user, isLoggedIn: false });
                navigateTo('login');
                showToast('Signed out successfully', 'info');
              }}
              title="Sign Out" 
              className="p-1.5 rounded-md hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigateTo('login')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <LogIn className="w-4 h-4" />
            Sign In to Research Portal
          </button>
        )}
      </div>
    </aside>
  );
};
