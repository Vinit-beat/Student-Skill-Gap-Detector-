// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Map, 
  Compass, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  Layers,
  ArrowRight
} from 'lucide-react';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [authMode, setAuthMode] = useState(initialMode);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup' || mode === 'signin') {
      setAuthMode(mode);
    }
  }, [searchParams]);

  const switchTab = (mode) => {
    setAuthMode(mode);
    setSearchParams({ mode });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-slate-50">
      
      {/* ================= LEFT SPLIT PANE: BRANDING & CAREER GROWTH VISUALS ================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-navy-950 via-brand-navy-900 to-brand-indigo-950 text-white p-12 flex-col justify-between relative overflow-hidden shrink-0">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding */}
        <div className="relative z-10 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-indigo-600 to-brand-purple-electric flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-brand-indigo-300 transition-colors">
                SkillSync AI
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-indigo-300">
                Student Skill Gap Detector
              </p>
            </div>
          </Link>

          <div className="pt-6 max-w-md">
            <h1 className="text-3xl font-extrabold tracking-tight leading-snug">
              Discover Your Skills.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo-300 via-brand-purple-300 to-white">
                Bridge Your Gaps.
              </span>{' '}
              Build Your Future.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Join thousands of college engineering students diagnosing their skill readiness against industry job benchmarks.
            </p>
          </div>
        </div>

        {/* Visual Graphic Representation of AI Analytics & Roadmap */}
        <div className="relative z-10 my-8 space-y-4 max-w-md">
          
          {/* Card 1: Interactive Skill Metric Simulation */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Target Career: Frontend Developer</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                82% Match
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Weighted Proficiency</span>
                <span className="font-mono text-white font-bold">82 / 100</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-indigo-400 to-emerald-400 rounded-full w-[82%]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px]">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-emerald-300 block font-bold text-xs">6</span>
                <span className="text-slate-400">Matched</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-amber-300 block font-bold text-xs">2</span>
                <span className="text-slate-400">Weak</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-rose-300 block font-bold text-xs">2</span>
                <span className="text-slate-400">Missing</span>
              </div>
            </div>
          </div>

          {/* Feature Pillars */}
          <div className="space-y-2 text-xs">
            {[
              { icon: Target, label: 'Deterministic Rule-Based Algorithm (Zero Blackbox)' },
              { icon: Map, label: 'Personalized 4-Week Milestone Learning Roadmap' },
              { icon: Compass, label: 'Cross-Role Matching for 8 Tech Career Tracks' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300 text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-brand-indigo-400 shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Note */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span>College Academic Prototype</span>
          <span className="flex items-center gap-1 text-slate-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-indigo-400" />
            <span>Client-side LocalStorage</span>
          </span>
        </div>

      </div>

      {/* ================= RIGHT SPLIT PANE: AUTHENTICATION FORMS ================= */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-10 max-w-xl mx-auto w-full">
        
        {/* Mobile Header */}
        <div className="lg:hidden text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-navy-900 to-brand-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-indigo-100" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              SkillSync AI
            </span>
          </Link>
          <p className="text-xs text-slate-500">
            Student Skill Gap Detector
          </p>
        </div>

        {/* Auth Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg p-6 sm:p-8">
          
          {/* Sign In vs Sign Up Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => switchTab('signin')}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                authMode === 'signin'
                  ? 'bg-white text-brand-indigo-700 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => switchTab('signup')}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                authMode === 'signup'
                  ? 'bg-white text-brand-indigo-700 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Active Form */}
          {authMode === 'signin' ? (
            <SignInForm onSwitchToSignUp={() => switchTab('signup')} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => switchTab('signin')} />
          )}

        </div>

        {/* Prototype Transparency Note */}
        <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
          SkillSync AI Prototype • Zero External APIs or Databases • LocalStorage Authentication
        </p>

      </div>

    </div>
  );
}
