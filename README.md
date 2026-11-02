# SkillSync AI – Student Skill Gap Detector

SkillSync AI is a polished, interactive, frontend-only web application built with **React 18**, **Vite**, and **Tailwind CSS**. It empowers college students to evaluate their skill readiness against industry job benchmarks, transparently diagnose gaps, and follow a personalized 4-week learning roadmap.

> **Academic Prototype Note:** 100% frontend-only. Operates locally with a deterministic rule-based algorithm and browser LocalStorage. Zero backend, MongoDB, or paid API keys required.

---

## 🌟 Key Features

### 1. Modern SaaS Authentication System (`/auth`)
- **Split-Screen Layout:** Responsive layout with brand illustration, AI analytics metrics preview, and mission statement on desktop; compact mobile header on smaller devices.
- **Sign In & Sign Up Tabs:** Smooth animated tab switching between sign-in and registration workflows.
- **Sign In Form (`SignInForm.jsx`):**
  - Username or Email input with real-time validation.
  - Password input with Show/Hide toggle.
  - "Remember me" session persistence.
  - "Forgot Password?" demo recovery dialog.
  - **1-Click Demo Login:** Instantly sign in as Aarav Sharma (3rd-year CS student) for college presentations.
- **Multi-Step Student Registration (`SignUpForm.jsx`):**
  - **Step 1 (Personal Details):** Full Name, Username, Email, Phone with country code, Date of Birth, Password with strength meter (Weak/Moderate/Good/Strong), Confirm Password matching.
  - **Step 2 (Academic Details):** College Name, Degree (B.Tech, B.E., BCA, etc.), Branch (CS, IT, AI/ML, etc.), Current Academic Year, Graduation Year.
  - **Step 3 (Skills & Interests):** Searchable multi-select technical skills (C++, Java, Python, React, SQL, etc.), soft skills chips, 10 selectable career tech domains (Web Dev, App Dev, AI/ML, Cloud, Cyber, etc.), preferred career role, and overall proficiency level.
  - **Step 4 (Review & Create Account):** Interactive summary with instant edit buttons for each section, optional LinkedIn/GitHub URLs and notes, and Terms & Conditions acceptance.
  - Seamlessly initializes the student profile into `AppContext` and redirects to the personalized dashboard!

### 2. Transparent Rule-Based Skill Gap Engine
- **8 Supported Industry Roles:**
  1. Frontend Developer
  2. Backend Developer
  3. Software Developer
  4. Data Analyst
  5. Data Scientist
  6. AI/ML Engineer
  7. Cybersecurity Analyst
  8. Cloud Engineer
- **Deterministic Mathematical Scoring:**
  - Proficiency levels: Missing (0), Beginner (1), Intermediate (2), Advanced (3).
  - Skill Gap: `skillGap = max(0, requiredLevel - currentLevel)`
  - Weighted Readiness Score:  
    $$\text{Readiness} = \left(\frac{\sum (\text{weight} \times \min(\text{currentLevel}, \text{requiredLevel}))}{\sum (\text{weight} \times \text{requiredLevel})}\right) \times 100$$
  - Objective Priority Assignment:
    - **High Priority:** Major gap in critical/important competency ($\text{gap} \ge 2, \text{weight} \ge 2$ or $\text{gap} \ge 1, \text{weight} = 3$).
    - **Medium Priority:** Moderate gap or lower-weight competency ($\text{gap} = 1, \text{weight} = 2$ or $\text{gap} \ge 2, \text{weight} = 1$).
    - **Low Priority:** Small gap in foundational or helpful skill ($\text{gap} = 1, \text{weight} = 1$).

### 3. Core Application Pages
1. **Landing Page (`/`):** Hero section, live student analytics preview, 4 engine capability cards, 3-step workflow, and role overview cards.
2. **Authentication Page (`/auth`):** SaaS split-screen login and multi-step registration.
3. **Student Profile & Skill Assessment (`/assessment`):** Academic details form, searchable skill selector, category tags, interactive proficiency buttons, project/internship/certification managers, resume upload preview, and "Load Demo Profile" button.
4. **Student Dashboard (`/dashboard`):** Real-time KPI cards (Readiness, Matched, Weak, Missing, Roadmap Progress), interactive Recharts bar chart comparing Current vs. Required proficiency, priority distribution pie chart, and top 3 recommended skills.
5. **Skill Gap Analysis (`/gap-analysis`):** Circular SVG readiness gauge, transparent mathematical formula breakdown, searchable and filterable skills table, status badges, priority badges, and role importance rationales.
6. **Personalized 4-Week Learning Roadmap (`/roadmap`):** Automatically distributes missing/weak skills across Weeks 1–4, prioritizing high-impact foundations first. Working status toggles (Not Started, In Progress, Completed), genuine verified free learning resources (MDN, freeCodeCamp, Harvard CS50, Kaggle), mini-projects, practice exercises, and persistent LocalStorage progress.
7. **Career Match Explorer (`/career-explorer`):** Ranks student readiness across all 8 industry tracks using the exact same weighted formula. Displays top strengths, critical gaps, requirements inspector modal, and instant 1-click role switching.
8. **Executive Skill Gap Report (`/report`):** Formal academic report view with student summary, metrics breakdown, printable PDF styles (`@media print`), and 1-click text and CSV export.

---

## 🛠️ Technology Stack
- **Framework:** React 18.3 (with Vite 5)
- **Routing:** React Router DOM 6
- **Styling:** Tailwind CSS 3 with custom SaaS color palette (Navy, Indigo, Electric Purple)
- **Charts & Data Viz:** Recharts (BarChart, PieChart, ResponsiveContainer)
- **Icons:** Lucide React
- **Persistence:** Browser LocalStorage API
- **Authentication Service:** Mock client-side `authService.js` with password hashing simulation and session persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm

### Installation & Development Run
```bash
# 1. Open the project directory
cd d:/ski

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory with code splitting.

---

## 🧪 Interactive Testing Walkthrough
1. **Try Authentication (`/auth`):**
   - Click **"Sign In"** in the navigation bar.
   - Use the **"1-Click Demo Student Sign In"** button to log in instantly as *Aarav Sharma* (`aarav` / `DemoPass123!`), or click **"Sign Up"** to test the 4-step student registration wizard.
   - Watch how the registration progress bar, password strength meter, searchable skills, and domain cards work.
2. **Inspect Dashboard Personalization (`/dashboard`):**
   - After signing in or registering, the dashboard reflects the student's name, degree, target career role, and calculated readiness score.
3. **Inspect Gap Analysis (`/gap-analysis`):**
   - View skills categorized into **Matched**, **Needs Improvement**, and **Missing**. Click "View Formula" to inspect the weighted formula.
4. **Track Roadmap Milestones (`/roadmap`):**
   - Mark tasks as *In Progress* or *Completed*. Progress updates dynamically and persists across browser refreshes via LocalStorage.
5. **Explore 8 Career Roles (`/career-explorer`):**
   - Benchmark against all 8 careers sorted by match percentage. Inspect requirements in the modal and switch roles with one click.
6. **Export Report (`/report`):**
   - Download the verified assessment as Text or CSV, or use "Print Report" for a clean printable layout.
