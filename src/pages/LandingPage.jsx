// src/pages/LandingPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Target, 
  Map, 
  Compass, 
  FileText, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Award, 
  Users, 
  Check, 
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES } from '../data/rolesData';
import ReadinessGauge from '../components/common/ReadinessGauge';

export default function LandingPage() {
  const navigate = useNavigate();
  const { profile, analysis, loadDemoData } = useApp();

  const handleStartAnalysis = () => {
    navigate('/assessment');
  };

  const handleExploreDashboard = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Profile your technical skills, soft skills, proficiencies, academic projects, and certifications with intuitive search and chip selectors.',
      color: 'from-blue-500 to-indigo-600',
      tag: 'Step 1'
    },
    {
      icon: Layers,
      title: 'Gap Detection',
      description: 'Rule-based evaluation comparing your proficiency against standard industry roles to highlight matched, weak, and missing skills with priority badges.',
      color: 'from-indigo-600 to-purple-600',
      tag: 'Step 2'
    },
    {
      icon: Compass,
      title: 'Career Matching',
      description: 'Benchmark your skill inventory across 8 prominent tech careers to discover alternate roles where your existing skills shine brightest.',
      color: 'from-purple-600 to-pink-600',
      tag: 'Step 3'
    },
    {
      icon: Map,
      title: 'Learning Roadmap',
      description: 'Structured 4-week personalized curriculum prioritizing high-impact gaps with curated free learning materials, practice exercises, and mini-projects.',
      color: 'from-emerald-500 to-teal-600',
      tag: 'Step 4'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Input Your Skill Profile',
      desc: 'List your technical stack, academic projects, and self-assessed proficiency levels from Beginner to Advanced.',
    },
    {
      step: '02',
      title: 'Transparent Gap Computation',
      desc: 'Our deterministic algorithm calculates a weighted readiness score and categorizes missing vs weak competencies.',
    },
    {
      step: '03',
      title: 'Execute Your 4-Week Roadmap',
      desc: 'Follow weekly milestone checklists with verified documentation and open-course resources to achieve job readiness.',
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-brand-indigo-100 via-brand-purple-100 to-transparent blur-3xl" />
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-indigo-50 border border-brand-indigo-100 text-brand-indigo-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-indigo-600 animate-pulse" />
            <span>AI-Driven Career Readiness Engine for College Students</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Discover Your Skills.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo-600 via-brand-purple-electric to-brand-navy-900">
              Bridge Your Gaps.
            </span>{' '}
            Build Your Future.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Evaluate your academic skillset against real-world engineering benchmarks. Get an objective readiness score, transparent gap diagnostics, and a personalized 4-week learning roadmap.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartAnalysis}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 hover:from-brand-indigo-700 hover:to-brand-purple-700 text-white font-bold text-sm shadow-soft-lg hover:shadow-soft-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Analyze My Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreDashboard}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4 text-brand-indigo-600" />
              <span>Explore Dashboard</span>
            </button>
          </div>

          {/* Demo quick pill */}
          <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-2">
            <span>Want to test immediately?</span>
            <button
              onClick={() => {
                loadDemoData();
                navigate('/dashboard');
              }}
              className="font-semibold text-brand-indigo-600 hover:text-brand-indigo-700 underline underline-offset-2 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Load Realistic 3rd-Year Demo Profile</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Analytics Preview Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-soft-xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Analytics Preview
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Student Profile: {profile?.name || 'Demo Student'}
              </h3>
              <p className="text-xs text-slate-500">
                Targeting: <strong className="text-brand-indigo-600 font-semibold">{analysis.role.title}</strong> • {profile?.branch}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/gap-analysis"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-indigo-50 text-brand-indigo-700 hover:bg-brand-indigo-100 transition-colors flex items-center gap-1"
              >
                <span>View Full Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <ReadinessGauge score={analysis.readinessScore} size={110} strokeWidth={9} showLabel={false} />
              <p className="text-xs font-semibold text-slate-700 mt-2">Overall Readiness</p>
              <p className="text-[11px] text-slate-400">Weighted Proficiency</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">Matched Skills</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-emerald-700">{analysis.matchedCount}</p>
                <p className="text-[11px] text-emerald-600">Meets role standard</p>
              </div>
              <div className="text-[10px] text-emerald-700/80 truncate">
                {analysis.matchedSkills.map(s => s.name).slice(0, 2).join(', ')}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-800">Needs Improvement</span>
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-amber-700">{analysis.needsImprovementCount}</p>
                <p className="text-[11px] text-amber-600">Proficiency below benchmark</p>
              </div>
              <div className="text-[10px] text-amber-700/80 truncate">
                {analysis.needsImprovementSkills.map(s => s.name).slice(0, 2).join(', ') || 'None'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-800">Missing Skills</span>
                <Target className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-rose-700">{analysis.missingCount}</p>
                <p className="text-[11px] text-rose-600">Unacquired prerequisites</p>
              </div>
              <div className="text-[10px] text-rose-700/80 truncate">
                {analysis.missingSkills.map(s => s.name).slice(0, 2).join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-indigo-600 mb-2">
            Engine Capabilities
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for Student Success
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Everything college students need to evaluate their employability without complicated setups or paid third-party APIs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {feat.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Three-Step Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-navy-900 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo-400">
              How It Works
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
              From Self-Assessment to Job Readiness in 3 Steps
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Our transparent, deterministic algorithm bridges academia and engineering demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((st, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xs flex flex-col justify-between">
                <div>
                  <div className="text-3xl font-black text-brand-indigo-400 mb-3 font-mono">
                    {st.step}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-brand-indigo-300 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Rule-based and verifiable</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center relative z-10">
            <button
              onClick={() => navigate('/assessment')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-navy-900 hover:bg-slate-100 font-bold text-sm shadow-lg transition-transform active:scale-95"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 text-brand-indigo-600" />
            </button>
          </div>
        </div>
      </section>

      {/* 8 Supported Roles Grid Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-indigo-600 mb-2">
            Target Careers
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Skill Blueprints for 8 Top Tech Roles
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Predefined industry skill weights, target proficiencies, and curated free resources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAREER_ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => {
                navigate('/gap-analysis');
              }}
              className="cursor-pointer group p-5 rounded-xl bg-white border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md hover:border-brand-indigo-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded">
                  {role.skills.length} Required Skills
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {role.marketDemand}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-indigo-600 transition-colors">
                {role.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {role.shortDescription}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-indigo-600">
                <span>Analyze Gaps</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
