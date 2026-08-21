import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginView = () => {
  const { setUser, navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('r.iyer@chambers-legal.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Senior Legal Researcher');

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({
      name: role === 'Senior Advocate' ? 'Adv. K. Ramaswamy' : 'Adv. Rajeshwari Iyer',
      role: role,
      email: email,
      organization: 'Supreme Court & High Court Bar ',
      isLoggedIn: true
    });
    showToast(`Welcome back, ${role === 'Senior Advocate' ? 'Adv. Ramaswamy' : 'Adv. Iyer'}`, 'success');
    navigateTo('dashboard');
  };

  const setDemoAccount = (demoRole, demoEmail) => {
    setRole(demoRole);
    setEmail(demoEmail);
    setPassword('demopassword123');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 shadow-xl shadow-indigo-950/50 mb-2">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
          RESEARCH
        </h1>
        <p className="text-xs text-slate-400">
          AI-Assisted Legal Precedent Discovery & Judgment Analysis
        </p>
      </div>

      {/* Main Login Card */}
      <div className="p-6 md:p-8 rounded-2xl glass-panel shadow-2xl space-y-6">
        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold text-slate-100">Sign in to Chambers Portal</h2>
          <p className="text-xs text-slate-400">Enter your credentials to access case intelligence</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Official Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@lawchambers.com"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to demo email', 'info'); }} className="text-[11px] text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Practitioner Profile</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="Senior Legal Researcher">Senior Legal Researcher (Default)</option>
              <option value="Senior Advocate">Senior Advocate (Litigation Counsel)</option>
              <option value="Judicial Law Clerk">Judicial Law Clerk / Researcher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>Enter Legal Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switcher */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
            Quick Demo Profiles
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDemoAccount('Senior Legal Researcher', 'r.iyer@chambers-legal.in')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5 justify-center transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Researcher</span>
            </button>
            <button
              type="button"
              onClick={() => setDemoAccount('Senior Advocate', 'k.ramaswamy@bar-council.in')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5 justify-center transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sr. Advocate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
