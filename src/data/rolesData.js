// src/data/rolesData.js
// Predefined dataset for the 8 supported career roles with skill requirements,
// numerical target proficiencies (1=Beginner, 2=Intermediate, 3=Advanced),
// importance weights (1 to 3), rationales, and curated free resources.

export const PROFICIENCY_LEVELS = {
  MISSING: 0,
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
};

export const PROFICIENCY_LABELS = {
  0: 'Not Specified',
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
};

export const CAREER_ROLES = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Web & UI Engineering',
    badge: 'Popular',
    iconName: 'Layout',
    shortDescription: 'Builds responsive, accessible, and performant user interfaces for web applications.',
    salaryRange: '$70,000 - $115,000',
    marketDemand: 'Very High',
    description: 'Frontend developers craft interactive user experiences across browsers using modern web standards, component frameworks, and state management.',
    skills: [
      {
        id: 'html-css',
        name: 'HTML5 & Modern CSS',
        category: 'Technical',
        requiredLevel: 3, // Advanced
        weight: 3, // Critical
        importanceReason: 'Foundational syntax for semantic markup, flexbox, CSS grid, and responsive layouts.',
        topics: ['Semantic HTML5', 'Flexbox & CSS Grid', 'CSS Variables & BEM', 'Accessibility (WCAG 2.1)'],
        practiceExercises: ['Build a 3-column responsive layout without frameworks', 'Audit and fix an inaccessible form using screen readers'],
        miniProject: 'Build a fully responsive SaaS pricing page with dark mode toggle',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'MDN Web Docs - CSS Layout', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout', provider: 'MDN', type: 'Documentation' },
          { title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', provider: 'freeCodeCamp', type: 'Course' }
        ]
      },
      {
        id: 'javascript',
        name: 'JavaScript (ES6+)',
        category: 'Technical',
        requiredLevel: 3, // Advanced
        weight: 3,
        importanceReason: 'Core programming language of the web; crucial for DOM manipulation, async operations, and logic.',
        topics: ['Closures & Scope', 'Promises & Async/Await', 'Event Loop & Callbacks', 'Array Methods & Destructuring'],
        practiceExercises: ['Implement a debounce and throttle utility from scratch', 'Fetch data from a public API with retry logic and error boundaries'],
        miniProject: 'Build an interactive Kanban board with drag-and-drop',
        estimatedHours: '12-14 hrs',
        resources: [
          { title: 'javascript.info - The Modern JavaScript Tutorial', url: 'https://javascript.info/', provider: 'JavaScript.info', type: 'Interactive Guide' },
          { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', provider: 'MDN', type: 'Documentation' }
        ]
      },
      {
        id: 'react',
        name: 'React.js',
        category: 'Technical',
        requiredLevel: 3, // Advanced
        weight: 3,
        importanceReason: 'Dominant declarative UI library; essential for component-driven modular architectures and state management.',
        topics: ['Hooks (useState, useEffect, useMemo, useCallback)', 'Custom Hooks', 'Context API & State Management', 'Component Lifecycle'],
        practiceExercises: ['Refactor prop drilling to React Context', 'Build a custom useFetch hook with caching and abort controller'],
        miniProject: 'E-commerce product catalog with multi-facet filtering and cart drawer',
        estimatedHours: '14-16 hrs',
        resources: [
          { title: 'React Official Documentation', url: 'https://react.dev/learn', provider: 'React.dev', type: 'Documentation' },
          { title: 'Scrimba - Learn React for Free', url: 'https://scrimba.com/learn/learnreact', provider: 'Scrimba', type: 'Interactive Course' }
        ]
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Technical',
        requiredLevel: 2, // Intermediate
        weight: 3,
        importanceReason: 'Adds compile-time type safety, eliminating runtime bugs and enabling scalable codebase collaboration.',
        topics: ['Interfaces vs Types', 'Generics & Utility Types', 'Typing React Props & State', 'Union & Intersection Types'],
        practiceExercises: ['Type an API response payload with nested optional properties', 'Convert a vanilla React component into strictly typed TypeScript'],
        miniProject: 'Build a typed Habit Tracker with localStorage persistence',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', provider: 'TypeScript Official', type: 'Handbook' },
          { title: 'Total TypeScript Beginners Tutorial', url: 'https://www.totaltypescript.com/tutorials', provider: 'Total TypeScript', type: 'Tutorial' }
        ]
      },
      {
        id: 'git-github',
        name: 'Git & Version Control',
        category: 'Tools',
        requiredLevel: 2, // Intermediate
        weight: 2,
        importanceReason: 'Industry standard for code versioning, team pull requests, branch management, and CI/CD triggers.',
        topics: ['Branching Strategies (GitFlow, Trunk)', 'Merge Conflicts Resolution', 'Interactive Rebase & Stashing', 'GitHub Pull Requests & Reviews'],
        practiceExercises: ['Simulate a merge conflict between two feature branches and resolve it', 'Squash 3 commits into 1 using interactive rebase'],
        miniProject: 'Set up an open-source GitHub repository with issue templates and PR checks',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', provider: 'Git SCM', type: 'Book' },
          { title: 'GitHub Skills Interactive Courses', url: 'https://skills.github.com/', provider: 'GitHub', type: 'Hands-on Labs' }
        ]
      },
      {
        id: 'web-performance',
        name: 'Web Performance & Optimization',
        category: 'Technical',
        requiredLevel: 2, // Intermediate
        weight: 2,
        importanceReason: 'Directly impacts user retention, conversion rates, and SEO through Core Web Vitals.',
        topics: ['Lighthouse Audits', 'Core Web Vitals (LCP, FID, CLS)', 'Code Splitting & Lazy Loading', 'Asset Optimization & Caching'],
        practiceExercises: ['Analyze a site with Lighthouse and fix all render-blocking scripts', 'Implement lazy loading for images with blur-up placeholders'],
        miniProject: 'Optimize an image-heavy landing page to score 95+ on Lighthouse',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'web.dev - Core Web Vitals', url: 'https://web.dev/vitals/', provider: 'Google Chrome', type: 'Guide' }
        ]
      },
      {
        id: 'testing-debugging',
        name: 'Testing & Debugging',
        category: 'Technical',
        requiredLevel: 2, // Intermediate
        weight: 2,
        importanceReason: 'Ensures UI reliability and prevents regressions using automated unit/component tests and DevTools.',
        topics: ['Chrome DevTools Profiling', 'Jest & React Testing Library', 'Mocking API calls', 'End-to-End Testing Basics'],
        practiceExercises: ['Write unit tests for a custom React hook', 'Mock an Axios API call and test error state display'],
        miniProject: 'Add 100% test coverage for a checkout calculation utility',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'Testing JavaScript with Kent C. Dodds', url: 'https://testingjavascript.com/', provider: 'Kent C. Dodds', type: 'Articles & Guides' }
        ]
      },
      {
        id: 'api-integration',
        name: 'REST APIs & Async State',
        category: 'Technical',
        requiredLevel: 2, // Intermediate
        weight: 2,
        importanceReason: 'Allows frontends to securely communicate with server endpoints, handle pagination, and manage error states.',
        topics: ['HTTP Methods & Status Codes', 'Fetch API / Axios', 'TanStack Query (React Query) / SWR', 'Token Authentication & Headers'],
        practiceExercises: ['Implement infinite scrolling with an API endpoint', 'Handle 401 unauthorized automatic redirect handling'],
        miniProject: 'Real-time weather forecast dashboard with location search',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'TanStack Query Quickstart', url: 'https://tanstack.com/query/latest/docs/framework/react/quick-start', provider: 'TanStack', type: 'Docs' }
        ]
      },
      {
        id: 'ui-ux-design',
        name: 'UI/UX Design Fundamentals',
        category: 'Technical',
        requiredLevel: 2, // Intermediate
        weight: 1,
        importanceReason: 'Enables developers to translate designs accurately and build intuitive, human-centered interfaces.',
        topics: ['Visual Hierarchy & Spacing', 'Color Contrast & Typography', 'Figma to Code workflows', 'Micro-interactions'],
        practiceExercises: ['Inspect a Figma design file and recreate exact tokens in Tailwind CSS', 'Redesign a confusing multi-step checkout form'],
        miniProject: 'Design and build a polished developer portfolio component library',
        estimatedHours: '5-6 hrs',
        resources: [
          { title: 'Refactoring UI (Sample Guidelines)', url: 'https://www.refactoringui.com/', provider: 'Tailwind Labs', type: 'Design Guide' }
        ]
      },
      {
        id: 'communication',
        name: 'Team Collaboration & Communication',
        category: 'Soft',
        requiredLevel: 2, // Intermediate
        weight: 2,
        importanceReason: 'Crucial for cross-functional teamwork with product managers, backend engineers, and UX designers.',
        topics: ['Technical Documentation', 'Agile & Scrum Standups', 'Constructive Code Reviews', 'Explaining Technical Constraints'],
        practiceExercises: ['Write an architecture decision record (ADR) for choosing React over Vue', 'Conduct a mock peer review on a pull request'],
        miniProject: 'Author a comprehensive README and contributing guide for an open source project',
        estimatedHours: '4-5 hrs',
        resources: [
          { title: 'Google Technical Writing One', url: 'https://developers.google.com/tech-writing/one', provider: 'Google', type: 'Course' }
        ]
      }
    ]
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Server & System Engineering',
    badge: 'In Demand',
    iconName: 'Server',
    shortDescription: 'Architects APIs, database schemas, business logic, and scalable server infrastructure.',
    salaryRange: '$75,000 - $125,000',
    marketDemand: 'Very High',
    description: 'Backend developers engineer high-availability server applications, reliable database architectures, and secure REST/GraphQL interfaces.',
    skills: [
      {
        id: 'node-python',
        name: 'Node.js or Python Backend',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Primary runtime or language for writing server processes, background workers, and business logic.',
        topics: ['Express / FastAPI frameworks', 'Event Loop & Concurrency', 'Middleware pipelines', 'Error handling strategies'],
        practiceExercises: ['Build a rate-limiting middleware from scratch', 'Create an asynchronous worker queue for sending transactional emails'],
        miniProject: 'Build a production-ready REST API with JWT authentication and RBAC',
        estimatedHours: '12-14 hrs',
        resources: [
          { title: 'The Odin Project - NodeJS Course', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', provider: 'The Odin Project', type: 'Full Course' },
          { title: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', provider: 'FastAPI Docs', type: 'Interactive Guide' }
        ]
      },
      {
        id: 'sql-databases',
        name: 'SQL & Relational Databases (PostgreSQL)',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'PostgreSQL/MySQL power mission-critical transactional data with ACID compliance and indexing.',
        topics: ['Normalization & Schema Design', 'Complex JOINs & Aggregations', 'Indexes & Query Optimization (EXPLAIN ANALYZE)', 'Transactions & Locking'],
        practiceExercises: ['Optimize a slow query using an index', 'Write a transaction that transfers funds between accounts with rollback'],
        miniProject: 'Design a multi-tenant relational schema for a SaaS billing platform',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', provider: 'PostgreSQL Tutorial', type: 'Guide' },
          { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', provider: 'Markus Winand', type: 'Book' }
        ]
      },
      {
        id: 'rest-api-design',
        name: 'RESTful API Architecture',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Defines clean, consistent contracts for frontends and external partners to consume securely.',
        topics: ['HTTP Spec & Status Codes', 'Pagination (Cursor vs Offset)', 'Versioning strategies', 'Idempotency & Caching headers'],
        practiceExercises: ['Design a complete OpenAPI 3.0 specification for an inventory service', 'Implement cursor-based pagination for high-volume logs'],
        miniProject: 'Build a public API with Swagger documentation and rate limiting',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'RESTful API Guidelines', url: 'https://opensource.zalando.com/restful-api-guidelines/', provider: 'Zalando', type: 'Standards' }
        ]
      },
      {
        id: 'nosql-redis',
        name: 'NoSQL & Redis Caching',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Redis provides sub-millisecond in-memory caching and session storage for high-load systems.',
        topics: ['Redis Data Structures (Strings, Hashes, Sets)', 'Cache Invalidation strategies (Cache-Aside, Write-Through)', 'MongoDB / Document Stores'],
        practiceExercises: ['Implement a Redis-backed session store', 'Build a distributed lock using Redis'],
        miniProject: 'Real-time leaderboard system with Redis sorted sets',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'Redis University (Free Courses)', url: 'https://university.redis.com/', provider: 'Redis', type: 'Interactive Course' }
        ]
      },
      {
        id: 'auth-security',
        name: 'Authentication & Web Security',
        category: 'Technical',
        requiredLevel: 2,
        weight: 3,
        importanceReason: 'Protects user data against OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, insecure tokens).',
        topics: ['OAuth2 & OIDC flows', 'JWT vs Session Cookies', 'Password Hashing (Argon2/Bcrypt)', 'OWASP Top 10 mitigation'],
        practiceExercises: ['Implement refresh token rotation securely', 'Sanitize user input to neutralize SQL injection vulnerabilities'],
        miniProject: 'Secure Authentication Microservice with email verification and password reset',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'OWASP Top Ten Web Application Security Risks', url: 'https://owasp.org/www-project-top-ten/', provider: 'OWASP', type: 'Security Standard' }
        ]
      },
      {
        id: 'docker-containers',
        name: 'Docker & Containerization',
        category: 'Tools',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Ensures application parity across development, staging, and production container environments.',
        topics: ['Dockerfile best practices', 'Multi-stage builds', 'Docker Compose for local dev', 'Container networking'],
        practiceExercises: ['Create a multi-stage Dockerfile that reduces image size by 70%', 'Spin up an API, PostgreSQL, and Redis stack with docker-compose'],
        miniProject: 'Containerize a microservice stack with automated health checks',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'Docker Official Getting Started', url: 'https://docs.docker.com/get-started/', provider: 'Docker', type: 'Documentation' }
        ]
      },
      {
        id: 'system-design',
        name: 'System Design & Scalability',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Enables backend engineers to design systems that handle millions of users and terabytes of data.',
        topics: ['Load Balancing & Reverse Proxies (Nginx)', 'Microservices vs Monoliths', 'Message Queues (Kafka / RabbitMQ)', 'CAP Theorem & Database Sharding'],
        practiceExercises: ['Design a URL shortener system on an architectural diagram', 'Calculate bandwidth and storage requirements for a photo-sharing app'],
        miniProject: 'Architect an asynchronous image processing pipeline with message queues',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', provider: 'GitHub / Donne Martin', type: 'Open Source Guide' }
        ]
      },
      {
        id: 'git-github',
        name: 'Git & Version Control',
        category: 'Tools',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Essential for collaborating on server codebases and managing automated deployment hooks.',
        topics: ['Branching', 'Merge Conflicts', 'Interactive Rebase', 'Release Tagging'],
        practiceExercises: ['Handle upstream syncs and resolve conflicts cleanly'],
        miniProject: 'Configure automated release notes generation via Git tags',
        estimatedHours: '4-5 hrs',
        resources: [
          { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', provider: 'Git SCM', type: 'Book' }
        ]
      },
      {
        id: 'problem-solving',
        name: 'Problem Solving & Algorithmic Thinking',
        category: 'Soft',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Critical for optimizing time/space complexity and designing efficient server algorithms.',
        topics: ['Data Structures (Hash Maps, Trees, Graphs)', 'Algorithm Complexity (Big-O)', 'Debugging complex memory leaks'],
        practiceExercises: ['Solve 10 LeetCode Medium data structure problems focusing on hashing and two pointers'],
        miniProject: 'Implement an in-memory LRU cache with O(1) get and put operations',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap', provider: 'NeetCode', type: 'Practice Roadmap' }
        ]
      }
    ]
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Core Software Engineering',
    badge: 'Foundational',
    iconName: 'Code',
    shortDescription: 'Builds reliable, modular software systems utilizing strong OOP, algorithms, and full-stack practices.',
    salaryRange: '$75,000 - $120,000',
    marketDemand: 'Very High',
    description: 'Generalist software developers build end-to-end applications, apply clean architectural patterns, and write robust, maintainable code.',
    skills: [
      {
        id: 'core-languages',
        name: 'Core Language (Java / C++ / C# / Python)',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Foundational language proficiency required for enterprise systems, performance, and type safety.',
        topics: ['Object-Oriented Programming (OOP)', 'Generics & Collections', 'Memory Management', 'Concurrency & Multithreading'],
        practiceExercises: ['Implement a multi-threaded producer-consumer queue', 'Refactor procedural code to adhere to SOLID principles'],
        miniProject: 'Build a command-line banking system with persistent state and transactions',
        estimatedHours: '12-14 hrs',
        resources: [
          { title: 'Java Programming MOOC', url: 'https://java-programming.mooc.fi/', provider: 'University of Helsinki', type: 'Full Course' },
          { title: 'Microsoft C# Documentation', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', provider: 'Microsoft', type: 'Docs' }
        ]
      },
      {
        id: 'data-structures-algorithms',
        name: 'Data Structures & Algorithms',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Core foundation for technical interviews, writing efficient code, and understanding complexity trade-offs.',
        topics: ['Arrays, Linked Lists & Trees', 'Sorting & Binary Search', 'Graph Traversals (BFS, DFS)', 'Dynamic Programming basics'],
        practiceExercises: ['Implement Trie prefix tree for auto-completion', 'Find shortest path in a weighted graph using Dijkstra'],
        miniProject: 'Build an algorithmic pathfinding visualizer',
        estimatedHours: '15-20 hrs',
        resources: [
          { title: 'CS50 Introduction to Computer Science', url: 'https://cs50.harvard.edu/x/', provider: 'Harvard University', type: 'Course' },
          { title: 'Algorithms by Sedgewick & Wayne', url: 'https://algs4.cs.princeton.edu/home/', provider: 'Princeton University', type: 'Book & Exercises' }
        ]
      },
      {
        id: 'sql-databases',
        name: 'SQL & Database Design',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Enables querying, relational modelling, and persisting core application data integrity.',
        topics: ['Relational Schema Design', 'Joins & Subqueries', 'Indexes & Primary/Foreign Keys'],
        practiceExercises: ['Write nested subqueries for sales reporting', 'Normalize a denormalized spreadsheet to 3NF'],
        miniProject: 'Design the relational schema for a university course registration platform',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'SQLBolt - Learn SQL Interactively', url: 'https://sqlbolt.com/', provider: 'SQLBolt', type: 'Interactive Tutorial' }
        ]
      },
      {
        id: 'oop-design-patterns',
        name: 'OOP & Design Patterns',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Prevents spaghetti code by applying industry-proven architectural patterns (Factory, Strategy, Observer).',
        topics: ['SOLID Principles', 'Creational Patterns (Singleton, Factory)', 'Structural Patterns (Adapter, Decorator)', 'Behavioral Patterns (Observer, Strategy)'],
        practiceExercises: ['Refactor conditional logic using the Strategy pattern', 'Implement an event-driven observer system'],
        miniProject: 'Build an extensible plug-in notification system (Email, SMS, Slack)',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'Refactoring Guru - Design Patterns', url: 'https://refactoring.guru/design-patterns', provider: 'Refactoring Guru', type: 'Visual Guide' }
        ]
      },
      {
        id: 'git-github',
        name: 'Git & Version Control',
        category: 'Tools',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Crucial for team collaboration, code reviews, and tracking bug regressions.',
        topics: ['Commit hygiene', 'Branching & Rebasing', 'PR reviews'],
        practiceExercises: ['Maintain a clean git log across multiple feature branches'],
        miniProject: 'Contribute a bug fix to an open source GitHub repository',
        estimatedHours: '4-6 hrs',
        resources: [
          { title: 'Git Official Documentation', url: 'https://git-scm.com/doc', provider: 'Git', type: 'Docs' }
        ]
      },
      {
        id: 'software-testing',
        name: 'Unit Testing & CI/CD Basics',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Ensures software quality, continuous delivery, and regression protection.',
        topics: ['JUnit / PyTest / NUnit', 'Test-Driven Development (TDD)', 'GitHub Actions workflow basics', 'Code Coverage metrics'],
        practiceExercises: ['Write unit tests with edge case boundaries for a financial calculator', 'Create a GitHub Action that runs tests on every commit'],
        miniProject: 'Set up an automated CI workflow that tests and builds an application binary',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', provider: 'GitHub', type: 'Documentation' }
        ]
      },
      {
        id: 'problem-solving',
        name: 'Analytical Problem Solving',
        category: 'Soft',
        requiredLevel: 3,
        weight: 2,
        importanceReason: 'Ability to dissect ambiguous technical requirements and formulate modular solutions.',
        topics: ['Root Cause Analysis', 'Decomposition of Complex Problems', 'Edge Case Anticipation'],
        practiceExercises: ['Debug a cryptic production stack trace using logs'],
        miniProject: 'Write a comprehensive technical design doc resolving a complex feature request',
        estimatedHours: '5-6 hrs',
        resources: [
          { title: 'Coursera - Creative Problem Solving', url: 'https://www.coursera.org/learn/creative-problem-solving', provider: 'Coursera / Univ of Minnesota', type: 'Free Audit Course' }
        ]
      },
      {
        id: 'communication',
        name: 'Technical Communication & Teamwork',
        category: 'Soft',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Translating business logic into technical specs and aligning across multidisciplinary teams.',
        topics: ['Clear documentation', 'Daily standup communication', 'Pair programming'],
        practiceExercises: ['Explain a technical bug in simple terms to a non-technical stakeholder'],
        miniProject: 'Create clear architecture diagrams and API specs for a capstone project',
        estimatedHours: '4-5 hrs',
        resources: [
          { title: 'Google Technical Writing Two', url: 'https://developers.google.com/tech-writing/two', provider: 'Google', type: 'Guide' }
        ]
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    badge: 'High Growth',
    iconName: 'BarChart2',
    shortDescription: 'Transforms raw numbers into actionable business insights through SQL, dashboards, and storytelling.',
    salaryRange: '$65,000 - $105,000',
    marketDemand: 'High',
    description: 'Data analysts query structured databases, build interactive business intelligence dashboards, and communicate trends to executive stakeholders.',
    skills: [
      {
        id: 'sql-advanced',
        name: 'Advanced SQL Querying',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'The absolute daily driver for extracting, cleaning, and aggregating company datasets.',
        topics: ['Window Functions (ROW_NUMBER, RANK, LEAD, LAG)', 'Common Table Expressions (CTEs)', 'Pivot Tables & Conditional Aggregation', 'Query Performance tuning'],
        practiceExercises: ['Calculate 7-day rolling revenue averages using window functions', 'Analyze monthly user retention cohorts using CTEs'],
        miniProject: 'Build a comprehensive customer churn analysis report in SQL',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'Mode Analytics Advanced SQL Guide', url: 'https://mode.com/sql-tutorial/introduction-to-advanced-sql/', provider: 'Mode', type: 'Interactive Tutorial' },
          { title: 'StrataScratch SQL Practice', url: 'https://www.stratascratch.com/', provider: 'StrataScratch', type: 'Practice Platform' }
        ]
      },
      {
        id: 'bi-dashboards',
        name: 'BI Tools (Power BI / Tableau)',
        category: 'Tools',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Translates complex queries into intuitive executive dashboards that guide business strategy.',
        topics: ['Data Modeling & Star Schemas', 'Calculated Fields & DAX / LOD Expressions', 'Interactive Drill-downs & Filters', 'Dashboard UI/UX Principles'],
        practiceExercises: ['Create a dynamic KPI sales card with drill-down by region and quarter', 'Build an executive summary view with custom date range slicers'],
        miniProject: 'Deliver an interactive SaaS executive metrics dashboard with Power BI / Tableau Public',
        estimatedHours: '10-14 hrs',
        resources: [
          { title: 'Microsoft Power BI Guided Learning', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', provider: 'Microsoft', type: 'Course' },
          { title: 'Tableau Public Free Training Videos', url: 'https://www.tableau.com/learn/training/20224', provider: 'Tableau', type: 'Video Series' }
        ]
      },
      {
        id: 'python-pandas',
        name: 'Python for Data Analysis (Pandas, NumPy)',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Automates data wrangling, advanced statistical calculations, and handles dirty data at scale.',
        topics: ['Pandas DataFrames & Series', 'Handling Missing Values & Outliers', 'Grouping & Merging Data', 'NumPy vectorization'],
        practiceExercises: ['Clean an untidy dataset with inconsistent date formats and null values', 'Perform exploratory data analysis on a 50,000-row retail dataset'],
        miniProject: 'Automated data pipeline script that cleans and summarizes weekly sales spreadsheets',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'Kaggle Pandas Micro-Course', url: 'https://www.kaggle.com/learn/pandas', provider: 'Kaggle', type: 'Interactive Course' },
          { title: '10 Minutes to Pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', provider: 'Pandas Docs', type: 'Quickstart' }
        ]
      },
      {
        id: 'excel-advanced',
        name: 'Advanced Excel & Spreadsheets',
        category: 'Tools',
        requiredLevel: 3,
        weight: 2,
        importanceReason: 'Universal corporate language for quick financial modelling, ad-hoc analysis, and stakeholder reporting.',
        topics: ['XLOOKUP & INDEX/MATCH', 'Pivot Tables & Slicers', 'Nested Logical Formulas (IF, AND, IFS)', 'Data Validation & Macro Basics'],
        practiceExercises: ['Build a dynamic cash flow scenario model with sensitivity variables', 'Reconcile two mismatched transaction logs using XLOOKUP and fuzzy matching'],
        miniProject: 'Financial forecasting model with automated variance analysis',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'Excel Easy - Advanced Excel Tutorials', url: 'https://www.excel-easy.com/', provider: 'Excel Easy', type: 'Guides' }
        ]
      },
      {
        id: 'statistics-basics',
        name: 'Applied Business Statistics',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Ensures data interpretations are statistically sound and distinguishes true signal from random noise.',
        topics: ['Mean, Median, Standard Deviation & Variance', 'Distributions & Percentiles', 'Correlation vs Causation', 'A/B Testing & Hypothesis Testing'],
        practiceExercises: ['Determine whether a website conversion increase is statistically significant with a t-test', 'Calculate confidence intervals for customer satisfaction scores'],
        miniProject: 'A/B test statistical analysis report for an e-commerce checkout redesign',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'Khan Academy Statistics and Probability', url: 'https://www.khanacademy.org/math/statistics-probability', provider: 'Khan Academy', type: 'Course' }
        ]
      },
      {
        id: 'data-storytelling',
        name: 'Data Storytelling & Presentation',
        category: 'Soft',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Insights are useless unless stakeholders understand the story and act on the findings.',
        topics: ['Executive Slide Deck Creation', 'Visual Contrast & Clutter Elimination', 'Presenting Findings to Non-Technical Audiences'],
        practiceExercises: ['Summarize a 30-page analytics report into 3 actionable executive slides', 'Present recommendations on reducing customer churn to a mock board'],
        miniProject: 'Recorded 5-minute video presentation walking through a business case analysis',
        estimatedHours: '5-6 hrs',
        resources: [
          { title: 'Storytelling with Data Free Resources', url: 'https://www.storytellingwithdata.com/resources', provider: 'Storytelling with Data', type: 'Articles & Videos' }
        ]
      },
      {
        id: 'critical-thinking',
        name: 'Business Acumen & Critical Thinking',
        category: 'Soft',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Helps formulate the right business questions before writing any code or SQL queries.',
        topics: ['Key Performance Indicators (LTV, CAC, MRR)', 'Funnel Optimization', 'Root Cause Decomposition'],
        practiceExercises: ['Identify 3 root causes why user engagement dropped 15% after a product launch'],
        miniProject: 'Define a complete metrics framework for a new mobile subscription app',
        estimatedHours: '4-6 hrs',
        resources: [
          { title: 'Harvard Business Review Analytics Articles', url: 'https://hbr.org/topic/subject/data', provider: 'HBR', type: 'Reading List' }
        ]
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Machine Learning',
    badge: 'Advanced',
    iconName: 'TrendingUp',
    shortDescription: 'Applies statistical modeling, predictive algorithms, and experimental design to extract deep insights.',
    salaryRange: '$85,000 - $140,000',
    marketDemand: 'High',
    description: 'Data scientists combine rigorous mathematics, machine learning models, and big data processing to forecast outcomes and optimize business decisions.',
    skills: [
      {
        id: 'python-datasci',
        name: 'Python for Data Science (NumPy, Scipy, Pandas)',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Primary ecosystem for mathematical modeling, vectorized operations, and scientific computing.',
        topics: ['Advanced Vectorization', 'Statistical Functions with SciPy', 'Data wrangling & Feature Engineering', 'Jupyter Lab workflow'],
        practiceExercises: ['Implement custom matrix multiplication using NumPy vectors', 'Engineer interaction features and polynomial terms for tabular data'],
        miniProject: 'Exploratory data analysis and feature engineering pipeline on Kaggle housing dataset',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', provider: 'Jake VanderPlas / O’Reilly', type: 'Open Access Book' }
        ]
      },
      {
        id: 'ml-algorithms',
        name: 'Machine Learning Algorithms (Scikit-Learn)',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Core toolkit for classification, regression, clustering, and tree-based ensemble methods (XGBoost).',
        topics: ['Linear & Logistic Regression', 'Decision Trees, Random Forests, XGBoost', 'Model Evaluation (ROC-AUC, F1, RMSE)', 'Cross-Validation & Hyperparameter Tuning'],
        practiceExercises: ['Tune an XGBoost classifier with Stratified K-Fold to prevent data leakage', 'Compare unsupervised clustering algorithms (K-Means vs DBSCAN) on customer segments'],
        miniProject: 'End-to-end customer loan default prediction model with feature importance evaluation',
        estimatedHours: '14-16 hrs',
        resources: [
          { title: 'Scikit-Learn Official User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', provider: 'Scikit-Learn', type: 'Documentation' },
          { title: 'StatQuest with Josh Starmer - Machine Learning', url: 'https://statquest.org/video-index/', provider: 'StatQuest', type: 'Video Guide' }
        ]
      },
      {
        id: 'math-stats',
        name: 'Advanced Statistics & Probability',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Fundamental theory underlying loss functions, gradient descent, sampling bias, and confidence intervals.',
        topics: ['Probability Distributions', 'Bayes Theorem & Maximum Likelihood', 'Hypothesis Testing & Power Analysis', 'Linear Algebra (Eigenvalues, PCA)'],
        practiceExercises: ['Derive linear regression parameters analytically using ordinary least squares', 'Calculate required sample size for an A/B test with 80% statistical power'],
        miniProject: 'Implement Principal Component Analysis (PCA) dimensionality reduction from scratch',
        estimatedHours: '12-14 hrs',
        resources: [
          { title: 'MIT 18.650 Statistics for Applications', url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/', provider: 'MIT OpenCourseWare', type: 'Course' }
        ]
      },
      {
        id: 'sql-querying',
        name: 'SQL & Data Warehousing (BigQuery / Snowflake)',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Enables querying terabyte-scale enterprise data marts to build training datasets.',
        topics: ['Complex JOINs & CTEs', 'Window Functions', 'Partitioning & Clustering in Cloud Warehouses'],
        practiceExercises: ['Write an analytical query aggregating daily active user cohorts across 10 million rows'],
        miniProject: 'Extract and assemble clean training dataset from a star schema database',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'Google BigQuery Documentation', url: 'https://cloud.google.com/bigquery/docs', provider: 'Google Cloud', type: 'Docs' }
        ]
      },
      {
        id: 'data-visualization',
        name: 'Data Visualization (Matplotlib, Seaborn, Plotly)',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Visualizes model residuals, distribution skewness, correlation heatmaps, and ROC curves.',
        topics: ['Correlation Matrices & Heatmaps', 'Pairplots & Distribution Curves', 'Interactive Plotly charts', 'Customizing axes & legends'],
        practiceExercises: ['Plot model calibration curves and confusion matrices with custom styling'],
        miniProject: 'Interactive web-based model performance dashboard using Plotly Dash or Streamlit',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'Seaborn Tutorial', url: 'https://seaborn.pydata.org/tutorial.html', provider: 'Seaborn', type: 'Documentation' }
        ]
      },
      {
        id: 'experiment-design',
        name: 'Experimentation & A/B Testing',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Rigorously proves causal impact of algorithm changes before rolling out to 100% of users.',
        topics: ['Randomized Controlled Trials', 'P-hacking avoidance & Bonferroni correction', 'CUPED variance reduction', 'Sample Ratio Mismatch (SRM) checks'],
        practiceExercises: ['Detect Sample Ratio Mismatch in an experimental user allocation table'],
        miniProject: 'Design a full A/B testing experiment protocol for a recommendation system update',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'Trustworthy Online Controlled Experiments (Summary)', url: 'https://experimentguide.com/', provider: 'Ron Kohavi', type: 'Reference' }
        ]
      },
      {
        id: 'communication-business',
        name: 'Translating Science to Business Value',
        category: 'Soft',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Converts complex mathematical metrics like F1 or Gini coefficient into dollar savings and revenue growth.',
        topics: ['Cost-Benefit Matrix of False Positives vs False Negatives', 'Executive summary presentation'],
        practiceExercises: ['Explain how a 2% improvement in model recall will increase bottom-line revenue'],
        miniProject: 'One-page executive memo proposing a production fraud detection model',
        estimatedHours: '4-6 hrs',
        resources: [
          { title: 'Fast.ai - Communicating Data Science Findings', url: 'https://www.fast.ai/', provider: 'Fast.ai', type: 'Article' }
        ]
      }
    ]
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    category: 'Artificial Intelligence & Systems',
    badge: 'Trending',
    iconName: 'Cpu',
    shortDescription: 'Builds, fine-tunes, and deploys deep learning models, LLMs, and real-time inference pipelines.',
    salaryRange: '$90,000 - $155,000',
    marketDemand: 'Extremely High',
    description: 'AI & Machine Learning Engineers bridge the gap between machine learning algorithms and production infrastructure, deploying PyTorch models, LLM pipelines, and vector databases.',
    skills: [
      {
        id: 'deep-learning-pytorch',
        name: 'Deep Learning & PyTorch',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'De-facto industry standard framework for training neural networks, transformers, and vision models.',
        topics: ['Tensors & Autograd', 'CNNs, RNNs & Transformers', 'Custom Datasets & DataLoaders', 'GPU Acceleration & Mixed Precision (CUDA)'],
        practiceExercises: ['Build a convolutional neural network on CIFAR-10 achieving 85%+ accuracy', 'Write a custom PyTorch training loop with gradient clipping and learning rate warmup'],
        miniProject: 'Train and evaluate a transfer-learning image classifier using PyTorch and Torchvision',
        estimatedHours: '16-18 hrs',
        resources: [
          { title: 'Deep Learning with PyTorch: A 60 Minute Blitz', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', provider: 'PyTorch Official', type: 'Tutorial' },
          { title: 'fast.ai - Practical Deep Learning for Coders', url: 'https://course.fast.ai/', provider: 'fast.ai', type: 'Full Course' }
        ]
      },
      {
        id: 'llm-nlp-genai',
        name: 'LLMs, RAG & NLP Architectures',
        category: 'Technical',
        requiredLevel: 2,
        weight: 3,
        importanceReason: 'Generative AI and Retrieval Augmented Generation power modern enterprise conversational and search agents.',
        topics: ['Transformer Self-Attention Mechanism', 'Embeddings & Vector Databases (Chroma/Pinecone)', 'Retrieval-Augmented Generation (RAG)', 'Prompt Engineering & LangChain / LlamaIndex'],
        practiceExercises: ['Chunk documents, generate vector embeddings, and perform similarity search', 'Build a RAG question-answering chain with hallucination guardrails'],
        miniProject: 'Build a private Document Search & QA bot over custom PDFs using embeddings and RAG',
        estimatedHours: '12-14 hrs',
        resources: [
          { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', provider: 'Hugging Face', type: 'Interactive Course' },
          { title: 'Jay Alammar - The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', provider: 'Jay Alammar', type: 'Illustrated Guide' }
        ]
      },
      {
        id: 'mlops-deployment',
        name: 'MLOps & Model Serving',
        category: 'Technical',
        requiredLevel: 2,
        weight: 3,
        importanceReason: 'Takes models out of notebooks into reliable, low-latency microservices with automated monitoring.',
        topics: ['FastAPI model inference endpoints', 'Dockerizing PyTorch/ONNX models', 'MLflow / Weights & Biases tracking', 'Data Drift & Model Monitoring'],
        practiceExercises: ['Serve a PyTorch model behind a high-throughput async FastAPI server', 'Export a heavy model to ONNX runtime and measure 3x latency reduction'],
        miniProject: 'End-to-end containerized model inference API with Prometheus latency metrics',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'Made With ML - MLOps Course', url: 'https://madewithml.com/', provider: 'Goku Mohandas', type: 'Complete Guide' }
        ]
      },
      {
        id: 'python-advanced',
        name: 'Advanced Python & Software Engineering',
        category: 'Technical',
        requiredLevel: 3,
        weight: 2,
        importanceReason: 'Clean code, type annotations, unit tests, and performance profiling are required for production ML.',
        topics: ['Type Hinting (Pydantic / Mypy)', 'Generators & Iterators for Large Data', 'Multiprocessing & Concurrency', 'Object-Oriented Architecture for ML pipelines'],
        practiceExercises: ['Write memory-efficient streaming data generators for 10GB datasets', 'Profile Python code bottlenecks using cProfile and Line Profiler'],
        miniProject: 'Refactor an experimental Jupyter notebook into a clean, testable Python package',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'Real Python Tutorials', url: 'https://realpython.com/', provider: 'Real Python', type: 'Articles' }
        ]
      },
      {
        id: 'math-linear-algebra',
        name: 'Linear Algebra & Calculus for ML',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Understands backpropagation derivatives, gradient descent optimizers, and tensor transformations.',
        topics: ['Matrix Multiplications & Inverses', 'Partial Derivatives & Chain Rule', 'Loss Function gradients (Cross-Entropy, MSE)', 'SVD & Dimensionality Reduction'],
        practiceExercises: ['Compute the partial gradients of a 2-layer perceptron by hand and in code'],
        miniProject: 'Build a mini autograd engine like micrograd from scratch',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: '3Blue1Brown - Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', provider: '3Blue1Brown', type: 'Visual Video Series' }
        ]
      },
      {
        id: 'git-docker',
        name: 'Git & Docker for ML',
        category: 'Tools',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Ensures reproducibility in training environments across local GPUs and cloud clusters.',
        topics: ['Git LFS / DVC (Data Version Control)', 'GPU-enabled Docker (nvidia-docker)', 'Environment lockfiles'],
        practiceExercises: ['Build a CUDA-enabled Docker container that runs PyTorch on GPU'],
        miniProject: 'Containerized training job pipeline with DVC tracking dataset versions',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'DVC (Data Version Control) Getting Started', url: 'https://dvc.org/doc/start', provider: 'Iterative.ai', type: 'Docs' }
        ]
      },
      {
        id: 'problem-formulation',
        name: 'AI Problem Formulation & Ethics',
        category: 'Soft',
        requiredLevel: 2,
        weight: 1,
        importanceReason: 'Ensures algorithmic fairness, privacy compliance, and proper framing of business problems as ML objectives.',
        topics: ['Algorithmic Bias & Fairness metrics', 'Data privacy (GDPR / HIPAA)', 'Framing business objectives into loss functions'],
        practiceExercises: ['Audit a loan classifier for demographic parity bias and propose reweighting'],
        miniProject: 'Write an AI ethics impact assessment for an automated hiring resume parser',
        estimatedHours: '4-5 hrs',
        resources: [
          { title: 'Google AI Principles & Responsible AI Practices', url: 'https://ai.google/responsibility/principles/', provider: 'Google', type: 'Guidelines' }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security & Compliance',
    badge: 'Critical Need',
    iconName: 'Shield',
    shortDescription: 'Defends computer systems, networks, and applications against unauthorized access and cyber threats.',
    salaryRange: '$75,000 - $125,000',
    marketDemand: 'High',
    description: 'Cybersecurity analysts monitor security operations centers (SOC), perform vulnerability assessments, investigate security incidents, and harden infrastructure.',
    skills: [
      {
        id: 'networking-protocols',
        name: 'Computer Networks & Protocols',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Understanding the OSI model, TCP/IP, DNS, ARP, and packet flows is essential to detect network intrusions.',
        topics: ['OSI 7 Layers & TCP/IP stack', 'Packet Analysis with Wireshark', 'Subnetting & Routing (IPv4, IPv6)', 'DNS, DHCP, TLS/SSL Handshake inspection'],
        practiceExercises: ['Analyze a PCAP file in Wireshark to locate cleartext credentials', 'Trace and diagnose a DNS spoofing attack in a lab'],
        miniProject: 'Capture and decode live network traffic to identify suspicious outbound beacons',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'Professor Messer CompTIA Network+ Training', url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-training-course/', provider: 'Professor Messer', type: 'Free Video Course' },
          { title: 'Wireshark User Guide', url: 'https://www.wireshark.org/docs/wsug_html_chunked/', provider: 'Wireshark Foundation', type: 'Documentation' }
        ]
      },
      {
        id: 'security-fundamentals',
        name: 'Security Fundamentals & SIEM',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Core knowledge of CIA triad, attack vectors, defense in depth, and Security Information and Event Management (SIEM).',
        topics: ['CIA Triad & Defense-in-Depth', 'SIEM Operations (Splunk, Elastic SIEM)', 'Log Analysis (Windows Event Logs, Syslog)', 'Threat Intelligence & MITRE ATT&CK Framework'],
        practiceExercises: ['Write Splunk queries to detect brute-force SSH attempts', 'Map a real-world ransomware attack scenario to the MITRE ATT&CK matrix'],
        miniProject: 'Build a home lab SIEM with Elastic/Wazuh and alert on unauthorized admin logins',
        estimatedHours: '12-14 hrs',
        resources: [
          { title: 'TryHackMe - SOC Level 1 Path', url: 'https://tryhackme.com/path/outline/soclevel1', provider: 'TryHackMe', type: 'Hands-on Labs' },
          { title: 'MITRE ATT&CK Matrix', url: 'https://attack.mitre.org/', provider: 'MITRE', type: 'Knowledge Base' }
        ]
      },
      {
        id: 'vulnerability-assessment',
        name: 'Vulnerability Assessment & Penetration Testing Basics',
        category: 'Technical',
        requiredLevel: 2,
        weight: 3,
        importanceReason: 'Identifies software flaws, misconfigurations, and outdated services before malicious hackers exploit them.',
        topics: ['Nmap Port Scanning & Service Enumeration', 'Vulnerability Scanners (Nessus, OpenVAS)', 'OWASP Top 10 Web Vulnerabilities', 'Burp Suite Basics'],
        practiceExercises: ['Perform a stealth Nmap scan to identify unpatched services on a test VM', 'Intercept and tamper with HTTP requests using Burp Suite Proxy'],
        miniProject: 'Perform a comprehensive vulnerability scan of a test web application and draft an executive remediation report',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'OverTheWire - Bandit Wargame', url: 'https://overthewire.org/wargames/bandit/', provider: 'OverTheWire', type: 'Interactive Security Challenge' },
          { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', provider: 'PortSwigger', type: 'Free Interactive Labs' }
        ]
      },
      {
        id: 'linux-command-line',
        name: 'Linux Administration & Bash Scripting',
        category: 'Tools',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Most servers and security tools (Kali Linux, Parrot OS) operate in Linux environments.',
        topics: ['Linux File Permissions (chmod, chown)', 'Process Monitoring (ps, top, netstat)', 'Bash Scripting for Log Parsing (grep, awk, sed)', 'SSH hardening'],
        practiceExercises: ['Write a bash script that parses /var/log/auth.log and counts failed attempts by IP', 'Audit and fix setuid/setgid privilege escalation vectors on a Linux box'],
        miniProject: 'Automated Linux security baseline audit script',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'Linux Journey', url: 'https://linuxjourney.com/', provider: 'Linux Journey', type: 'Interactive Tutorials' }
        ]
      },
      {
        id: 'cryptography-pki',
        name: 'Applied Cryptography & PKI',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Guarantees confidentiality and integrity via symmetric/asymmetric encryption, hashing, and digital certificates.',
        topics: ['Symmetric (AES) vs Asymmetric (RSA, ECC)', 'Hashing (SHA-256) & Salted Hashes', 'Public Key Infrastructure (PKI) & SSL Certificates', 'Digital Signatures'],
        practiceExercises: ['Generate and sign a custom SSL certificate using OpenSSL', 'Verify digital signatures on software binaries'],
        miniProject: 'Build a secure file encryptor and decryptor CLI utility using AES-GCM',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'Crypto101 - A Free Beginner Cryptography Guide', url: 'https://www.crypto101.io/', provider: 'Crypto 101', type: 'Book' }
        ]
      },
      {
        id: 'incident-response',
        name: 'Incident Response & Digital Forensics',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Provides containment, eradication, and post-mortem evidence recovery when breaches happen.',
        topics: ['NIST Incident Response Lifecycle (Prepare, Detect, Contain, Eradicate, Recover)', 'Memory & Disk Imaging Basics', 'Chain of Custody procedures'],
        practiceExercises: ['Extract browser history and suspicious scheduled tasks from a simulated infected machine'],
        miniProject: 'Author a simulated Incident Response Playbook for a Phishing credential attack',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'NIST Computer Security Incident Handling Guide (SP 800-61)', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final', provider: 'NIST', type: 'Standard' }
        ]
      },
      {
        id: 'security-compliance',
        name: 'Security Frameworks & Ethics',
        category: 'Soft',
        requiredLevel: 2,
        weight: 1,
        importanceReason: 'Guides compliance with regulatory standards (ISO 27001, SOC 2, HIPAA) and ethical hacking boundaries.',
        topics: ['ISO 27001 / NIST Cybersecurity Framework', 'Responsible Disclosure & Bug Bounty Ethics', 'Security Awareness Training'],
        practiceExercises: ['Map corporate security policies to the NIST CSF categories (Identify, Protect, Detect, Respond, Recover)'],
        miniProject: 'Draft an employee security awareness memo on modern social engineering defense',
        estimatedHours: '4-5 hrs',
        resources: [
          { title: 'NIST Cybersecurity Framework (CSF)', url: 'https://www.nist.gov/cyberframework', provider: 'NIST', type: 'Framework' }
        ]
      }
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud Infrastructure & DevOps',
    badge: 'High Salary',
    iconName: 'Cloud',
    shortDescription: 'Designs, deploys, and maintains reliable cloud infrastructure, serverless architectures, and CI/CD pipelines.',
    salaryRange: '$85,000 - $135,000',
    marketDemand: 'Very High',
    description: 'Cloud engineers design highly available cloud infrastructure on AWS/Azure/GCP, manage Infrastructure-as-Code (Terraform), and optimize reliability and cost.',
    skills: [
      {
        id: 'aws-cloud-core',
        name: 'Cloud Platform Services (AWS / Azure / GCP)',
        category: 'Technical',
        requiredLevel: 3,
        weight: 3,
        importanceReason: 'Core compute (EC2), storage (S3), networking (VPC), and identity (IAM) form modern cloud infrastructure.',
        topics: ['Virtual Private Cloud (VPC), Subnets & Route Tables', 'Compute (EC2, Auto Scaling, Load Balancers)', 'Object Storage (S3) & CloudFront CDN', 'Identity & Access Management (IAM Policies & Roles)'],
        practiceExercises: ['Configure a multi-AZ VPC with public and private subnets and a NAT Gateway', 'Deploy a stateless web server behind an Application Load Balancer with auto-scaling'],
        miniProject: 'Deploy a resilient, auto-scaling web application architecture across 2 Availability Zones',
        estimatedHours: '14-16 hrs',
        resources: [
          { title: 'AWS Skill Builder Free Digital Training', url: 'https://explore.skillbuilder.aws/', provider: 'AWS', type: 'Course' },
          { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', provider: 'Amazon Web Services', type: 'Course' }
        ]
      },
      {
        id: 'terraform-iac',
        name: 'Infrastructure as Code (Terraform)',
        category: 'Technical',
        requiredLevel: 2,
        weight: 3,
        importanceReason: 'Replaces manual console clicks with declarative, version-controlled, reproducible cloud provisioning.',
        topics: ['HCL Syntax & Providers', 'State Management & Remote Backends (S3 / DynamoDB locking)', 'Variables, Outputs & Modules', 'Terraform Plan, Apply, & Destroy workflows'],
        practiceExercises: ['Write a Terraform module to provision an S3 bucket with encryption and lifecycle rules', 'Migrate local state to a secure remote backend with state locking'],
        miniProject: 'Deploy an entire cloud environment (VPC, security groups, database, web servers) using Terraform modules',
        estimatedHours: '10-12 hrs',
        resources: [
          { title: 'HashiCorp Terraform Tutorials', url: 'https://developer.hashicorp.com/terraform/tutorials', provider: 'HashiCorp', type: 'Hands-on Labs' }
        ]
      },
      {
        id: 'docker-kubernetes',
        name: 'Containers & Kubernetes Basics',
        category: 'Tools',
        requiredLevel: 2,
        weight: 3,
        importanceReason: 'Standard for packaging microservices and orchestrating automated rollouts, scaling, and self-healing.',
        topics: ['Container registries (ECR / Docker Hub)', 'Kubernetes Pods, Deployments & Services', 'Ingress controllers & ConfigMaps', 'Helm package manager basics'],
        practiceExercises: ['Deploy an application to Minikube with 3 replicas and verify zero-downtime rolling update', 'Expose a microservice deployment through a Kubernetes NodePort / Ingress'],
        miniProject: 'Deploy a multi-service containerized application to a local Kubernetes cluster using Helm',
        estimatedHours: '10-14 hrs',
        resources: [
          { title: 'Kubernetes Official Interactive Tutorials', url: 'https://kubernetes.io/docs/tutorials/', provider: 'Kubernetes.io', type: 'Interactive' },
          { title: 'Mumshad Mannambeth - Kubernetes for the Absolute Beginners (Articles)', url: 'https://kodekloud.com/', provider: 'KodeKloud', type: 'Guide' }
        ]
      },
      {
        id: 'cicd-automation',
        name: 'CI/CD Pipelines & Automation',
        category: 'Tools',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Automates testing, security scanning, container building, and deployment to cloud targets.',
        topics: ['GitHub Actions / GitLab CI', 'Build pipelines & Artifacts', 'Automated deployment to cloud (ECS / S3 / Lambda)', 'Secret management in CI'],
        practiceExercises: ['Build a GitHub Action workflow that lints, builds a Docker image, and pushes to registry', 'Set up automated preview deployments on pull request creation'],
        miniProject: 'Complete automated CI/CD pipeline deploying a static site to S3 with CloudFront cache invalidation',
        estimatedHours: '8-10 hrs',
        resources: [
          { title: 'GitHub Actions Continuous Integration Guide', url: 'https://docs.github.com/en/actions/automating-builds-and-tests', provider: 'GitHub', type: 'Docs' }
        ]
      },
      {
        id: 'linux-bash',
        name: 'Linux System Administration & Scripting',
        category: 'Tools',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Cloud instances run on Linux; engineers must automate tasks using bash or python.',
        topics: ['Shell scripting & cron jobs', 'Systemd services & daemon management', 'SSH keys & remote configuration', 'Disk partitioning & mounts'],
        practiceExercises: ['Write a backup script that compresses database dumps and copies to cloud storage', 'Create a custom systemd service that restarts automatically upon crash'],
        miniProject: 'Automated server provisioning script using cloud-init and Bash',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'The Linux Command Line by William Shotts', url: 'https://linuxcommand.org/tlcl.php', provider: 'LinuxCommand', type: 'Free Book' }
        ]
      },
      {
        id: 'cloud-monitoring-cost',
        name: 'Cloud Monitoring & FinOps (Cost Optimization)',
        category: 'Technical',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Ensures cloud infrastructure remains performant while avoiding unexpected bill spikes.',
        topics: ['CloudWatch / Prometheus metrics', 'Alarms & Notification triggers (SNS)', 'Cost Explorer & Budget Alerts', 'Right-sizing compute & reserved instances'],
        practiceExercises: ['Configure an alert that sends an email if CPU utilization exceeds 80% for 5 minutes', 'Audit a cloud account and identify 3 unused resources generating waste'],
        miniProject: 'Set up an observability dashboard monitoring latency, error rate, and daily spend',
        estimatedHours: '6-8 hrs',
        resources: [
          { title: 'AWS Well-Architected Framework - Cost Optimization Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html', provider: 'AWS', type: 'Whitepaper' }
        ]
      },
      {
        id: 'troubleshooting-resilience',
        name: 'Resilience Engineering & Troubleshooting',
        category: 'Soft',
        requiredLevel: 2,
        weight: 2,
        importanceReason: 'Designs fault-tolerant systems that automatically recover from zone outages and hardware failures.',
        topics: ['Disaster Recovery Strategies (RTO & RPO)', 'Post-Mortem culture & blameless analysis', 'Root Cause Investigation under pressure'],
        practiceExercises: ['Conduct a blameless post-mortem for a simulated 2-hour cloud outage'],
        miniProject: 'Write a comprehensive Disaster Recovery Plan for a multi-region cloud service',
        estimatedHours: '4-5 hrs',
        resources: [
          { title: 'Google Site Reliability Engineering (SRE) Book', url: 'https://sre.google/sre-book/table-of-contents/', provider: 'Google', type: 'Free Online Book' }
        ]
      }
    ]
  }
];

export const ALL_AVAILABLE_SKILLS = Array.from(
  new Set(
    CAREER_ROLES.flatMap(role => role.skills.map(skill => skill.name))
  )
).sort();
