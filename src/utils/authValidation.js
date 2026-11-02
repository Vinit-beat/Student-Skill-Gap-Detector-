// src/utils/authValidation.js
// Validation utilities for SkillSync AI Authentication

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return 'Phone number is required';
  // Allows optional '+' followed by digits, spaces, hyphens, parentheses (7 to 15 digits)
  const phoneRegex = /^\+?[0-9\s\-()]{7,16}$/;
  if (!phoneRegex.test(phone.trim())) {
    return 'Please enter a valid phone number (e.g. +91 9876543210)';
  }
  return null;
};

export const validateUsername = (username) => {
  if (!username || !username.trim()) return 'Username is required';
  const clean = username.trim();
  if (clean.length < 3) return 'Username must be at least 3 characters';
  if (clean.length > 20) return 'Username must be under 20 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(clean)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

export const calculatePasswordStrength = (password = '') => {
  if (!password) return { score: 0, label: 'None', color: 'bg-slate-200', text: 'text-slate-400' };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600', percent: 25 };
  } else if (score <= 3) {
    return { score: 2, label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-600', percent: 60 };
  } else if (score === 4) {
    return { score: 3, label: 'Good', color: 'bg-indigo-500', text: 'text-indigo-600', percent: 80 };
  } else {
    return { score: 4, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600', percent: 100 };
  }
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

export const validateUrl = (url, fieldName = 'URL') => {
  if (!url || !url.trim()) return null; // optional
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return `${fieldName} must start with http:// or https://`;
    }
  } catch (_) {
    return `Please enter a valid ${fieldName} (e.g. https://linkedin.com/in/username)`;
  }
  return null;
};
