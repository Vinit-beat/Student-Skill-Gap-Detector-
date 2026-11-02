// src/data/demoProfile.js
// Realistic demo profile for a 3rd-year CS student targeting Frontend Developer

export const DEMO_PROFILE = {
  name: "Demo Student",
  degree: "B.Tech",
  branch: "Computer Science",
  academicYear: "Third Year",
  targetRole: "frontend-developer",
  skills: [
    { name: "HTML5 & Modern CSS", level: 3, category: "Technical" }, // Matched (req: 3)
    { name: "JavaScript (ES6+)", level: 2, category: "Technical" }, // Needs Improvement (req: 3, student: 2) -> High Priority Gap
    { name: "React.js", level: 2, category: "Technical" }, // Needs Improvement (req: 3, student: 2) -> High Priority Gap
    { name: "Git & Version Control", level: 2, category: "Tools" }, // Matched (req: 2)
    { name: "SQL & Relational Databases (PostgreSQL)", level: 1, category: "Technical" }, // Student knows basic SQL
    { name: "Team Collaboration & Communication", level: 2, category: "Soft" }, // Matched (req: 2)
    { name: "UI/UX Design Fundamentals", level: 1, category: "Technical" }, // Needs Improvement (req: 2, student: 1) -> Low/Med Priority Gap
    // Missing for Frontend Developer: TypeScript (req: 2, weight: 3) -> High Priority
    // Missing: Web Performance & Optimization (req: 2, weight: 2) -> Med Priority
    // Missing: Testing & Debugging (req: 2, weight: 2) -> Med Priority
    // Missing: REST APIs & Async State (req: 2, weight: 2) -> Med Priority
  ],
  projects: [
    {
      id: 'p1',
      title: "Campus Events Discovery Portal",
      description: "Developed a single-page responsive React web application with client-side filtering, event categorization, and search functionality.",
      technologies: "React, Tailwind CSS, LocalStorage",
      link: "https://github.com/example/campus-events"
    },
    {
      id: 'p2',
      title: "Student Task & Grade Tracker",
      description: "Interactive dashboard displaying GPA projections, assignment deadlines, and progress bars with local storage state.",
      technologies: "JavaScript, HTML5, CSS3, Chart.js",
      link: "https://github.com/example/grade-tracker"
    }
  ],
  internships: [
    {
      id: 'i1',
      role: "Frontend Web Intern",
      organization: "TechSpark Digital Solutions",
      duration: "May 2024 - July 2024 (2 months)",
      highlights: "Assisted in migrating legacy HTML pages to responsive React functional components; improved mobile layout responsiveness."
    }
  ],
  certifications: [
    {
      id: 'c1',
      title: "Responsive Web Design Certification",
      issuer: "freeCodeCamp",
      issueDate: "Jan 2024",
      credentialUrl: "https://www.freecodecamp.org/certification/example/responsive-web-design"
    },
    {
      id: 'c2',
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      issueDate: "Aug 2024",
      credentialUrl: "https://www.freecodecamp.org/certification/example/javascript-algorithms"
    }
  ],
  resumeFile: {
    name: "Demo_Student_CS_Resume.pdf",
    size: "245 KB",
    uploadedAt: "Oct 2024"
  }
};
