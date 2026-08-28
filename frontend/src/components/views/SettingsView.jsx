import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Database, 
  Server, 
  ShieldCheck, 
  User, 
  Sliders, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const SettingsView = () => {
  const { user, setUser, showToast } = useApp();

  const [backendUrl, setBackendUrl] = useState('http://localhost:5000/api');
  const [similarityThreshold, setSimilarityThreshold] = useState(80);
  const [defaultJurisdiction, setDefaultJurisdiction] = useState('Supreme Court of India');
  const [citationFormat, setCitationFormat] = useState('SCC / INSC');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('Preferences updated successfully', 'success');
  };

  const handleResetData = () => {
    showToast('Reset mock legal dataset to default benchmark state', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Settings className="w-3.5 h-3.5" />
          <span>Application Settings</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
          System Preferences & Backend Configuration
        </h1>
        <p className="text-xs text-slate-400">
          Configure legal precedent matching parameters, citation standards, and API endpoints.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* User Profile Settings */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Practitioner & Chambers Profile</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Practitioner Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Professional Role / Designation</label>
              <input
                type="text"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-slate-300 font-medium">Bar Affiliation / Chamber Organization</label>
              <input
                type="text"
                value={user.organization}
                onChange={(e) => setUser({ ...user, organization: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Legal Research Engine Configuration */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Precedent Discovery Parameters</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Default Primary Jurisdiction</label>
              <select
                value={defaultJurisdiction}
                onChange={(e) => setDefaultJurisdiction(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Supreme Court of India">Supreme Court of India</option>
                <option value="Madras High Court">Madras High Court</option>
                <option value="Delhi High Court">Delhi High Court</option>
                <option value="Bombay High Court">Bombay High Court</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Citation Style Standard</label>
              <select
                value={citationFormat}
                onChange={(e) => setCitationFormat(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="SCC / INSC">Supreme Court Cases (SCC) / INSC Neutral</option>
                <option value="AIR">All India Reporter (AIR)</option>
                <option value="SCR">Supreme Court Reports (SCR)</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium">Minimum Similarity Score Cutoff ({similarityThreshold}%)</label>
                <span className="text-indigo-400 font-bold font-mono">{similarityThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400">Precedents with lower semantic scores will be filtered out.</span>
            </div>
          </div>
        </div>

        {/* Node.js Backend & API Connectivity (Section 33 Spec) */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Node.js Backend & Database REST API</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Architecture Ready</span>
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Target Node.js REST API Base Endpoint</label>
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div><strong>ORM:</strong> Sequelize ORM / SQLite / PostgreSQL Ready</div>
              <div><strong>Core Models:</strong> Case, LegalIssue, LegalSection, CaseSection, Judgment, CaseJudgmentMatch, JudgmentSource</div>
              <div><strong>Future AI Service:</strong> Python / FastAPI microservice via REST API</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Dataset</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors"
          >
            Save All Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
