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
    role: "Frontend & Web Development · IT Operations · Data Systems · Esport Event Enthusiast",
    city: "Surabaya, Indonesia",
    locationUrl: "https://www.google.com/maps?q=Surabaya,Indonesia",
    timezone: "Asia/Jakarta",
    timezoneLabel: "WIB (UTC+7)",

    bio: [
      "I am an Information Systems graduate based in {location}, with hands-on experience in frontend web development, enterprise IT operations, and data-driven web systems. I focus on translating UI/UX designs into responsive, production-ready interfaces while supporting reliable IT infrastructure and internal platforms.",
      "My work spans modern web development with TypeScript, React, Next.js, and Laravel, alongside system operations, usability testing, and data analytics—complemented by a side passion for digital media and esport event coordination."
    ],
    // actions: {
    //   primary: {
    //     label: "Book a call",
    //     url: "https://cal.com/",
    //     icon: "calendar"
    //   },
    //   secondary: {
    //     label: "Email",
    //     url: "mailto:rakha@example.com",
    //     icon: "mail"
    //   },
    //   resumeUrl: "./assets/resume.pdf"
    // },
    socials: [
      {
        label: "GitHub profile",
        icon: "github",
        url: "https://github.com/rakhalana"
      },
      {
        label: "LinkedIn profile",
        icon: "linkedin",
        url: "https://www.linkedin.com/in/rakha-maulanaa/"
      },
      {
        label: "Send email",
        icon: "mail",
        url: "mailto:rakharfd123@gmail.com"
      },
      // {
      //   label: "View résumé PDF",
      //   icon: "file-text",
      //   url: "./assets/resume.pdf"
      // }
    ]
  },

  // ===========================================================================
  // 01 // EXPERIENCE (Supports Segmented Category Filtering + Inline Expansion)
  // ===========================================================================
  experienceCategories: [
    { id: "professional", label: "Professional" },
    { id: "organization", label: "Organization" },
    { id: "volunteer", label: "Volunteer" }
  ],
  experience: [
    {
      id: "exp-1",
      role: "IT Operational Intern",
      company: "Pelindo Terminal Petikemas Teluk Lamong",
      category: "professional",
      icon: "pelindo",
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
      icon: "ordo",
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
      icon: "veteran-esport",
      period: "Jan 2025 – Jan 2026",
      location: "Surabaya",
      expandedByDefault: false,
      bullets: [
        "Led a 5-member Media and Information division, increasing social media followers by 5% and engagement by 7% through structured content planning and a 3-post monthly publishing schedule.",
        "Directed the division’s annual work program and content calendar, coordinating 60+ content pieces across 14 esport events, and evaluating member performance.",
        "Established a publication SOP and reusable design templates as the division’s visual standard, improving cross-division coordination."
      ]
    },
    {
      id: "exp-4",
      role: "Media and Information Staff",
      company: "Veteran Esport",
      category: "organization",
      icon: "veteran-esport",
      period: "Jan 2024 – Jan 2025",
      location: "Surabaya",
      expandedByDefault: false,
      bullets: [
        "Produced 40+ publication assets using Canva and Figma, including mandatory organizational posts, general announcements, athlete features, and match results, contributing to 5% growth in social media reach.",
        "Documented and edited photo and video assets for 10 events (tournaments and work programs), delivering media on schedule for each activity"
      ]
    },
    {
      id: "exp-5",
      role: "Manpower: Tournament Room Admin & Spectator",
      event: "Grand Tournament MLBB Goes to School 2025",
      organizer: "MOONTON Games",
      category: "volunteer",
      icon: "moonton",
      period: "Jan 2026",
      location: "Surabaya",
      expandedByDefault: false,
      bullets: [
        "Coordinated 12 knockout-phase matches across a 4-day tournament as Tournament Room Admin, managing dedicated match rooms and keeping rounds on schedule.",
        "Liaised with league ops, team managers, and players to confirm match readiness and resolve in-game issues in real time. Operated as in-game spectator, displaying the live match feed on-screen for the on-site audience."
      ]
    },
    {
      id: "exp-6",
      role: "Publication & Documentation",
      event: "EVOS Watch Party MPL Season 15",
      organizer: "EVOS X Veteran Esport",
      category: "volunteer",
      icon: "evos",
      period: "Apr 2025",
      location: "Surabaya",
      expandedByDefault: false,
      bullets: [
        // "Coordinated 12 knockout-phase matches across a 4-day tournament as Tournament Room Admin, managing dedicated match rooms and keeping rounds on schedule.",
        // "Liaised with league ops, team managers, and players to confirm match readiness and resolve in-game issues in real time. Operated as in-game spectator, displaying the live match feed on-screen for the on-site audience."
      ]
    },
    {
      id: "exp-7",
      role: "Head of Publication & Documentation",
      event: "VESTJAVA (Veteran Esport East Java Tournament) 2024",
      organizer: "Veteran Esport",
      category: "volunteer",
      icon: "vestjava",
      period: "Apr 2024 - Jul 2024",
      location: "Surabaya",
      expandedByDefault: false,
      bullets: [
        "Overseeing promotion, on-site documentation, and result publication for 64 teams across 2 game titles (MLBB and PUBG)",
        // "Liaised with league ops, team managers, and players to confirm match readiness and resolve in-game issues in real time. Operated as in-game spectator, displaying the live match feed on-screen for the on-site audience."
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
        { name: "PHP", iconSlug: "php" },
        { name: "Python", iconSlug: "python" },
        { name: "SQL", customIcon: "database" },
        { name: "HTML", iconSlug: "html5" },
        { name: "CSS", iconSlug: "css" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React", iconSlug: "react" },
        { name: "Next.js", iconSlug: "nextdotjs" },
        { name: "Laravel Blade", iconSlug: "laravel" },
        { name: "Tailwind CSS", iconSlug: "tailwindcss" },
        { name: "Sass / SCSS", iconSlug: "sass" },
        { name: "Vite", iconSlug: "vite" },
        { name: "Leaflet.js", iconSlug: "leaflet" }
      ]
    },
    {
      category: "Backend & DB",
      items: [
        { name: "Laravel", iconSlug: "laravel" },
        { name: "Node.js", iconSlug: "nodedotjs" },
        { name: "FastAPI", iconSlug: "fastapi" },
        { name: "MySQL", iconSlug: "mysql" },
        { name: "PostgreSQL", iconSlug: "postgresql" },
        { name: "Supabase", iconSlug: "supabase" },
        { name: "REST API", iconSlug: "postman" }
      ]
    },
    {
      category: "Data & Analytics",
      items: [
        { name: "pandas", iconSlug: "pandas" },
        { name: "NumPy", iconSlug: "numpy" },
        { name: "Looker Studio", iconSlug: "looker" },
        { name: "Google Colab", iconSlug: "googlecolab" },
        { name: "Google Sheets", iconSlug: "googlesheets" },
        { name: "AHP & Profile Matching", customIcon: "nodes" },
        { name: "Turf.js", customIcon: "sparkle-grid" }
      ]
    },
    {
      category: "DevOps & Tools",
      items: [
        { name: "Docker", iconSlug: "docker" },
        { name: "Git", iconSlug: "git" },
        { name: "GitHub", iconSlug: "github" },
        { name: "Vercel", iconSlug: "vercel" },
        { name: "Laragon", iconSlug: "laragon" },
        { name: "Vitest", iconSlug: "vitest" },
        { name: "Postman", iconSlug: "postman" }
      ]
    },
    {
      category: "Design & Ops",
      items: [
        { name: "Figma", iconSlug: "figma" },
        { name: "Canva", customIcon: "pen-nib" },
        { name: "UI/UX & Usability Testing", customIcon: "pen-nib" },
        { name: "ITSM & Network Ops", customIcon: "server" }
      ]
    }
  ],

  // ===========================================================================
  // 03 // SELECTED PROJECTS (2-Column Editorial Grid + Multi-Link Actions)
  // ===========================================================================
  projectsHeaderLink: {
    label: "All repositories ↗",
    url: "https://github.com/rakhalana"
  },
  projects: [
    {
      id: "proj-1",
      name: "MARTA - Monitoring and Administration of Terminal Waiting Area",
      description: "Developing a simulated real-time monitoring dashboard for the 66-slot truck waiting area at Terminal Teluk Lamong to track bay allocations, sensor occupancy, and operational alerts. (Currently under active development)",
      tag: "Web App · Operations",
      stack: ["React 19", "TypeScript", "Vite", "Vitest"],
      icon: "monitor-check",
      links: [
        { label: "GitHub ↗", url: "https://github.com/rakhalana/marta/" },
        { label: "Demo ↗", url: "https://marta-phi-seven.vercel.app/" }
      ]
    },
    {
      id: "proj-2",
      name: "SEARAH - Route-Based Food Discovery",
      description: "Built an interactive geospatial web app that recommends restaurants and cafés along travel routes using OpenRouteService and Turf.js detour scoring, with dual POI providers (Google Places & Overpass API) and 0ms client-side filtering.",
      tag: "Web App · Geospatial",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Leaflet", "Turf.js"],
      icon: "map-pin",
      links: [
        { label: "GitHub ↗", url: "https://github.com/rakhalana/searah" }
      ]
    },
    {
      id: "proj-3",
      name: "Sidoarjo MSME Product Evaluation",
      description: "Built a web-based Decision Support System (DSS) using AHP and Profile Matching to evaluate, grade, and rank 50 MSME products across 9 curation criteria.",
      tag: "Web App · DSS",
      stack: ["Laravel", "PHP", "MySQL", "AHP · Profile Matching"],
      icon: "layers",
      links: [
        { label: "Calc ↗", url: "https://docs.google.com/spreadsheets/d/1HRCRHNd_a4lqxQNOe-nHzXUOzRdI50nRSVo0fpykRUc/edit?usp" },
        { label: "GitHub ↗", url: "https://github.com/rakhalana/dss-kurasi-demo" },
        { label: "Demo ↗", url: "https://dss-kurasiumkm-demo.vercel.app/" }
      ]
    },
    {
      id: "proj-5",
      name: "Thrifttopia Circular Marketplace",
      description: "Designed an end-to-end desktop and mobile thrift commerce platform, validated with 52 users and achieving an 84.10% usability score.",
      tag: "UI/UX · Product",
      stack: ["Figma", "Design System", "Prototyping", "Usability"],
      icon: "shopping-bag",
      links: [
        { label: "Mobile Proto ↗", url: "https://www.figma.com/proto/oyWm256ZJDkIYw1UlmuLdK/Thriftopia-Rcopy?node-id=8209-7042&p=f&t=UMlBSpmrN30XHRbA-1&scaling=scale-down&content-scaling=fixed&page-id=8001%3A1141&starting-point-node-id=8827%3A4562" },
        { label: "Desktop Proto ↗", url: "https://www.figma.com/proto/oyWm256ZJDkIYw1UlmuLdK/Thriftopia-Rcopy?node-id=9486-4405&p=f&t=k1o8wY8hCNPA9uFb-1&scaling=scale-down&content-scaling=fixed&page-id=9481%3A3826&starting-point-node-id=9486%3A4405&show-proto-sidebar=1" }
      ]
    },
    {
      id: "proj-6",
      name: "Brazilian Ecommerce Dashboard",
      description: "Analyzed 99,441 Olist e-commerce orders (R$ 16.01M revenue) and cleaned 279K+ geolocation records in Python, delivering an interactive Looker Studio dashboard tracking regional sales, 89.2% on-time delivery rate, and customer satisfaction.",
      tag: "Data Analytics · BI",
      stack: ["Python", "pandas", "Google Colab", "Looker Studio"],
      icon: "scatter-chart",
      links: [
        { label: "Dashboard ↗", url: "https://datastudio.google.com/u/0/reporting/641d47fd-b6b5-4f99-9b96-556c3cf8402a/page/IkzXE" },
        { label: "Slideshow ↗", url: "https://docs.google.com/presentation/d/1MAsGcRPOIA7TvJfDSiGJZGp3mo_IUnKp/edit?usp=sharing&ouid=101130327753642175610&rtpof=true&sd=true" }
      ]
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
    }
    // ,
    // {
    //   id: "cred-2",
    //   type: "certification",
    //   badgeLabel: "Certification",
    //   icon: "shield-check",
    //   title: "TensorFlow Developer Certificate",
    //   subtitle: "Google & TensorFlow Certificate Program",
    //   highlight: "ID: TF-DEV-2025",
    //   period: "Issued 2025",
    //   meta: "Verify ↗",
    //   url: "https://www.tensorflow.org/certificate"
    // }
  ]
};
