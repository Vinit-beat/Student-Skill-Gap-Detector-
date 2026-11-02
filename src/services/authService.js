// src/services/authService.js
// Mock Authentication Service for SkillSync AI (Frontend-Only Prototype)
// Non-sensitive profile data is stored in LocalStorage. Passwords are simulated with a hash.

const STORAGE_KEYS = {
  USERS: 'skillsync_demo_users_v1',
  SESSION: 'skillsync_auth_session_v1'
};

// Simple deterministic hash simulation so plain-text passwords are not stored
const hashPassword = (password) => {
  let hash = 0;
  const str = `skillsync_salt_${password}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hash_${Math.abs(hash).toString(16)}`;
};

// Seed initial default demo accounts if none exist
const DEFAULT_DEMO_ACCOUNTS = [
  {
    id: 'user_aarav_sharma',
    fullName: 'Aarav Sharma',
    username: 'aarav',
    email: 'aarav.sharma@example.edu',
    phone: '+91 98765 43210',
    dob: '2003-05-15',
    college: 'National Institute of Technology',
    degree: 'B.Tech',
    branch: 'Computer Science',
    academicYear: 'Third Year',
    graduationYear: '2026',
    technicalSkills: ['HTML5 & Modern CSS', 'JavaScript (ES6+)', 'React.js', 'SQL & Relational Databases (PostgreSQL)', 'Git & Version Control'],
    softSkills: ['Team Collaboration & Communication', 'Analytical Problem Solving'],
    interestedDomains: ['Web Development', 'Software Engineering', 'UI/UX Design'],
    preferredRole: 'frontend-developer',
    currentSkillLevel: 'Intermediate',
    linkedIn: 'https://linkedin.com/in/aarav-sharma-demo',
    github: 'https://github.com/aarav-sharma-demo',
    projectsNotes: 'Campus Event Portal, Student Task Tracker',
    certificationsNotes: 'freeCodeCamp Responsive Web Design, JavaScript Algorithms',
    passwordHash: hashPassword('DemoPass123!'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_priya_patel',
    fullName: 'Priya Patel',
    username: 'priya_ai',
    email: 'priya.patel@tech.edu',
    phone: '+91 98123 45678',
    dob: '2002-11-20',
    college: 'Indian Institute of Information Technology',
    degree: 'B.Tech',
    branch: 'AI & ML',
    academicYear: 'Final Year',
    graduationYear: '2025',
    technicalSkills: ['Python for Data Science (NumPy, Scipy, Pandas)', 'Deep Learning & PyTorch', 'SQL & Relational Databases (PostgreSQL)', 'Git & Version Control'],
    softSkills: ['Problem Solving', 'Critical Thinking'],
    interestedDomains: ['Artificial Intelligence and Machine Learning', 'Data Science and Analytics'],
    preferredRole: 'ai-ml-engineer',
    currentSkillLevel: 'Intermediate',
    linkedIn: 'https://linkedin.com/in/priya-patel-ai',
    github: 'https://github.com/priya-ai',
    projectsNotes: 'CNN Image Classifier on CIFAR-10',
    certificationsNotes: 'Deep Learning Specialization (Coursera)',
    passwordHash: hashPassword('DemoPass123!'),
    createdAt: new Date().toISOString()
  }
];

export const authService = {
  // Retrieve all registered accounts from LocalStorage
  getUsers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading users from storage:', e);
    }
    // Seed defaults
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_DEMO_ACCOUNTS));
    return DEFAULT_DEMO_ACCOUNTS;
  },

  // Save updated users list
  _saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users:', e);
    }
  },

  // Check if username or email already exists
  checkExisting(username, email) {
    const users = this.getUsers();
    const usernameTaken = users.some(u => u.username?.toLowerCase() === username?.trim().toLowerCase());
    const emailTaken = users.some(u => u.email?.toLowerCase() === email?.trim().toLowerCase());
    return { usernameTaken, emailTaken };
  },

  // Simulate user registration
  async register(registrationData) {
    // Artificial latency for SaaS feel
    await new Promise(resolve => setTimeout(resolve, 600));

    const { username, email, password } = registrationData;
    const { usernameTaken, emailTaken } = this.checkExisting(username, email);

    if (usernameTaken) {
      return { success: false, error: 'Username is already taken by another student.' };
    }
    if (emailTaken) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const users = this.getUsers();
    const newUser = {
      id: `user_${Date.now()}`,
      fullName: registrationData.fullName,
      username: registrationData.username.trim(),
      email: registrationData.email.trim(),
      phone: registrationData.phone,
      dob: registrationData.dob,
      college: registrationData.college,
      degree: registrationData.degree,
      branch: registrationData.branch,
      academicYear: registrationData.academicYear,
      graduationYear: registrationData.graduationYear,
      technicalSkills: registrationData.technicalSkills || [],
      softSkills: registrationData.softSkills || [],
      interestedDomains: registrationData.interestedDomains || [],
      preferredRole: registrationData.preferredRole || 'frontend-developer',
      currentSkillLevel: registrationData.currentSkillLevel || 'Intermediate',
      linkedIn: registrationData.linkedIn || '',
      github: registrationData.github || '',
      projectsNotes: registrationData.projectsNotes || '',
      certificationsNotes: registrationData.certificationsNotes || '',
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this._saveUsers(users);

    // Automatically set session
    this.setSession(newUser);

    return {
      success: true,
      user: this._sanitizeUser(newUser),
      message: 'Account created successfully! Welcome to SkillSync AI.'
    };
  },

  // Simulate Sign In
  async signIn(identifier, password, rememberMe = true) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = this.getUsers();
    const cleanId = identifier.trim().toLowerCase();
    const expectedHash = hashPassword(password);

    const user = users.find(u => 
      (u.username?.toLowerCase() === cleanId || u.email?.toLowerCase() === cleanId) &&
      u.passwordHash === expectedHash
    );

    if (!user) {
      // Check if user exists but password mismatch for better feedback
      const idExists = users.some(u => u.username?.toLowerCase() === cleanId || u.email?.toLowerCase() === cleanId);
      if (idExists) {
        return { success: false, error: 'Incorrect password. Try DemoPass123! or use 1-Click Demo Login.' };
      }
      return { success: false, error: 'No account found with this username or email.' };
    }

    this.setSession(user, rememberMe);

    return {
      success: true,
      user: this._sanitizeUser(user),
      message: `Welcome back, ${user.fullName}!`
    };
  },

  // Set authenticated session in storage
  setSession(user, rememberMe = true) {
    const sessionData = {
      user: this._sanitizeUser(user),
      loggedInAt: new Date().toISOString(),
      rememberMe
    };
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    } catch (e) {
      console.error('Error saving session:', e);
    }
  },

  // Retrieve current active session
  getCurrentSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading session:', e);
    }
    return null;
  },

  // Sign out
  signOut() {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (e) {}
  },

  // Sanitize user object to never leak hash
  _sanitizeUser(user) {
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  },

  // Provide demo credentials for quick presentation login
  getDemoCredentials() {
    return {
      username: 'aarav',
      password: 'DemoPass123!',
      fullName: 'Aarav Sharma',
      role: 'Frontend Developer'
    };
  }
};
