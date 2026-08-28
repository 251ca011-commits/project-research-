import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, ArrowRight, ShieldCheck } from 'lucide-react';

export const WelcomeView = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center space-y-8 animate-pop-in py-12 px-4">
      {/* 1. Floating Brown Scales of Justice Logo Badge with Pop Glow */}
      <div className="relative group cursor-pointer" onClick={() => navigateTo('login')}>
        <div className="absolute -inset-2 bg-gradient-to-tr from-[oklch(0.92_0.065_74.3695)] via-primary/20 to-[oklch(0.865_0.065_74.3695)] rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/35 border-4 border-border transform group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300 animate-float">
          <Scale className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-[2.2]" />
        </div>
      </div>

      {/* 2. Top Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-secondary-foreground text-xs font-semibold shadow-sm hover:scale-105 transition-transform">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>AI-Powered Legal Intelligence & Precedent Engine</span>
      </div>

      {/* 3. Main Brand Heading & Subtitle */}
      <div className="space-y-3 max-w-xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-primary tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          RESEARCH
        </h1>
        <p className="text-sm sm:text-base text-foreground/80 font-medium leading-relaxed">
          Authorized Judicial Intelligence Portal for Case Law Precedent Discovery, Doctrinal Analysis, and Outcome Forecasting.
        </p>
      </div>

      {/* 4. Popping "Proceed to Login" Button */}
      <div className="pt-2">
        <button
          onClick={() => navigateTo('login')}
          className="btn-pop group px-8 py-3.5 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-3 cursor-pointer select-none"
        >
          <span>Proceed to Login</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
