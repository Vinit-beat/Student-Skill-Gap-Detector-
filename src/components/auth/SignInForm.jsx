// src/components/auth/SignInForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Sparkles, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';

export default function SignInForm({ onSwitchToSignUp }) {
  const navigate = useNavigate();
  const { updateProfile, showToast } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Validate fields on submit
  const validateForm = () => {
    const errs = {};
    if (!identifier.trim()) {
      errs.identifier = 'Username or email is required';
    }
    if (!password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await authService.signIn(identifier, password, rememberMe);
      if (res.success) {
        // Map user profile to application state for dashboard & gap analysis
        const user = res.user;
        const profileSkills = (user.technicalSkills || []).map(skillName => ({
          name: skillName,
          category: 'Technical',
          level: user.currentSkillLevel === 'Advanced' ? 3 : user.currentSkillLevel === 'Beginner' ? 1 : 2
        })).concat(
          (user.softSkills || []).map(skillName => ({
            name: skillName,
            category: 'Soft',
            level: 2
          }))
        );

        const appProfile = {
          name: user.fullName,
          degree: user.degree || 'B.Tech',
          branch: user.branch || 'Computer Science',
          academicYear: user.academicYear || 'Third Year',
          targetRole: user.preferredRole || 'frontend-developer',
          college: user.college,
          skills: profileSkills.length > 0 ? profileSkills : undefined,
          projects: user.projectsNotes ? [{ id: 'p-user-1', title: 'Featured Project', description: user.projectsNotes, technologies: user.technicalSkills?.slice(0, 3).join(', ') || 'React, SQL' }] : [],
          certifications: user.certificationsNotes ? [{ id: 'c-user-1', title: user.certificationsNotes, issuer: 'Verified Course' }] : []
        };

        updateProfile(appProfile);
        showToast(res.message, 'success');
        navigate('/dashboard');
      } else {
        setServerError(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setServerError('An unexpected error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Demo Login Shortcut
  const handleQuickDemoLogin = async () => {
    const demo = authService.getDemoCredentials();
    setIdentifier(demo.username);
    setPassword(demo.password);
    setIsLoading(true);
    setServerError('');

    const res = await authService.signIn(demo.username, demo.password, true);
    setIsLoading(false);

    if (res.success) {
      showToast('Signed in with Demo Student profile (Aarav Sharma)!', 'success');
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Form Title & Subtitle */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to SkillSync AI
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your personalized skill gap analytics and 4-week roadmap.
        </p>
      </div>

      {/* Server / Auth Error Banner */}
      {serverError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{serverError}</span>
        </div>
      )}

      {/* Main Sign In Form */}
      <form onSubmit={handleSignIn} className="space-y-4">
        
        {/* Username or Email Input */}
        <FormInput
          label="Username or Email"
          name="identifier"
          type="text"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (errors.identifier) setErrors(prev => ({ ...prev, identifier: null }));
          }}
          placeholder="e.g. aarav or aarav.sharma@example.edu"
          error={errors.identifier}
          icon={User}
          required
          autoComplete="username"
        />

        {/* Password Input with Show/Hide Toggle */}
        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors(prev => ({ ...prev, password: null }));
          }}
          placeholder="Enter your password"
          error={errors.password}
          required
          autoComplete="current-password"
        />

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-brand-indigo-600 focus:ring-brand-indigo-500"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-brand-indigo-600 hover:text-brand-indigo-800 font-semibold"
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-indigo-600 to-brand-purple-600 hover:from-brand-indigo-700 hover:to-brand-purple-700 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-soft-md hover:shadow-soft-lg transition-all duration-150 active:scale-98"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Authenticating...</span>
            </span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </form>

      {/* Demo 1-Click Login Box */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-indigo-600" />
            <span>College Presentation Shortcut</span>
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Demo</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Instantly sign in with pre-configured 3rd-year student profile (Aarav Sharma):
        </p>
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          disabled={isLoading}
          className="w-full py-2 px-3 rounded-lg bg-white border border-slate-200 hover:border-brand-indigo-300 hover:bg-brand-indigo-50/50 text-brand-indigo-700 font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>1-Click Demo Student Sign In</span>
        </button>
      </div>

      {/* Switch to Sign Up */}
      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-brand-indigo-600 font-bold hover:underline"
        >
          Sign Up
        </button>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-indigo-50 text-brand-indigo-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-slate-900">Demo Password Recovery</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                In this frontend-only academic prototype, demo accounts use password: <br />
                <code className="font-mono font-bold text-brand-indigo-600 bg-brand-indigo-50 px-2 py-0.5 rounded mt-1 inline-block">
                  DemoPass123!
                </code>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPassword('DemoPass123!');
                setShowForgotModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-brand-indigo-600 text-white font-bold text-xs"
            >
              Fill Demo Password & Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
