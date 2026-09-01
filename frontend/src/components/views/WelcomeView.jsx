import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, ArrowRight, ShieldCheck, BookOpen, Gavel } from 'lucide-react';
import goddessJusticeImg from '../../assets/goddess-justice.jpg';
import lawBookImg from '../../assets/law-book.jpg';

export const WelcomeView = () => {
  const { navigateTo } = useApp();
  const [phase, setPhase] = useState(0);

  // Cinematic timeline: each phase triggers the next element
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),    // Logo appears
      setTimeout(() => setPhase(2), 900),    // Logo starts floating + images fade in
      setTimeout(() => setPhase(3), 1500),   // "Legal Precedent" text
      setTimeout(() => setPhase(4), 2100),   // Subtitle slides up
      setTimeout(() => setPhase(5), 2700),   // Button + decorative elements
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="welcome-splash-container">
      {/* Background ambient glow effects */}
      <div className="welcome-bg-glow welcome-bg-glow-1" />
      <div className="welcome-bg-glow welcome-bg-glow-2" />
      <div className="welcome-bg-glow welcome-bg-glow-3" />

      {/* Decorative Goddess of Justice - Left Side */}
      <div className={`welcome-deco welcome-deco-left ${phase >= 2 ? 'welcome-visible' : ''}`}>
        <img
          src={goddessJusticeImg}
          alt="Goddess of Justice"
          className="welcome-deco-img welcome-deco-justice"
        />
      </div>

      {/* Decorative Law Book - Right Side */}
      <div className={`welcome-deco welcome-deco-right ${phase >= 2 ? 'welcome-visible' : ''}`}>
        <img
          src={lawBookImg}
          alt="Law Book"
          className="welcome-deco-img welcome-deco-book"
        />
      </div>

      {/* Main Content */}
      <div className="welcome-content">

        {/* Phase 1: Logo — Fade In + Zoom */}
        <div
          className={`welcome-logo-wrap ${phase >= 1 ? 'welcome-logo-enter' : ''} ${phase >= 2 ? 'welcome-logo-float' : ''}`}
          onClick={() => navigateTo('login')}
        >
          {/* Glow ring behind logo */}
          <div className={`welcome-logo-glow ${phase >= 1 ? 'welcome-glow-bloom' : ''}`} />

          {/* Logo icon */}
          <div className="welcome-logo-box">
            <Scale className="w-16 h-16 sm:w-20 sm:h-20 text-white stroke-[2]" />
          </div>

          {/* Orbiting decorative icons */}
          <div className={`welcome-orbit ${phase >= 2 ? 'welcome-orbit-spin' : ''}`}>
            <div className="welcome-orbit-icon welcome-orbit-icon-1">
              <Gavel className="w-4 h-4 text-primary/60" />
            </div>
            <div className="welcome-orbit-icon welcome-orbit-icon-2">
              <BookOpen className="w-4 h-4 text-primary/60" />
            </div>
            <div className="welcome-orbit-icon welcome-orbit-icon-3">
              <ShieldCheck className="w-4 h-4 text-primary/60" />
            </div>
          </div>
        </div>

        {/* Phase 2: Status Badge */}
        <div className={`welcome-badge ${phase >= 3 ? 'welcome-fade-up' : ''}`}>
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>AI-Powered Legal Intelligence & Precedent Engine</span>
        </div>

        {/* Phase 3: "Legal Precedent" Title — Smooth Appear */}
        <div className={`welcome-title-block ${phase >= 3 ? 'welcome-title-reveal' : ''}`}>
          <h1 className="welcome-brand-title" style={{ fontFamily: 'var(--font-heading, var(--font-serif))' }}>
            RESEARCH
          </h1>
          <p className="welcome-brand-sub">
            Legal Precedent
          </p>
        </div>

        {/* Phase 4: Subtitle — Slide Up */}
        <div className={`welcome-subtitle ${phase >= 4 ? 'welcome-slide-up' : ''}`}>
          <p>
            Authorized Judicial Intelligence Portal for Case Law Precedent
            Discovery, Doctrinal Analysis, and Outcome Forecasting.
          </p>
        </div>

        {/* Phase 5: CTA Button — Pop In */}
        <div className={`welcome-cta ${phase >= 5 ? 'welcome-btn-pop' : ''}`}>
          <button
            onClick={() => navigateTo('login')}
            className="welcome-btn group"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>

        {/* Decorative floating particles */}
        <div className={`welcome-particles ${phase >= 2 ? 'welcome-particles-show' : ''}`}>
          <div className="welcome-particle welcome-particle-1" />
          <div className="welcome-particle welcome-particle-2" />
          <div className="welcome-particle welcome-particle-3" />
          <div className="welcome-particle welcome-particle-4" />
          <div className="welcome-particle welcome-particle-5" />
          <div className="welcome-particle welcome-particle-6" />
        </div>
      </div>
    </div>
  );
};
