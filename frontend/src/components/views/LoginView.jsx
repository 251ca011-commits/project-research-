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
      organization: 'Supreme Court & High Court Bar Association',
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
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Brand Header with Brown Logo Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-4 rounded-3xl bg-primary text-white shadow-xl shadow-primary/25 border-2 border-border/40 mb-1">
          <Scale className="w-9 h-9 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
          RESEARCH
        </h1>
        <p className="text-xs text-muted-foreground">
          AI-Assisted Legal Precedent Discovery & Judgment Analysis
        </p>
      </div>

      {/* Main Login Card with Peach/Amber Border */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border-2 border-border shadow-2xl space-y-6">
        <div className="space-y-1 text-center">
          <h2 className="text-lg font-bold text-foreground">Sign in to Chambers Portal</h2>
          <p className="text-xs text-muted-foreground">Enter your credentials to access case intelligence</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Official Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@lawchambers.com"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border-2 border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Password</label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Password reset link sent to demo email', 'info');
                }}
                className="text-[11px] text-primary hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border-2 border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Practitioner Profile</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border-2 border-border text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner"
            >
              <option value="Senior Legal Researcher">Senior Legal Researcher (Default)</option>
              <option value="Senior Advocate">Senior Advocate (Litigation Counsel)</option>
              <option value="Judicial Law Clerk">Judicial Law Clerk / Researcher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-primary hover:opacity-90 text-primary-foreground text-xs font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all mt-3 cursor-pointer"
          >
            <span>Enter Legal Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switcher */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">
            Quick Demo Profiles
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDemoAccount('Senior Legal Researcher', 'r.iyer@chambers-legal.in')}
              className="p-2.5 rounded-lg bg-secondary hover:opacity-90 border border-border text-[11px] text-secondary-foreground font-semibold flex items-center gap-1.5 justify-center transition-all cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              <span>Researcher</span>
            </button>
            <button
              type="button"
              onClick={() => setDemoAccount('Senior Advocate', 'k.ramaswamy@bar-council.in')}
              className="p-2.5 rounded-lg bg-secondary hover:opacity-90 border border-border text-[11px] text-secondary-foreground font-semibold flex items-center gap-1.5 justify-center transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Sr. Advocate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
