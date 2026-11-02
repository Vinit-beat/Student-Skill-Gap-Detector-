// src/components/auth/SignUpForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  GraduationCap, 
  Building, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import MultiSelectSkills from './MultiSelectSkills';
import DomainSelector from './DomainSelector';
import RegistrationProgress from './RegistrationProgress';
import ReviewDetails from './ReviewDetails';
import { 
  validateEmail, 
  validatePhone, 
  validateUsername, 
  validatePassword, 
  validateConfirmPassword 
} from '../../utils/authValidation';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';
import { CAREER_ROLES } from '../../data/rolesData';

// Predefined available skill lists
const TECHNICAL_SKILLS_SUGGESTIONS = [
  'HTML5 & Modern CSS',
  'JavaScript (ES6+)',
  'React.js',
  'TypeScript',
  'Python for Data Science (NumPy, Scipy, Pandas)',
  'SQL & Relational Databases (PostgreSQL)',
  'Java',
  'C++',
  'Node.js or Python Backend',
  'MongoDB',
  'Machine Learning Algorithms (Scikit-Learn)',
  'Deep Learning & PyTorch',
  'Cloud Platform Services (AWS / Azure / GCP)',
  'Docker & Containerization',
  'Git & Version Control',
  'RESTful API Architecture',
  'Computer Networks & Protocols',
  'UI/UX Design Fundamentals'
];

const SOFT_SKILLS_SUGGESTIONS = [
  'Team Collaboration & Communication',
  'Analytical Problem Solving',
  'Leadership',
  'Critical Thinking',
  'Time Management',
  'Data Storytelling & Presentation',
  'Resilience & Adaptability'
];

export default function SignUpForm({ onSwitchToSignIn }) {
  const navigate = useNavigate();
  const { updateProfile, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState('');

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',

    // Step 2: Academic
    college: '',
    degree: 'B.Tech',
    branch: 'Computer Science',
    academicYear: 'Third Year',
    graduationYear: '2026',

    // Step 3: Skills & Interests
    technicalSkills: ['HTML5 & Modern CSS', 'JavaScript (ES6+)', 'React.js', 'SQL & Relational Databases (PostgreSQL)'],
    softSkills: ['Team Collaboration & Communication', 'Analytical Problem Solving'],
    interestedDomains: ['Web Development', 'Software Engineering'],
    preferredRole: 'frontend-developer',
    currentSkillLevel: 'Intermediate',

    // Step 4: Additional (Optional)
    linkedIn: '',
    github: '',
    projectsNotes: '',
    certificationsNotes: ''
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    
    const usernameErr = validateUsername(formData.username);
    if (usernameErr) errs.username = usernameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errs.phone = phoneErr;

    if (!formData.dob) errs.dob = 'Date of birth is required';

    const pwdErr = validatePassword(formData.password);
    if (pwdErr) errs.password = pwdErr;

    const confirmErr = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmErr) errs.confirmPassword = confirmErr;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs = {};
    if (!formData.college.trim()) errs.college = 'College/University name is required';
    if (!formData.branch.trim()) errs.branch = 'Branch/Specialization is required';
    if (!formData.graduationYear) errs.graduationYear = 'Graduation year is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs = {};
    if (formData.technicalSkills.length === 0) {
      errs.technicalSkills = 'Please select at least one technical skill';
    }
    if (formData.softSkills.length === 0) {
      errs.softSkills = 'Please select at least one soft skill';
    }
    if (formData.interestedDomains.length === 0) {
      errs.interestedDomains = 'Please select at least one domain of interest';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Advance to next step
  const handleNextStep = () => {
    setServerError('');
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
  };

  // Step Back
  const handlePrevStep = () => {
    setServerError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Final Registration Submit
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setServerError('');
    setTermsError('');

    if (!acceptTerms) {
      setTermsError('You must agree to the Terms and Conditions to create your student account.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.register(formData);

      if (res.success) {
        const user = res.user;

        // Map registered student skills with proficiency level numbers
        const levelNum = user.currentSkillLevel === 'Advanced' ? 3 : user.currentSkillLevel === 'Beginner' ? 1 : 2;
        const mappedSkills = (user.technicalSkills || []).map(skillName => ({
          name: skillName,
          category: 'Technical',
          level: levelNum
        })).concat(
          (user.softSkills || []).map(skillName => ({
            name: skillName,
            category: 'Soft',
            level: 2
          }))
        );

        // Update application state
        const appProfile = {
          name: user.fullName,
          degree: user.degree,
          branch: user.branch,
          academicYear: user.academicYear,
          college: user.college,
          targetRole: user.preferredRole || 'frontend-developer',
          skills: mappedSkills,
          projects: user.projectsNotes ? [
            {
              id: 'p-user-1',
              title: 'Academic Milestone Project',
              description: user.projectsNotes,
              technologies: user.technicalSkills?.slice(0, 3).join(', ') || 'React, SQL'
            }
          ] : [],
          certifications: user.certificationsNotes ? [
            {
              id: 'c-user-1',
              title: user.certificationsNotes,
              issuer: 'Course Provider'
            }
          ] : []
        };

        updateProfile(appProfile);
        showToast(res.message, 'success');
        navigate('/dashboard');
      } else {
        setServerError(res.error || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setServerError('An error occurred during account creation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Step Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Create Student Account
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Step {currentStep} of 4: {
            currentStep === 1 ? 'Personal Information' :
            currentStep === 2 ? 'Academic Background' :
            currentStep === 3 ? 'Skills & Career Goals' : 'Review & Confirm'
          }
        </p>
      </div>

      {/* Multi-Step Progress Stepper */}
      <RegistrationProgress
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />

      {/* Server / Validation Error Notice */}
      {serverError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{serverError}</span>
        </div>
      )}

      {/* Multi-Step Form Sections */}
      <form onSubmit={currentStep === 4 ? handleCreateAccount : (e) => { e.preventDefault(); handleNextStep(); }}>
        
        {/* ================= STEP 1: PERSONAL DETAILS ================= */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <FormInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              placeholder="e.g. Aarav Sharma"
              error={errors.fullName}
              icon={User}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Username"
                name="username"
                value={formData.username}
                onChange={(e) => handleFieldChange('username', e.target.value)}
                placeholder="e.g. aarav_cs"
                error={errors.username}
                required
                hint="3-20 characters"
              />

              <FormInput
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleFieldChange('dob', e.target.value)}
                error={errors.dob}
                icon={Calendar}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="student@college.edu"
                error={errors.email}
                icon={Mail}
                required
              />

              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                error={errors.phone}
                icon={Phone}
                required
                hint="Include country code"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                error={errors.password}
                required
                showStrength
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2: ACADEMIC DETAILS ================= */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <FormInput
              label="College / University Name"
              name="college"
              value={formData.college}
              onChange={(e) => handleFieldChange('college', e.target.value)}
              placeholder="e.g. National Institute of Technology"
              error={errors.college}
              icon={Building}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Degree"
                name="degree"
                type="select"
                value={formData.degree}
                onChange={(e) => handleFieldChange('degree', e.target.value)}
                options={['B.Tech', 'B.E.', 'BCA', 'MCA', 'B.Sc. Computer Science', 'M.Tech', 'Other']}
                required
              />

              <FormInput
                label="Branch / Specialization"
                name="branch"
                type="select"
                value={formData.branch}
                onChange={(e) => handleFieldChange('branch', e.target.value)}
                options={[
                  'Computer Science',
                  'Information Technology (IT)',
                  'AI & Machine Learning',
                  'Data Science',
                  'Electronics & Communication',
                  'Electrical Engineering',
                  'Mechanical Engineering',
                  'Civil Engineering',
                  'Other'
                ]}
                error={errors.branch}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Current Academic Year"
                name="academicYear"
                type="select"
                value={formData.academicYear}
                onChange={(e) => handleFieldChange('academicYear', e.target.value)}
                options={['First Year (1st)', 'Second Year (2nd)', 'Third Year (3rd)', 'Final Year (4th)', 'Postgraduate']}
                required
              />

              <FormInput
                label="Graduation Year"
                name="graduationYear"
                type="select"
                value={formData.graduationYear}
                onChange={(e) => handleFieldChange('graduationYear', e.target.value)}
                options={['2024', '2025', '2026', '2027', '2028', '2029']}
                error={errors.graduationYear}
                required
              />
            </div>
          </div>
        )}

        {/* ================= STEP 3: SKILLS & CAREER INTERESTS ================= */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            
            {/* Preferred Role & Skill Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90">
              <FormInput
                label="Preferred Career Role"
                name="preferredRole"
                type="select"
                value={formData.preferredRole}
                onChange={(e) => handleFieldChange('preferredRole', e.target.value)}
                options={CAREER_ROLES.map(r => ({ value: r.id, label: r.title }))}
                required
                hint="Target for gap detection"
              />

              <FormInput
                label="Current Overall Skill Level"
                name="currentSkillLevel"
                type="select"
                value={formData.currentSkillLevel}
                onChange={(e) => handleFieldChange('currentSkillLevel', e.target.value)}
                options={['Beginner', 'Intermediate', 'Advanced']}
                required
              />
            </div>

            {/* Technical Skills Searchable Multi-Select */}
            <MultiSelectSkills
              label="Technical Skills"
              selectedSkills={formData.technicalSkills}
              onChange={(skills) => handleFieldChange('technicalSkills', skills)}
              availableSuggestions={TECHNICAL_SKILLS_SUGGESTIONS}
              placeholder="Search or add skill (e.g. React, C++, Java, Python, SQL)..."
              category="Technical"
              error={errors.technicalSkills}
              required
            />

            {/* Soft Skills Selectable Tags */}
            <MultiSelectSkills
              label="Soft Skills"
              selectedSkills={formData.softSkills}
              onChange={(skills) => handleFieldChange('softSkills', skills)}
              availableSuggestions={SOFT_SKILLS_SUGGESTIONS}
              placeholder="Search or add soft skill (e.g. Communication, Problem Solving)..."
              category="Soft"
              error={errors.softSkills}
              required
            />

            {/* Interested Domains Multi-Select Cards */}
            <DomainSelector
              selectedDomains={formData.interestedDomains}
              onChange={(domains) => handleFieldChange('interestedDomains', domains)}
              error={errors.interestedDomains}
              required
            />

          </div>
        )}

        {/* ================= STEP 4: REVIEW & CONFIRM ================= */}
        {currentStep === 4 && (
          <ReviewDetails
            formData={{
              ...formData,
              onAdditionalChange: handleFieldChange
            }}
            onEditStep={(step) => setCurrentStep(step)}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
            termsError={termsError}
          />
        )}

        {/* Navigation Buttons: Previous / Continue / Create Account */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-100 mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div /> // Spacer
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white font-bold text-xs sm:text-sm shadow-soft-sm hover:shadow-soft-md transition-all ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-indigo-600 via-brand-purple-600 to-brand-purple-electric hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-soft-lg hover:shadow-soft-xl transition-all ml-auto disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          )}
        </div>

      </form>

      {/* Switch to Sign In */}
      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-brand-indigo-600 font-bold hover:underline"
        >
          Sign In
        </button>
      </div>

    </div>
  );
}
