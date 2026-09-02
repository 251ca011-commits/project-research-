import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import decoScalesImg from '../../assets/deco-scales.jpg';
import decoBooksImg from '../../assets/deco-books.jpg';
import decoGavelImg from '../../assets/deco-gavel.jpg';

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
    <div className="login-page-container">
      {/* Warm gradient background */}
      <div className="login-bg-gradient" />

      {/* Decorative floating legal elements */}
      <img src={decoBooksImg} alt="" className="login-deco login-deco-books-tl" aria-hidden="true" />
      <img src={decoScalesImg} alt="" className="login-deco login-deco-scales-tr" aria-hidden="true" />
      <img src={decoGavelImg} alt="" className="login-deco login-deco-gavel-bl" aria-hidden="true" />
      <img src={decoScalesImg} alt="" className="login-deco login-deco-scales-br" aria-hidden="true" />
      <img src={decoBooksImg} alt="" className="login-deco login-deco-books-mr" aria-hidden="true" />

      {/* Subtle light orbs */}
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />
      <div className="login-orb login-orb-3" />

      {/* Main content */}
      <div className="login-content-wrapper">
        {/* Brand Header */}
        <div className="login-brand-header">
          <div className="login-logo-badge">
            <Scale className="w-8 h-8 stroke-[2.2]" style={{ color: 'white' }} />
          </div>
          <h1 className="login-brand-title" style={{ fontFamily: 'var(--font-heading, var(--font-serif))' }}>
            RESEARCH
          </h1>
          <div className="login-brand-underline" />
          <p className="login-brand-subtitle">
            AI-Assisted Legal Precedent Discovery & Judgment Analysis
          </p>
        </div>

        {/* Glass Login Card */}
        <div className="login-glass-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Sign in to Chambers Portal</h2>
            <p className="login-card-desc">Enter your credentials to access case intelligence</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label className="login-label">Official Email</label>
              <div className="login-input-wrap">
                <Mail className="login-input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@lawchambers.com"
                  className="login-input"
                  id="login-email"
                />
              </div>
            </div>

            <div className="login-field">
              <div className="login-label-row">
                <label className="login-label">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Password reset link sent to demo email', 'info');
                  }}
                  className="login-forgot-link"
                >
                  Forgot password?
                </a>
              </div>
              <div className="login-input-wrap">
                <Lock className="login-input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="login-input"
                  id="login-password"
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label">Practitioner Profile</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="login-select"
                id="login-profile"
              >
                <option value="Senior Legal Researcher">Senior Legal Researcher (Default)</option>
                <option value="Senior Advocate">Senior Advocate (Litigation Counsel)</option>
                <option value="Judicial Law Clerk">Judicial Law Clerk / Researcher</option>
              </select>
            </div>

            <button type="submit" className="login-submit-btn" id="login-submit">
              <span>Enter Legal Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider with Scale icon */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <Scale className="login-divider-icon" />
            <div className="login-divider-line" />
          </div>

          {/* Quick Demo Profiles */}
          <div className="login-demo-section">
            <div className="login-demo-title">QUICK DEMO PROFILES</div>
            <div className="login-demo-grid">
              <button
                type="button"
                onClick={() => setDemoAccount('Senior Legal Researcher', 'r.iyer@chambers-legal.in')}
                className="login-demo-btn"
                id="demo-researcher"
              >
                <UserCheck className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                <span>Researcher</span>
              </button>
              <button
                type="button"
                onClick={() => setDemoAccount('Senior Advocate', 'k.ramaswamy@bar-council.in')}
                className="login-demo-btn"
                id="demo-advocate"
              >
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                <span>Sr. Advocate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
