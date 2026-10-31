/**
 * data.js — Single Source of Truth for Portfolio Content
 * ----------------------------------------------------------------------------
 * Edit ONLY this file to update your identity, bio, experience, skills,
 * selected projects, and education/certifications. No HTML/CSS edits needed.
 */

window.PORTFOLIO_DATA = {
  profile: {
    indexLabel: "00 // PORTFOLIO",
    name: "Rakha Maulana",
    role: "Software Engineering · Machine Learning · Data Systems",
    city: "Surabaya, Indonesia",
    locationUrl: "https://www.google.com/maps?q=Surabaya,Indonesia",
    timezone: "Asia/Jakarta",
    timezoneLabel: "WIB (UTC+7)",
    status: {
      available: true,
      label: "Available for select roles & projects"
    },
    bio: [
      "I am based in {location}. I work across full-stack software engineering, applied machine learning, and data analytics—building predictive models, scalable APIs, and production web systems.",
      "I use TypeScript, Python, SQL, and modern cloud tools to turn complex operational problems into fast, reliable digital products."
    ],
    actions: {
      primary: {
        label: "Book a call",
        url: "https://cal.com/",
        icon: "calendar"
      },
      secondary: {
        label: "Email",
        url: "mailto:rakha@example.com",
        icon: "mail"
      },
      resumeUrl: "./assets/resume.pdf"
    },
    socials: [
      {
        label: "GitHub profile",
        icon: "github",
        url: "https://github.com/"
      },
      {
        label: "LinkedIn profile",
        icon: "linkedin",
        url: "https://www.linkedin.com/"
      },
      {
        label: "Send email",
        icon: "mail",
        url: "mailto:rakha@example.com"
      },
      {
        label: "View résumé PDF",
        icon: "file-text",
        url: "./assets/resume.pdf"
      }
    ]
  },

  // ===========================================================================
  // 01 // EXPERIENCE (Supports Segmented Category Filtering + Inline Expansion)
  // ===========================================================================
  experienceCategories: [
    { id: "professional", label: "Professional" },
    { id: "organization", label: "Organization" },
    { id: "freelance", label: "Freelance" }
  ],
  experience: [
    {
      id: "exp-1",
      role: "IT Operational Intern",
      company: "Pelindo Terminal Petikemas Teluk Lamong",
      category: "professional",
      icon: "monitor-check",
      period: "Jul 2026 – Nov 2026",
      location: "Surabaya · On-site",
      expandedByDefault: true,
      bullets: [
        "Supported daily IT operations by assigning 30+ ITSM tickets to technicians based on shift schedules and workloads, resolving 10 hardware and network issues, and hosting 15 Zoom meetings and events, including hybrid sessions and the company-wide Lamong Bicara forum.",
        "Contributed to the development of the IT Asset Inventory (INVT) application, including database schema design; conducted usability testing of 5 features of the e-Compliance platform; and produced 6 cybersecurity awareness infographics for employees.",
      ]
    },
    {
      id: "exp-2",
      role: "Frontend Developer Intern",
      company: "ORDO Apps (PT Ordo Teknologi Karya)",
      category: "professional",
      icon: "scatter-chart",
      period: "Feb 2025 – Jun 2025",
      location: "Jakarta · On-site",
      expandedByDefault: false,
      bullets: [
        "Implemented front-end features for 3 client web applications that reached production during a 4-month internship, slicing Figma designs into Laravel Blade, Bootstrap, and SCSS interfaces.",
        "Developed 20+ user-facing pages and reusable components across creator-marketplace platform and role-based backoffice apps, implementing interactive workflows, data visualizations, and responsive layouts for desktop, mobile and tablet.",
        "Resolved major, medium, and minor defects based on QA findings and client reviews, and verified cross-browser compatibility on Chrome, Edge, and Firefox."
      ]
    },
    {
      id: "exp-3",
      role: "Head of Media and Information",
      company: "Veteran Esport",
      category: "organization",
      icon: "network-nodes",
      period: "Jan 2025 – Jan 2026",
      location: "Surabaya",
      expandedByDefault: false,
      bullets: [
        "Led a 5-member Media and Information division, increasing social media followers by 5% and engagement by [X]% through structured content planning and a 3-post monthly publishing schedule.",
        "Directed the division’s annual work program and content calendar, coordinating 60+ content pieces across 14 esport events, and evaluating member performance.",
        "Established a publication SOP and reusable design templates as the division’s visual standard, improving cross-division coordination."
      ]
    },
    {
      id: "exp-4",
      role: "Media and Information Staff",
      company: "Veteran Esport",
      category: "organization",
      icon: "cpu",
      period: "Jan 2024 – Jan 2025",
      location: "Surabaya",
      expandedByDefault: false,
      bullets: [
        "Produced 40+ publication assets using Canva and Figma, including mandatory organizational posts, general announcements, athlete features, and match results, contributing to 5% growth in social media reach.",
        "Created an interactive Streamlit analytics dashboard in Python to visualize multi-year urban mobility datasets."
      ]
    },
    {
      id: "exp-5",
      role: "Independent Full-Stack & UI/UX Consultant",
      company: "Self-Employed · Studio Work",
      category: "freelance",
      icon: "pen-tool",
      period: "Jul 2023 – Present",
      location: "Remote",
      expandedByDefault: false,
      bullets: [
        "Designed and shipped custom web interfaces, analytical dashboards, and 20+ reusable Figma design system components for SME clients.",
        "Conducted usability testing with 50+ participants, achieving SUS scores above 88."
      ]
    }
  ],

  // ===========================================================================
  // 02 // TECHNICAL CAPABILITIES (Unboxed Icon + Text Matrix)
  // ===========================================================================
  skills: [
    {
      category: "Language",
      items: [
        { name: "TypeScript", iconSlug: "typescript" },
        { name: "JavaScript", iconSlug: "javascript" },
        { name: "Python", iconSlug: "python" },
        { name: "SQL", customIcon: "database" },
        { name: "HTML", iconSlug: "html5" },
        { name: "CSS", iconSlug: "css" },
        { name: "PHP", iconSlug: "php" },
        { name: "Dart", iconSlug: "dart" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React", iconSlug: "react" },
        { name: "Next.js", iconSlug: "nextdotjs" },
        { name: "Tailwind CSS", iconSlug: "tailwindcss" },
        { name: "shadcn/ui", iconSlug: "shadcnui" },
        { name: "Motion", customIcon: "motion" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", iconSlug: "nodedotjs" },
        { name: "Bun", iconSlug: "bun" },
        { name: "PostgreSQL", iconSlug: "postgresql" },
        { name: "Redis", iconSlug: "redis" },
        { name: "Drizzle", iconSlug: "drizzle" },
        { name: "MongoDB", iconSlug: "mongodb" },
        { name: "MySQL", iconSlug: "mysql" }
      ]
    },
    {
      category: "AI / ML",
      items: [
        { name: "TensorFlow", iconSlug: "tensorflow" },
        { name: "Scikit-learn", iconSlug: "scikitlearn" },
        { name: "XGBoost", customIcon: "nodes" },
        { name: "GRU / LSTM", customIcon: "nodes" },
        { name: "CNN", customIcon: "nodes" },
        { name: "TensorFlow.js", iconSlug: "tensorflow" }
      ]
    },
    {
      category: "Data",
      items: [
        { name: "pandas", iconSlug: "pandas" },
        { name: "NumPy", iconSlug: "numpy" },
        { name: "Streamlit", iconSlug: "streamlit" },
        { name: "Plotly", iconSlug: "plotly" },
        { name: "Seaborn", customIcon: "barchart" },
        { name: "Tableau", customIcon: "sparkle-grid" }
      ]
    },
    {
      category: "Infrastructure",
      items: [
        { name: "Google Cloud", iconSlug: "googlecloud" },
        { name: "Cloudflare", iconSlug: "cloudflare" },
        { name: "Vercel", iconSlug: "vercel" },
        { name: "Docker", iconSlug: "docker" },
        { name: "Linux", iconSlug: "linux" },
        { name: "Supabase", iconSlug: "supabase" }
      ]
    },
    {
      category: "Design & Ops",
      items: [
        { name: "Figma", iconSlug: "figma" },
        { name: "GitHub", iconSlug: "github" },
        { name: "UI/UX Systems", customIcon: "pen-nib" },
        { name: "Network & Server Ops", customIcon: "server" }
      ]
    }
  ],

  // ===========================================================================
  // 03 // SELECTED PROJECTS (2-Column Editorial Grid + Tech Stack Footer)
  // ===========================================================================
  projectsHeaderLink: {
    label: "All repositories ↗",
    url: "https://github.com/"
  },
  projects: [
    {
      id: "proj-1",
      name: "ADRO Stock Forecasting & Risk Engine",
      description: "Evaluated 48 GRU architectures across 2,541 daily market observations, achieving 2.24% MAPE and 3.48% one-day Value at Risk estimation.",
      tag: "ML · Forecasting",
      stack: ["Python", "TensorFlow", "GRU", "Risk Analytics"],
      icon: "candlestick",
      url: "https://github.com/"
    },
    {
      id: "proj-2",
      name: "Createch Face Recognition Attendance",
      description: "Engineered a MobileNetV2 biometric pipeline on 650 employee images, validated via stratified 5-fold cross-validation and a 130-image holdout.",
      tag: "ML · Computer Vision",
      stack: ["Python", "MobileNetV2", "OpenCV", "Scikit-learn"],
      icon: "scan-face",
      url: "https://github.com/"
    },
    {
      id: "proj-3",
      name: "Antam Gold Price Prediction Dashboard",
      description: "Benchmarked LSTM vs. GRU models on macroeconomic indicators (1.47% MAPE) and shipped a full-stack 1-to-90-day forecasting web app.",
      tag: "Full-Stack · ML",
      stack: ["React", "Flask", "LSTM / GRU", "Plotly"],
      icon: "layers",
      url: "https://github.com/"
    },
    {
      id: "proj-4",
      name: "VegeCare Plant Disease Classification API",
      description: "Built a low-latency REST API powered by MobileNetV2 to classify crop leaf diseases from photos and return automated treatment guidance.",
      tag: "AI · Backend API",
      stack: ["Flask", "TensorFlow", "Docker", "Google Cloud"],
      icon: "leaf",
      url: "https://github.com/"
    },
    {
      id: "proj-5",
      name: "Thrifttopia Circular Marketplace",
      description: "Designed an end-to-end desktop and mobile thrift commerce platform, validated with 52 users and achieving an 84.10% usability score.",
      tag: "UI/UX · Product",
      stack: ["Figma", "Design System", "Prototyping", "Usability"],
      icon: "shopping-bag",
      url: "https://www.figma.com/"
    },
    {
      id: "proj-6",
      name: "EcoFood Surplus Distribution Platform",
      description: "Architected a multi-role surplus-food rescue interface reaching 97.14% consumer task effectiveness and SUS scores of 92 and 89.5.",
      tag: "UI/UX · Product",
      stack: ["Figma", "User Research", "SUS Evaluation"],
      icon: "eco-circle",
      url: "https://www.figma.com/"
    }
  ],

  // ===========================================================================
  // 04 // CREDENTIALS (Education vs. Certifications Segmented Separation)
  // ===========================================================================
  credentialCategories: [
    { id: "education", label: "Education" },
    { id: "certification", label: "Certifications" }
  ],
  credentials: [
    {
      id: "cred-1",
      type: "education",
      badgeLabel: "Education",
      icon: "graduation-cap",
      title: "Universitas Pembangunan Nasional “Veteran” Jawa Timur",
      subtitle: "Bachelor of Information Systems",
      highlight: "GPA 3.83 / 4.00",
      period: "2022 – 2026",
      meta: "Surabaya",
      url: ""
    },
    {
      id: "cred-2",
      type: "certification",
      badgeLabel: "Certification",
      icon: "shield-check",
      title: "TensorFlow Developer Certificate",
      subtitle: "Google & TensorFlow Certificate Program",
      highlight: "ID: TF-DEV-2025",
      period: "Issued 2025",
      meta: "Verify ↗",
      url: "https://www.tensorflow.org/certificate"
    },
    {
      id: "cred-3",
      type: "certification",
      badgeLabel: "Certification",
      icon: "shield-check",
      title: "Bangkit Machine Learning Distinction Graduate",
      subtitle: "Google, GoTo, and Traveloka Career Readiness Program",
      highlight: "Score: 95.20 (Grade A)",
      period: "Issued 2025",
      meta: "Verify ↗",
      url: "https://grow.google/intl/id_id/bangkit/"
    },
    {
      id: "cred-4",
      type: "certification",
      badgeLabel: "Certification",
      icon: "shield-check",
      title: "Expert Data Scientist Path Certificate",
      subtitle: "Indosat Ooredoo Hutchison Digital Camp (IDCamp)",
      highlight: "Top 0.5% Cohort",
      period: "Issued 2025",
      meta: "Verify ↗",
      url: "https://idcamp.ioh.co.id/"
    }
  ]
};
