import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';

export const LogoIntro = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Respect accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsMounted(false);
      return;
    }

    // Sequence timeline:
    // 0.0s - 1.3s: Intro animation sequence runs smoothly
    // 1.35s: Start smooth opacity fade out
    // 1.85s: Completely unmount overlay from DOM
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1350);

    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
    }, 1850);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background select-none transition-opacity duration-500 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-5 px-4">
        {/* Logo Container with Ambient Glow and Entrance Animation */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Ambient Glow Ring */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[oklch(0.92_0.065_74.3695)] via-primary/30 to-[oklch(0.865_0.065_74.3695)] blur-xl opacity-0 animate-intro-glow pointer-events-none" />

          {/* Logo Badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/35 border-4 border-border animate-intro-logo">
            <Scale className="w-12 h-12 sm:w-14 sm:h-14 text-white stroke-[2.2]" />
          </div>
        </div>

        {/* Text Sequence with Staggered Fade-in and Upward Reveal */}
        <div className="space-y-1.5">
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight animate-intro-title opacity-0"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            RESEARCH
          </h1>
          <p className="text-xs sm:text-sm text-foreground/80 font-medium tracking-wide animate-intro-subtitle opacity-0 max-w-xs sm:max-w-md">
            Legal Precedent Discovery & Precedent Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};
