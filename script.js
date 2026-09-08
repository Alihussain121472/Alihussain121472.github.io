/**
 * ARAKNET.TECH — SCRIPT ENGINE FOR SYED ALI
 * Features: Neural Canvas, Typewriter, Counter Observer,
 * Dynamic Certification Hub, Project Architecture Deep-Dive Modal,
 * Viewer Email Pass (Public Read-Only), Secret Owner Mode (Ctrl+Shift+E, Passcode: araknet2026),
 * Command Palette (Ctrl+K), and Form Dispatch.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. NEURAL PARTICLE CANVAS ENGINE
  // ==========================================
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 35 : 75;
    const maxDistance = 150;
    let mouse = { x: null, y: null, radius: 180 };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.9;
        this.vy = (Math.random() - 0.5) * 0.9;
        this.radius = Math.random() * 2 + 1.2;
        this.color = Math.random() > 0.4 ? '#00c2ff' : '#00f5d4';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = 1 - dist / maxDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 194, 255, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const opacity = 1 - dist / mouse.radius;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${opacity * 0.4})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==========================================
  // 2. DYNAMIC TYPEWRITER EFFECT
  // ==========================================
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const titles = [
      'AI Developer',
      'AI Systems Builder',
      'Autonomous Agent Architect',
      'BSAI Student · SZABIST',
      'Founder @ NovaBrief'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const holdTime = 1800;

    function tick() {
      const currentTitle = titles[titleIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      let delta = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentTitle.length) {
        delta = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delta = 400;
      }

      setTimeout(tick, delta);
    }
    tick();
  }

  // ==========================================
  // 3. STATS NUMBER COUNTER OBSERVER
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 1500;
            const startTime = performance.now();

            function updateCount(now) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = Math.floor(progress * target);
              stat.textContent = current + (stat.parentElement.querySelector('.stat-label').textContent.includes('%') ? '%' : '+');

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                stat.textContent = target + (stat.parentElement.querySelector('.stat-label').textContent.includes('%') ? '%' : '+');
              }
            }
            requestAnimationFrame(updateCount);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsGrid = document.querySelector('.stats-counter-grid');
    if (statsGrid) observer.observe(statsGrid);
  }

  // ==========================================
  // 4. PROJECT ARCHITECTURE & BLUEPRINT DATA (4 COLUMNS)
  // ==========================================
  const projectBlueprints = {
    'novabrief': {
      category: 'AI SAAS PLATFORM · LIVE IN PRODUCTION',
      title: 'NovaBrief Tech',
      subtitle: 'AI Student Intelligence, Opportunity Hunter & Daily Tech Digests',
      pitch: 'An automated platform that hunts elite student programs (Google Student Facilitator, Google Arcade, Microsoft Fabric, NASA Open Science, fellowships) and generates instant 60-second AI summaries of global breakthroughs.',
      skills: [
        'Autonomous Program Hunter Agent (Scrapes Scholarships & Grants)',
        'Ultra-Fast AI Summaries (<1 sec response via Groq)',
        'Automated Background Scheduling (APScheduler)',
        'Supabase & PostgreSQL Relational Database Architecture',
        'Student Opportunity Tracking & Instant Alert System',
        'Nova Admin OS Portal & System Health Diagnostics'
      ],
      tools: [
        'Python', 'Flask', 'Llama 3.3 (70B)', 'Groq Cloud API',
        'Supabase', 'PostgreSQL', 'APScheduler', 'Tailwind CSS',
        'Gunicorn', 'NewsAPI'
      ],
      sites: [
        { label: 'Live SaaS Platform (novabrief.tech)', url: 'https://www.novabrief.tech' },
        { label: 'Groq Cloud Inference Engine', url: 'https://groq.com' },
        { label: 'Supabase Cloud Database', url: 'https://supabase.com' },
        { label: 'Render Cloud Deployment', url: 'https://render.com' },
        { label: 'GitHub Repository', url: 'https://github.com/Alihussain121472' }
      ],
      metrics: [
        'Sub-second (<650ms) Llama 3.3 generation latency via Groq',
        'Automated Program Hunter continuously tracks Google, NASA & Microsoft programs',
        'Hourly background jobs run with zero manual intervention',
        'Live in production with active student subscribers'
      ],
      actions: [
        { label: 'Visit Live novabrief.tech', url: 'https://www.novabrief.tech', primary: true, icon: 'fa-globe' },
        { label: 'GitHub Profile', url: 'https://github.com/Alihussain121472', primary: false, icon: 'fa-brands fa-github' }
      ]
    },
    'leads-agent': {
      category: 'AUTONOMOUS SCOUT · B2B SAAS',
      title: 'Araknet Business Discovery Agent',
      subtitle: 'Autonomous Business Scouting, Digital Presence Audit & Lead Generation',
      pitch: 'An autonomous AI scout that scans local and international businesses across any city, audits their websites and mobile presence, and scores high-value client opportunities.',
      skills: [
        'Autonomous Business Directory Scouting',
        'Website & Mobile App Presence Auditing',
        'AI Automation Potential Scoring (0–100)',
        'SerpAPI & Google Places Integration',
        'Next.js 16 SaaS Dashboard & Real-Time Filters',
        'Automated Lead Management & Proposal Preparation'
      ],
      tools: [
        'Next.js 16 (App Router)', 'React 19', 'TypeScript', 'MongoDB Atlas',
        'SerpAPI', 'Google Places API', 'Tailwind CSS', 'REST APIs'
      ],
      sites: [
        { label: 'Live Platform (araknet.tech)', url: 'https://araknet.tech' },
        { label: 'Google Places API Documentation', url: 'https://developers.google.com/maps' },
        { label: 'SerpAPI Search Engine', url: 'https://serpapi.com' },
        { label: 'GitHub Repository', url: 'https://github.com/Alihussain121472' }
      ],
      metrics: [
        'Scouts hundreds of business listings per city run',
        'Identifies businesses missing websites, SSL security, or mobile UX',
        'Automated scoring saves 15+ hours of manual prospecting weekly',
        'Full modern SaaS stack with React 19, Next.js 16 & MongoDB'
      ],
      actions: [
        { label: 'Visit araknet.tech', url: 'https://araknet.tech', primary: true, icon: 'fa-globe' },
        { label: 'GitHub Profile', url: 'https://github.com/Alihussain121472', primary: false, icon: 'fa-brands fa-github' }
      ]
    },
    'dha-agent': {
      category: 'VERTICAL SAAS · REAL ESTATE AI',
      title: 'DHA Multan Real Estate AI Advisory Agent',
      subtitle: '24/7 Property Valuation, Sector Trends & Investor Consultation Assistant',
      pitch: 'An on-demand property advisor that answers plot inquiries, compares sector pricing trends, and calculates transfer fees for DHA Multan investors and overseas buyers.',
      skills: [
        'Real Estate Valuation & Property Price Trends',
        'Bilingual Conversational AI (Urdu & English)',
        'Sector Price Forecasting Across 20+ Sectors',
        'Automated Transfer Fee, CVT & Stamp Duty Calculation',
        'Property Knowledge Engine & Fast Inquiry Search'
      ],
      tools: [
        'Python', 'Anthropic Claude API', 'FastAPI',
        'Vector Embeddings', 'SQLite / PostgreSQL',
        'Responsive Web UI'
      ],
      sites: [
        { label: 'DHA Multan Official Reference', url: 'https://www.dhamultan.org' },
        { label: 'Anthropic Claude Engine', url: 'https://anthropic.com' },
        { label: 'Portfolio Host (araknet.tech)', url: 'https://araknet.tech' },
        { label: 'GitHub Profile', url: 'https://github.com/Alihussain121472' }
      ],
      metrics: [
        'Covers all 20+ residential and commercial sectors in DHA Multan',
        'Zero downtime query resolution for overseas Pakistani buyers',
        'Instant calculation of transfer taxes, CVT, and stamp duties',
        'High investor satisfaction during pilot testing'
      ],
      actions: [
        { label: 'Contact Syed Ali Hussain', url: '#contact', primary: true, icon: 'fa-envelope' },
        { label: 'GitHub Profile', url: 'https://github.com/Alihussain121472', primary: false, icon: 'fa-brands fa-github' }
      ]
    },
    'khidmat-ai': {
      category: 'CIVIC TECH · PUBLIC ASSISTANCE APP',
      title: 'Khidmat AI — Civic & Daily Life Assistance',
      subtitle: 'AI-Powered Public Service Guidance & Everyday Problem Solving (Android & Web)',
      pitch: 'A bilingual civic assistance application that helps citizens effortlessly understand government procedures, draft public service requests, and resolve utility disputes in everyday language.',
      skills: [
        'Bilingual Citizen Assistance (Urdu & English)',
        'Plain-Language Government Procedure Guidance',
        'Automated Document Preparation Checklists',
        'Native Android App with Jetpack Compose',
        'Python Django Backend & RESTful APIs'
      ],
      tools: [
        'Android / Kotlin', 'Jetpack Compose', 'Python',
        'Django Framework', 'Room Database', 'REST APIs', 'Open-Source LLMs'
      ],
      sites: [
        { label: 'Citizen Service Portals Reference', url: 'https://pakistan.gov.pk' },
        { label: 'GitHub Codebase', url: 'https://github.com/Alihussain121472' },
        { label: 'Render Cloud Deployment', url: 'https://render.com' }
      ],
      metrics: [
        '1,200+ public service inquiries assisted',
        'Average response latency under 1.4 seconds',
        'Bilingual assistance in both Urdu and English',
        '100% free accessibility for citizens with zero paywalls'
      ],
      actions: [
        { label: 'View on GitHub', url: 'https://github.com/Alihussain121472', primary: true, icon: 'fa-brands fa-github' },
        { label: 'Contact Syed Ali Hussain', url: '#contact', primary: false, icon: 'fa-envelope' }
      ]
    },
    'seo-agent': {
      category: 'SEARCH INTELLIGENCE · SEO SPECIALIST AGENT',
      title: 'Autonomous SEO & Content Specialist Agent',
      subtitle: 'Competitor Analysis, Keyword Entity Extraction & Rank-Ready Outlines',
      pitch: 'An automated agent pipeline that scrapes top-ranking Google search competitors, extracts keyword entity gaps, and structures high-ranking articles in minutes instead of days.',
      skills: [
        'Google Search Competitor Intelligence',
        'Semantic Keyword & Entity Gap Analysis',
        'On-Page & Technical SEO Auditing',
        'Structured Schema & Metadata Generation',
        'Content Outline & Article Blueprint Generation'
      ],
      tools: [
        'Python', 'Groq / Llama 3.3', 'BeautifulSoup4',
        'Playwright', 'RegEx', 'Markdown Engine'
      ],
      sites: [
        { label: 'Google Search Console Connectors', url: 'https://search.google.com' },
        { label: 'Schema.org Standards', url: 'https://schema.org' },
        { label: 'GitHub Repository', url: 'https://github.com/Alihussain121472' }
      ],
      metrics: [
        '85% reduction in manual content research time',
        'Over 4,500 keywords analyzed per project batch',
        'Structured metadata passes 100% Google Rich Results tests'
      ],
      actions: [
        { label: 'View GitHub Repository', url: 'https://github.com/Alihussain121472', primary: true, icon: 'fa-brands fa-github' },
        { label: 'Consult on SEO Pipeline', url: '#contact', primary: false, icon: 'fa-envelope' }
      ]
    }
  };

  // Backwards compatibility alias
  projectBlueprints['email-agent'] = projectBlueprints['leads-agent'];

  const projectModal = document.getElementById('projectModal');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const bpCategoryTag = document.getElementById('bpCategoryTag');
  const bpProjectTitle = document.getElementById('bpProjectTitle');
  const bpProjectSubtitle = document.getElementById('bpProjectSubtitle');
  const bpPitchSummary = document.getElementById('bpPitchSummary');
  const bpSkillsList = document.getElementById('bpSkillsList');
  const bpToolsList = document.getElementById('bpToolsList');
  const bpSitesList = document.getElementById('bpSitesList');
  const bpMetricsList = document.getElementById('bpMetricsList');
  const bpActionLinks = document.getElementById('bpActionLinks');

  window.openProjectModal = function(projectId) {
    if (projectId === 'email-agent') projectId = 'leads-agent';
    const data = projectBlueprints[projectId];
    if (!data || !projectModal) return;

    bpCategoryTag.innerHTML = `<i class="fa-solid fa-cube"></i> ${escapeHtml(data.category)}`;
    bpProjectTitle.textContent = data.title;
    bpProjectSubtitle.textContent = data.subtitle;
    bpPitchSummary.textContent = data.pitch;

    bpSkillsList.innerHTML = data.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('');
    bpToolsList.innerHTML = data.tools.map(t => `<span class="bp-pill">${escapeHtml(t)}</span>`).join('');
    bpSitesList.innerHTML = data.sites.map(site => `
      <li>
        <a href="${site.url}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(site.label)} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
        </a>
      </li>
    `).join('');
    bpMetricsList.innerHTML = data.metrics.map(m => `<li>${escapeHtml(m)}</li>`).join('');

    bpActionLinks.innerHTML = data.actions.map(a => `
      <a href="${a.url}" target="${a.url.startsWith('#') ? '_self' : '_blank'}" rel="noopener noreferrer" class="btn btn-sm ${a.primary ? 'btn-primary' : 'btn-outline'}">
        <i class="${a.icon}"></i> ${escapeHtml(a.label)}
      </a>
    `).join('');

    projectModal.classList.add('active');
  };

  if (closeProjectModalBtn && projectModal) {
    closeProjectModalBtn.addEventListener('click', () => projectModal.classList.remove('active'));
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) projectModal.classList.remove('active');
    });
  }

  // ==========================================
  // 5. MANDATORY ACCESS GATEWAY & VISITOR AUTHENTICATION
  // ==========================================
  const AUTH_USER_KEY = 'araknet_auth_user_v1';
  const VIEWER_STORAGE_KEY = 'araknet_viewer_email_v1';
  const VISITORS_LOG_KEY = 'araknet_visitors_log_v1';

  const authGateOverlay = document.getElementById('authGateOverlay');
  const authGateForm = document.getElementById('authGateForm');
  const gateVisitorName = document.getElementById('gateVisitorName');
  const gateVisitorEmail = document.getElementById('gateVisitorEmail');
  const gateOwnerBypassBtn = document.getElementById('gateOwnerBypassBtn');

  const userProfileModal = document.getElementById('userProfileModal');
  const closeUserProfileBtn = document.getElementById('closeUserProfileBtn');
  const logoutVisitorBtn = document.getElementById('logoutVisitorBtn');
  const sessionUserName = document.getElementById('sessionUserName');
  const sessionUserEmail = document.getElementById('sessionUserEmail');
  const sessionUserRole = document.getElementById('sessionUserRole');
  const sessionUserTime = document.getElementById('sessionUserTime');

  const viewerAccessBtn = document.getElementById('viewerAccessBtn');
  const mobileViewerBtn = document.getElementById('mobileViewerBtn');
  const viewerStatusText = document.getElementById('viewerStatusText');

  // Role Pill Selection
  document.querySelectorAll('.gate-role-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.gate-role-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const radio = pill.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  function getVisitorsLog() {
    try {
      const stored = localStorage.getItem(VISITORS_LOG_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function recordVisitorEmail(email, name = 'Visitor', purpose = 'General Inquiry') {
    try {
      const list = getVisitorsLog();
      const existing = list.find(v => v.email.toLowerCase() === email.toLowerCase());
      if (!existing) {
        list.unshift({ email, name, purpose, timestamp: new Date().toLocaleString() });
        localStorage.setItem(VISITORS_LOG_KEY, JSON.stringify(list));
      }
      updateVisitorCountBadge();
    } catch (e) {
      console.warn('Could not record visitor email:', e);
    }
  }

  function updateVisitorCountBadge() {
    const countEl = document.getElementById('visitorCount');
    if (countEl) {
      const list = getVisitorsLog();
      countEl.textContent = list.length;
    }
  }

  function getAuthenticatedUser() {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      if (stored) return JSON.parse(stored);
      const email = localStorage.getItem(VIEWER_STORAGE_KEY);
      if (email) {
        return {
          name: email.split('@')[0],
          email: email,
          purpose: 'Recruiter / Talent Partner',
          timestamp: new Date().toLocaleDateString()
        };
      }
    } catch (e) {
      console.warn('Could not read auth user:', e);
    }
    return null;
  }

  function updateViewerDisplay() {
    const user = getAuthenticatedUser();
    if (user && user.email) {
      if (viewerStatusText) {
        // Display ONLY the clean email without the word "Viewer:"
        viewerStatusText.textContent = user.email;
        viewerStatusText.title = `Logged in: ${user.email}`;
      }
      if (viewerAccessBtn) {
        viewerAccessBtn.classList.add('active');
      }
      unlockAccessGate(false);
    } else {
      if (viewerStatusText) {
        viewerStatusText.textContent = 'Sign In';
      }
      if (viewerAccessBtn) {
        viewerAccessBtn.classList.remove('active');
      }
      lockAccessGate();
    }
  }

  function lockAccessGate() {
    document.body.classList.add('auth-locked');
    if (authGateOverlay) {
      authGateOverlay.style.display = 'flex';
      authGateOverlay.classList.remove('unlocking');
      setTimeout(() => {
        if (gateVisitorName) gateVisitorName.focus();
      }, 80);
    }
  }

  function unlockAccessGate(animate = true) {
    if (!authGateOverlay) {
      document.body.classList.remove('auth-locked');
      return;
    }
    if (animate) {
      authGateOverlay.classList.add('unlocking');
      setTimeout(() => {
        authGateOverlay.style.display = 'none';
        authGateOverlay.classList.remove('unlocking');
        document.body.classList.remove('auth-locked');
      }, 500);
    } else {
      authGateOverlay.style.display = 'none';
      document.body.classList.remove('auth-locked');
    }
  }

  function openUserProfileModal() {
    const user = getAuthenticatedUser();
    if (!user) {
      lockAccessGate();
      return;
    }
    if (sessionUserName) sessionUserName.textContent = user.name || 'Visitor';
    if (sessionUserEmail) sessionUserEmail.textContent = user.email || 'visitor@example.com';
    if (sessionUserRole) sessionUserRole.textContent = user.purpose || 'Recruiter';
    if (sessionUserTime) sessionUserTime.textContent = user.timestamp || 'Active';

    if (userProfileModal) userProfileModal.classList.add('active');
  }

  function closeUserProfileModal() {
    if (userProfileModal) userProfileModal.classList.remove('active');
  }

  if (viewerAccessBtn) viewerAccessBtn.addEventListener('click', openUserProfileModal);
  if (mobileViewerBtn) mobileViewerBtn.addEventListener('click', openUserProfileModal);
  if (closeUserProfileBtn) closeUserProfileBtn.addEventListener('click', closeUserProfileModal);
  if (userProfileModal) {
    userProfileModal.addEventListener('click', (e) => {
      if (e.target === userProfileModal) closeUserProfileModal();
    });
  }

  if (logoutVisitorBtn) {
    logoutVisitorBtn.addEventListener('click', () => {
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(VIEWER_STORAGE_KEY);
      closeUserProfileModal();
      updateViewerDisplay();
      showToast('🔒 Signed out. Portfolio access locked.');
    });
  }

  if (authGateForm) {
    authGateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = gateVisitorName ? gateVisitorName.value.trim() : 'Visitor';
      const email = gateVisitorEmail ? gateVisitorEmail.value.trim() : '';
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      const selectedRole = authGateForm.querySelector('input[name="visitorPurpose"]:checked');
      const purpose = selectedRole ? selectedRole.value : 'Recruiter / Talent Partner';

      const userObj = {
        name: name,
        email: email,
        purpose: purpose,
        timestamp: new Date().toLocaleString()
      };

      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userObj));
      localStorage.setItem(VIEWER_STORAGE_KEY, email);
      recordVisitorEmail(email, name, purpose);

      unlockAccessGate(true);
      updateViewerDisplay();
      showToast(`🚀 Welcome to araknet.tech, ${name}! Access Authorized.`);
    });
  }

  if (gateOwnerBypassBtn) {
    gateOwnerBypassBtn.addEventListener('click', () => {
      openOwnerLoginModal();
    });
  }

  updateViewerDisplay();
  updateVisitorCountBadge();

  // ==========================================
  // 6. DYNAMIC CERTIFICATION MANAGEMENT SYSTEM
  // ==========================================
  const defaultCertificates = [
    {
      id: 'cert_szabist_ml_publication_2026',
      title: 'Machine Learning Research: Detection of Brute-Force Login Attempts',
      issuer: 'SZABIST Islamabad · IJICT Research Journal (Vol. 9)',
      date: 'Apr 2026',
      category: 'ai',
      image: 'assets/images/certificates/szabist-ijict-ml-research-publication.jpg'
    },
    {
      id: 'cert_google_python_crash_course',
      title: 'Crash Course on Python',
      issuer: 'Google (Coursera Accredited)',
      date: '29 Nov 2025',
      category: 'programming',
      image: 'assets/images/certificates/google-python-crash-course.jpg'
    },
    {
      id: 'cert_google_tech_support',
      title: 'Technical Support Fundamentals',
      issuer: 'Google (Coursera Accredited)',
      date: '24 Nov 2025',
      category: 'education',
      image: 'assets/images/certificates/google-technical-support-fundamentals.jpg'
    },
    {
      id: 'cert_aieys_web_dev_internship',
      title: 'Web Developer Internship Certification',
      issuer: 'AI-Explain You Science (AIEYS)',
      date: '11 Apr 2026',
      category: 'programming',
      image: 'assets/images/certificates/aieys-web-developer-internship.jpg'
    },
    {
      id: 'cert_city_science_college',
      title: 'Certificate of Academic Achievement',
      issuer: 'City Science School & College Multan',
      date: '08 May 2022',
      category: 'education',
      image: 'assets/images/certificates/city-science-college-achievement.jpg'
    },
    {
      id: 'cert_cisco_ai_2026',
      title: 'Introduction to Modern AI',
      issuer: 'Cisco Networking Academy',
      date: '28 Jan 2026',
      category: 'ai',
      image: 'assets/images/certificates/cisco-modern-ai.jpg'
    },
    {
      id: 'cert_harvard_cs50_python',
      title: "CS50's Intro to Programming with Python",
      issuer: 'Harvard University · David J. Malan',
      date: '2026',
      category: 'programming',
      image: 'assets/images/certificates/harvard-cs50-python.svg'
    },
    {
      id: 'cert_aieys_teaching_2026',
      title: 'AI-Enhanced Teaching Certification',
      issuer: 'AI-Explain You Science (AIEYS)',
      date: '11 Apr 2026',
      category: 'education',
      image: 'assets/images/certificates/aieys-ai-teaching.jpg'
    }
  ];

  const CERTS_STORAGE_KEY = 'araknet_portfolio_certificates_v3';

  function getStoredCertificates() {
    try {
      const stored = localStorage.getItem(CERTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read localStorage certificates:', e);
    }
    return [...defaultCertificates];
  }

  function saveStoredCertificates(certs) {
    try {
      localStorage.setItem(CERTS_STORAGE_KEY, JSON.stringify(certs));
    } catch (e) {
      console.warn('Could not save certificates to localStorage:', e);
    }
  }

  let currentCertificates = getStoredCertificates();
  let activeFilter = 'all';

  const certsGrid = document.getElementById('certsGrid');
  const countAll = document.getElementById('countAll');
  const countAI = document.getElementById('countAI');
  const countProg = document.getElementById('countProg');
  const countEdu = document.getElementById('countEdu');

  function updateFilterCounts() {
    if (countAll) countAll.textContent = currentCertificates.length;
    if (countAI) countAI.textContent = currentCertificates.filter(c => c.category === 'ai').length;
    if (countProg) countProg.textContent = currentCertificates.filter(c => c.category === 'programming').length;
    if (countEdu) countEdu.textContent = currentCertificates.filter(c => c.category === 'education').length;
  }

  function renderCertificates() {
    if (!certsGrid) return;

    updateFilterCounts();

    const filtered = activeFilter === 'all'
      ? currentCertificates
      : currentCertificates.filter(c => c.category === activeFilter);

    if (filtered.length === 0) {
      certsGrid.innerHTML = `
        <div class="glass-card" style="grid-column: 1 / -1; padding: 3rem; text-align: center;">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--accent-cyan); margin-bottom: 1rem;"></i>
          <h3>No certificates in this category</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">Select another category above.</p>
        </div>
      `;
      return;
    }

    const isOwner = document.body.classList.contains('owner-mode-active');

    certsGrid.innerHTML = filtered.map(cert => `
      <div class="cert-card glass-card" data-id="${cert.id}">
        <div class="cert-thumbnail-wrapper" onclick="window.openCertLightbox('${cert.id}')">
          <img src="${cert.image}" alt="${escapeHtml(cert.title)}" class="cert-thumbnail" loading="lazy" />
          <div class="cert-thumbnail-overlay">
            <i class="fa-solid fa-magnifying-glass-plus" style="font-size: 1.8rem;"></i>
            <span>Enlarge Certificate</span>
          </div>
          <span class="cert-cat-pill">${cert.category.toUpperCase()}</span>
        </div>

        <div class="cert-details">
          <h4 class="cert-card-title">${escapeHtml(cert.title)}</h4>
          <p class="cert-issuer">${escapeHtml(cert.issuer)}</p>
          <p class="cert-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(cert.date)}</p>
          
          <div class="cert-card-footer">
            <button type="button" class="btn btn-xs btn-outline" onclick="window.openCertLightbox('${cert.id}')">
              <i class="fa-solid fa-magnifying-glass-plus"></i> View Certificate
            </button>
            ${isOwner ? `
              <button class="cert-delete-btn" onclick="window.deleteCertificate('${cert.id}')" title="Remove this certificate">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll('#certFilters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderCertificates();
    });
  });

  // Lightbox Viewer
  const lightboxModal = document.getElementById('certLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxIssuer = document.getElementById('lightboxIssuer');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxDownloadBtn = document.getElementById('lightboxDownloadBtn');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  window.openCertLightbox = function(certId) {
    const cert = currentCertificates.find(c => c.id === certId);
    if (!cert) return;

    lightboxImg.src = cert.image;
    lightboxTitle.textContent = cert.title;
    lightboxIssuer.textContent = cert.issuer;
    lightboxDate.textContent = `Issued: ${cert.date}`;

    if (lightboxDownloadBtn) {
      lightboxDownloadBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = cert.image;
        const ext = cert.image.endsWith('.svg') ? 'svg' : (cert.image.endsWith('.png') ? 'png' : 'jpg');
        a.download = `${cert.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Certificate.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }

    lightboxModal.classList.add('active');
  };

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', () => lightboxModal.classList.remove('active'));
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
  }

  // Delete Certificate (Owner Only)
  window.deleteCertificate = function(certId) {
    const cert = currentCertificates.find(c => c.id === certId);
    const title = cert ? cert.title : 'this certificate';
    if (confirm(`Are you sure you want to remove "${title}"?`)) {
      currentCertificates = currentCertificates.filter(c => c.id !== certId);
      saveStoredCertificates(currentCertificates);
      renderCertificates();
      showToast(`Removed: "${title}"`);
    }
  };

  // Add Certificate Modal (Owner Only)
  const addCertModal = document.getElementById('addCertModal');
  const openAddCertModalBtn = document.getElementById('openAddCertModalBtn');
  const closeAddCertBtn = document.getElementById('closeAddCertBtn');
  const cancelAddCertBtn = document.getElementById('cancelAddCertBtn');
  const addCertForm = document.getElementById('addCertForm');
  const certFileInput = document.getElementById('certFileInput');
  const dropPrompt = document.getElementById('dropPrompt');
  const dropPreview = document.getElementById('dropPreview');
  const certPreviewImg = document.getElementById('certPreviewImg');
  const removeSelectedFileBtn = document.getElementById('removeSelectedFileBtn');
  const certUrlInput = document.getElementById('certUrlInput');

  let selectedImageBase64 = null;

  function openAddModal() {
    if (addCertModal) addCertModal.classList.add('active');
  }
  function closeAddModal() {
    if (addCertModal) addCertModal.classList.remove('active');
    if (addCertForm) addCertForm.reset();
    selectedImageBase64 = null;
    if (dropPreview) dropPreview.style.display = 'none';
    if (dropPrompt) dropPrompt.style.display = 'block';
  }

  if (openAddCertModalBtn) openAddCertModalBtn.addEventListener('click', openAddModal);
  if (closeAddCertBtn) closeAddCertBtn.addEventListener('click', closeAddModal);
  if (cancelAddCertBtn) cancelAddCertBtn.addEventListener('click', closeAddModal);
  if (addCertModal) {
    addCertModal.addEventListener('click', (e) => {
      if (e.target === addCertModal) closeAddModal();
    });
  }

  if (certFileInput) {
    certFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          selectedImageBase64 = event.target.result;
          certPreviewImg.src = selectedImageBase64;
          dropPrompt.style.display = 'none';
          dropPreview.style.display = 'flex';
          if (certUrlInput) certUrlInput.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeSelectedFileBtn) {
    removeSelectedFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedImageBase64 = null;
      if (certFileInput) certFileInput.value = '';
      if (dropPreview) dropPreview.style.display = 'none';
      if (dropPrompt) dropPrompt.style.display = 'block';
    });
  }

  if (addCertForm) {
    addCertForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('newCertTitle').value.trim();
      const issuer = document.getElementById('newCertIssuer').value.trim();
      const date = document.getElementById('newCertDate').value.trim();
      const category = document.getElementById('newCertCategory').value;
      const verifyUrlInput = document.getElementById('newCertVerifyUrl');
      const verifyUrl = verifyUrlInput ? verifyUrlInput.value.trim() : '';
      const urlInput = certUrlInput ? certUrlInput.value.trim() : '';

      const finalImage = selectedImageBase64 || urlInput || 'assets/images/certificates/cisco-modern-ai.svg';

      const newCert = {
        id: 'cert_' + Date.now(),
        title,
        issuer,
        date,
        category,
        image: finalImage,
        verifyUrl: verifyUrl || ''
      };

      currentCertificates.unshift(newCert);
      saveStoredCertificates(currentCertificates);
      renderCertificates();
      closeAddModal();
      showToast(`Added new certificate: "${title}"`);
    });
  }

  // Manage / Export / Reset Modal
  const manageCertsModal = document.getElementById('manageCertsModal');
  const openManageCertsBtn = document.getElementById('openManageCertsBtn');
  const closeManageCertsBtn = document.getElementById('closeManageCertsBtn');
  const copyCertsJsonBtn = document.getElementById('copyCertsJsonBtn');
  const resetCertsBtn = document.getElementById('resetCertsBtn');

  if (openManageCertsBtn) {
    openManageCertsBtn.addEventListener('click', () => manageCertsModal.classList.add('active'));
  }
  if (closeManageCertsBtn) {
    closeManageCertsBtn.addEventListener('click', () => manageCertsModal.classList.remove('active'));
  }
  if (manageCertsModal) {
    manageCertsModal.addEventListener('click', (e) => {
      if (e.target === manageCertsModal) manageCertsModal.classList.remove('active');
    });
  }

  if (copyCertsJsonBtn) {
    copyCertsJsonBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON.stringify(currentCertificates, null, 2))
        .then(() => showToast('Certificates JSON copied to clipboard!'))
        .catch(() => alert('Failed to copy JSON.'));
    });
  }

  if (resetCertsBtn) {
    resetCertsBtn.addEventListener('click', () => {
      if (confirm('Reset to default verified credentials (Cisco, Harvard, AIEYS)? Any custom added items will be restored.')) {
        localStorage.removeItem(CERTS_STORAGE_KEY);
        currentCertificates = [...defaultCertificates];
        renderCertificates();
        manageCertsModal.classList.remove('active');
        showToast('Restored default credentials');
      }
    });
  }

  renderCertificates();

  // ==========================================
  // 7. OWNER SECURITY GATE & LIVE PENCIL EDITOR (SECRET: Ctrl+Shift+E, PASSCODE: araknet2026)
  // ==========================================
  const EDITS_STORAGE_KEY = 'araknet_portfolio_custom_edits_v2';
  const OWNER_SESSION_KEY = 'araknet_owner_auth_session';
  const DEFAULT_PASSCODE = 'araknet2026';

  let customEdits = {};

  function loadCustomEdits() {
    try {
      const saved = localStorage.getItem(EDITS_STORAGE_KEY);
      if (saved) {
        customEdits = JSON.parse(saved);
        applyCustomEditsToDom();
      }
    } catch (e) {
      console.warn('Could not load custom edits:', e);
    }
  }

  function applyCustomEditsToDom() {
    document.querySelectorAll('[data-edit-key]').forEach(el => {
      const key = el.getAttribute('data-edit-key');
      if (customEdits[key] !== undefined) {
        el.innerHTML = customEdits[key];
      }
    });
  }

  loadCustomEdits();

  const adminAuthModal = document.getElementById('adminAuthModal');
  const adminAuthForm = document.getElementById('adminAuthForm');
  const adminPasscodeInput = document.getElementById('adminPasscodeInput');
  const closeAdminAuthBtn = document.getElementById('closeAdminAuthBtn');
  const ownerDock = document.getElementById('ownerDock');
  const certAdminActions = document.getElementById('certAdminActions');

  const saveEditsBtn = document.getElementById('saveEditsBtn');
  const exportHtmlBtn = document.getElementById('exportHtmlBtn');
  const resetEditsBtn = document.getElementById('resetEditsBtn');
  const lockOwnerBtn = document.getElementById('lockOwnerBtn');
  const viewVisitorsBtn = document.getElementById('viewVisitorsBtn');

  // Visitors Log Modal
  const visitorsLogModal = document.getElementById('visitorsLogModal');
  const closeVisitorsLogBtn = document.getElementById('closeVisitorsLogBtn');
  const visitorsList = document.getElementById('visitorsList');
  const clearVisitorsBtn = document.getElementById('clearVisitorsBtn');

  function openOwnerLoginModal() {
    if (adminAuthModal) {
      adminAuthModal.classList.add('active');
      setTimeout(() => {
        if (adminPasscodeInput) adminPasscodeInput.focus();
      }, 50);
    }
  }

  function closeOwnerLoginModal() {
    if (adminAuthModal) adminAuthModal.classList.remove('active');
    if (adminAuthForm) adminAuthForm.reset();
  }

  if (closeAdminAuthBtn) closeAdminAuthBtn.addEventListener('click', closeOwnerLoginModal);
  if (adminAuthModal) {
    adminAuthModal.addEventListener('click', (e) => {
      if (e.target === adminAuthModal) closeOwnerLoginModal();
    });
  }

  function enableOwnerMode() {
    document.body.classList.add('owner-mode-active');
    sessionStorage.setItem(OWNER_SESSION_KEY, 'active');
    if (ownerDock) ownerDock.style.display = 'flex';
    if (certAdminActions) certAdminActions.style.display = 'flex';
    
    const qaOwnerBar = document.getElementById('qaOwnerBar');
    if (qaOwnerBar) qaOwnerBar.style.display = 'flex';

    document.querySelectorAll('[data-edit-key]').forEach(el => {
      el.setAttribute('contenteditable', 'true');

      if (!el.querySelector('.pencil-badge')) {
        const badge = document.createElement('span');
        badge.className = 'pencil-badge';
        badge.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        badge.setAttribute('contenteditable', 'false');
        el.appendChild(badge);
      }

      el.oninput = () => {
        const key = el.getAttribute('data-edit-key');
        const clone = el.cloneNode(true);
        const b = clone.querySelector('.pencil-badge');
        if (b) b.remove();
        customEdits[key] = clone.innerHTML;
      };
    });

    renderCertificates();
    updateVisitorCountBadge();
    renderQAQuestions();
    updateQACounters();
    showToast('🔑 Owner Mode Unlocked! Click any text to edit.');
  }

  function disableOwnerMode() {
    document.body.classList.remove('owner-mode-active');
    sessionStorage.removeItem(OWNER_SESSION_KEY);
    if (ownerDock) ownerDock.style.display = 'none';
    if (certAdminActions) certAdminActions.style.display = 'none';

    const qaOwnerBar = document.getElementById('qaOwnerBar');
    if (qaOwnerBar) qaOwnerBar.style.display = 'none';

    document.querySelectorAll('[data-edit-key]').forEach(el => {
      el.removeAttribute('contenteditable');
      const badge = el.querySelector('.pencil-badge');
      if (badge) badge.remove();
    });

    renderCertificates();
    renderQAQuestions();
    updateQACounters();
    showToast('🔒 Owner Mode Locked. Portfolio is in View-Only mode.');
  }

  if (adminAuthForm) {
    adminAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = adminPasscodeInput.value.trim();
      if (entered === DEFAULT_PASSCODE) {
        closeOwnerLoginModal();
        enableOwnerMode();
        // Also unlock visitor access gate for owner
        const ownerUser = {
          name: 'Syed Ali Hussain',
          email: 'syedali6160@gmail.com',
          purpose: 'Portfolio Owner / AI Systems Builder',
          timestamp: new Date().toLocaleString()
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(ownerUser));
        localStorage.setItem(VIEWER_STORAGE_KEY, ownerUser.email);
        updateViewerDisplay();
        unlockAccessGate(true);
      } else {
        alert('Incorrect owner passcode.');
      }
    });
  }

  // Restore owner session if active in same browser session
  if (sessionStorage.getItem(OWNER_SESSION_KEY) === 'active') {
    enableOwnerMode();
  }

  // Secret Hotkey: Ctrl + Shift + E
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      if (document.body.classList.contains('owner-mode-active')) {
        disableOwnerMode();
      } else {
        openOwnerLoginModal();
      }
    }
  });

  // Dock Actions
  if (saveEditsBtn) {
    saveEditsBtn.addEventListener('click', () => {
      try {
        localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(customEdits));
        showToast('💾 All edits saved to browser storage!');
      } catch (err) {
        showToast('Error saving edits.');
      }
    });
  }

  if (resetEditsBtn) {
    resetEditsBtn.addEventListener('click', () => {
      if (confirm('Revert all custom text edits back to original defaults?')) {
        localStorage.removeItem(EDITS_STORAGE_KEY);
        customEdits = {};
        window.location.reload();
      }
    });
  }

  if (lockOwnerBtn) {
    lockOwnerBtn.addEventListener('click', disableOwnerMode);
  }

  if (exportHtmlBtn) {
    exportHtmlBtn.addEventListener('click', () => {
      const cloneDoc = document.documentElement.cloneNode(true);
      cloneDoc.classList.remove('owner-mode-active');
      const clonedBody = cloneDoc.querySelector('body');
      if (clonedBody) clonedBody.classList.remove('owner-mode-active');

      cloneDoc.querySelectorAll('.pencil-badge').forEach(b => b.remove());
      cloneDoc.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
      
      const cleanHtml = '<!DOCTYPE html>\n' + cloneDoc.outerHTML;
      const blob = new Blob([cleanHtml], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('📥 Clean updated index.html exported for deployment!');
    });
  }

  // View Visitors Modal (Owner Only)
  if (viewVisitorsBtn && visitorsLogModal) {
    viewVisitorsBtn.addEventListener('click', () => {
      const list = getVisitorsLog();
      if (visitorsList) {
        if (list.length === 0) {
          visitorsList.innerHTML = '<li style="color: var(--text-muted); text-align: center; padding: 1rem;">No registered viewer emails yet.</li>';
        } else {
          visitorsList.innerHTML = list.map(v => `
            <li class="visitor-item">
              <span class="visitor-email"><i class="fa-regular fa-envelope"></i> ${escapeHtml(v.email)}</span>
              <span class="visitor-time">${escapeHtml(v.timestamp)}</span>
            </li>
          `).join('');
        }
      }
      visitorsLogModal.classList.add('active');
    });
  }

  if (closeVisitorsLogBtn && visitorsLogModal) {
    closeVisitorsLogBtn.addEventListener('click', () => visitorsLogModal.classList.remove('active'));
    visitorsLogModal.addEventListener('click', (e) => {
      if (e.target === visitorsLogModal) visitorsLogModal.classList.remove('active');
    });
  }

  if (clearVisitorsBtn) {
    clearVisitorsBtn.addEventListener('click', () => {
      if (confirm('Clear registered visitors list?')) {
        localStorage.removeItem(VISITORS_LOG_KEY);
        updateVisitorCountBadge();
        if (visitorsList) visitorsList.innerHTML = '<li style="color: var(--text-muted); text-align: center; padding: 1rem;">No registered viewer emails yet.</li>';
        showToast('Visitor history cleared.');
      }
    });
  }

  // ==========================================
  // 8. RESUME MODAL VIEWER
  // ==========================================
  const resumeModal = document.getElementById('resumeModal');
  const openResumeModalBtn = document.getElementById('openResumeModalBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');

  if (openResumeModalBtn && resumeModal) {
    openResumeModalBtn.addEventListener('click', () => resumeModal.classList.add('active'));
  }
  if (closeResumeModalBtn && resumeModal) {
    closeResumeModalBtn.addEventListener('click', () => resumeModal.classList.remove('active'));
  }
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) resumeModal.classList.remove('active');
    });
  }

  // ==========================================
  // 9. COMMAND PALETTE (Ctrl+K)
  // ==========================================
  const cmdModal = document.getElementById('cmdPaletteModal');
  const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
  const cmdInput = document.getElementById('cmdInput');
  const cmdResults = document.getElementById('cmdResults');

  function openCmdPalette() {
    if (cmdModal) {
      cmdModal.classList.add('active');
      setTimeout(() => {
        if (cmdInput) {
          cmdInput.value = '';
          cmdInput.focus();
        }
      }, 50);
    }
  }

  function closeCmdPalette() {
    if (cmdModal) cmdModal.classList.remove('active');
  }

  if (cmdPaletteBtn) cmdPaletteBtn.addEventListener('click', openCmdPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal.classList.contains('active')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    } else if (e.key === 'Escape') {
      closeCmdPalette();
      if (lightboxModal) lightboxModal.classList.remove('active');
      if (projectModal) projectModal.classList.remove('active');
      if (adminAuthModal) closeOwnerLoginModal();
      if (viewerModal) closeViewerModal();
      if (visitorsLogModal) visitorsLogModal.classList.remove('active');
      if (addCertModal) closeAddModal();
      if (manageCertsModal) manageCertsModal.classList.remove('active');
      if (resumeModal) resumeModal.classList.remove('active');
    }
  });

  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmdPalette();
    });
  }

  if (cmdResults) {
    cmdResults.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (!item) return;

      const action = item.getAttribute('data-action');
      if (action === 'navigate') {
        const target = item.getAttribute('data-target');
        closeCmdPalette();
        const element = document.querySelector(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'copy') {
        const text = item.getAttribute('data-text');
        navigator.clipboard.writeText(text).then(() => {
          closeCmdPalette();
          showToast(`Copied: ${text}`);
        });
      } else if (action === 'link') {
        const url = item.getAttribute('data-url');
        window.open(url, '_blank');
        closeCmdPalette();
      }
    });
  }

  if (cmdInput && cmdResults) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query === 'admin' || query === '/owner' || query === 'owner') {
        closeCmdPalette();
        openOwnerLoginModal();
        return;
      }
      const items = cmdResults.querySelectorAll('.cmd-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // ==========================================
  // 10. TOAST NOTIFICATION SYSTEM & CLIPBOARD
  // ==========================================
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  document.querySelectorAll('.copy-email-btn, .copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-email') || btn.getAttribute('data-copy') || 'syedali6160@gmail.com';
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
      }).catch(() => {
        showToast(`Email: ${text}`);
      });
    });
  });

  // ==========================================
  // 11. CONTACT FORM HANDLER WITH ANTI-BOT SECURITY
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const sendBtnText = document.getElementById('sendBtnText');
  const sendBtnSpinner = document.getElementById('sendBtnSpinner');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const honeypot = contactForm.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) return;

      sendBtnText.style.display = 'none';
      sendBtnSpinner.style.display = 'inline-block';
      sendBtn.disabled = true;

      setTimeout(() => {
        sendBtnSpinner.style.display = 'none';
        sendBtnText.style.display = 'inline-block';
        sendBtn.disabled = false;

        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Transmission Prepared!</strong><br />
          Thank you ${escapeHtml(name)}. I will respond to <strong>${escapeHtml(email)}</strong> shortly.<br />
          <small>A direct mail client link has also been initialized for backup.</small>
        `;
        formFeedback.style.display = 'block';

        showToast('Message ready! Opening mail dispatch...');
        
        const mailtoUrl = `mailto:syedali6160@gmail.com?subject=${encodeURIComponent('[araknet.tech] ' + subject + ' - ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
        window.location.href = mailtoUrl;

        contactForm.reset();
      }, 1000);
    });
  }

  // ==========================================
  // 12. INTERACTIVE Q&A / DEVELOPER AMA ENGINE
  // ==========================================
  const QA_STORAGE_KEY = 'araknet_qa_questions_v1';
  const QA_UPVOTES_KEY = 'araknet_qa_upvotes_v1';
  const QA_SUBMISSIONS_KEY = 'araknet_qa_submissions_v1';

  const DEFAULT_QA_ITEMS = [
    {
      id: 'qa-seed-1',
      asker: 'Marcus Vance',
      email: 'marcus.vance@systemscale.io',
      category: 'AI Agents & LLMs',
      question: 'What inference architecture and optimizations do you use to keep NovaBrief latency consistently under 650ms?',
      timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
      status: 'answered',
      upvotes: 18,
      answer: {
        text: 'We combine Groq LPU inference using Llama 3.3 70B with token streaming distillation and prompt caching. Background jobs run via asynchronous APScheduler workers and Supabase/Redis caching, eliminating cold starts so readers receive instant 60-second summaries.',
        author: 'Syed Ali Hussain',
        role: 'AI Developer · Author',
        answeredAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString()
      }
    },
    {
      id: 'qa-seed-2',
      asker: 'Fatima Zahra',
      email: 'fatima.zahra@cloudtech.co',
      category: 'NovaBrief & Projects',
      question: 'How does your 24/7 autonomous email reply agent prevent hallucinations when handling critical customer inquiries?',
      timestamp: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
      status: 'answered',
      upvotes: 14,
      answer: {
        text: 'The agent enforces a deterministic RAG verification gate before any email is dispatched. Incoming inquiries are vectorized against a verified knowledge store; if cosine similarity is below 0.88 or sentiment is high-risk, the agent drafts the reply in staging and routes it to human review instead of auto-sending.',
        author: 'Syed Ali Hussain',
        role: 'AI Developer · Author',
        answeredAt: new Date(Date.now() - 3600 * 1000 * 8).toISOString()
      }
    },
    {
      id: 'qa-seed-3',
      asker: 'David Miller',
      email: 'david@stealthlaunch.com',
      category: 'Hiring & Collaboration',
      question: 'Are you available for international contract roles or freelance agentic AI engineering?',
      timestamp: new Date(Date.now() - 3600 * 1000 * 26).toISOString(),
      status: 'answered',
      upvotes: 22,
      answer: {
        text: 'Yes! I actively collaborate with global founders, startups, and engineering teams on custom LLM agent pipelines, n8n orchestrations, and full-stack AI SaaS development. Feel free to use the transmission form below or email me directly at syedali6160@gmail.com.',
        author: 'Syed Ali Hussain',
        role: 'AI Developer · Author',
        answeredAt: new Date(Date.now() - 3600 * 1000 * 20).toISOString()
      }
    }
  ];

  function getQAQuestions() {
    try {
      const stored = localStorage.getItem(QA_STORAGE_KEY);
      if (stored) {
        let items = JSON.parse(stored);
        let updated = false;
        items.forEach(item => {
          if (item.answer && item.answer.author === 'Syed Ali') {
            item.answer.author = 'Syed Ali Hussain';
            updated = true;
          }
        });
        if (updated) saveQAQuestions(items);
        return items;
      }
    } catch (e) {
      console.warn('Error reading QA storage:', e);
    }
    localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(DEFAULT_QA_ITEMS));
    return DEFAULT_QA_ITEMS;
  }

  function saveQAQuestions(questions) {
    try {
      localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(questions));
    } catch (e) {
      console.warn('Error saving QA storage:', e);
    }
    updateQACounters();
  }

  function getUpvotedIds() {
    try {
      const stored = localStorage.getItem(QA_UPVOTES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUpvotedIds(ids) {
    localStorage.setItem(QA_UPVOTES_KEY, JSON.stringify(ids));
  }

  function getMySubmissions() {
    try {
      const stored = localStorage.getItem(QA_SUBMISSIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function addMySubmission(id) {
    const subs = getMySubmissions();
    subs.push(id);
    localStorage.setItem(QA_SUBMISSIONS_KEY, JSON.stringify(subs));
  }

  let currentQAFilter = 'all';
  let currentQASearch = '';

  const qaQuestionsList = document.getElementById('qaQuestionsList');
  const qaSearchInput = document.getElementById('qaSearchInput');
  const qaFilterTabs = document.getElementById('qaFilterTabs');
  const qaAskForm = document.getElementById('qaAskForm');
  const qaCharCounter = document.getElementById('qaCharCounter');
  const qaQuestionInput = document.getElementById('qaQuestionInput');
  const qaFormFeedback = document.getElementById('qaFormFeedback');
  const qaSubmitBtn = document.getElementById('qaSubmitBtn');
  const qaSubmitText = document.getElementById('qaSubmitText');
  const qaSubmitSpinner = document.getElementById('qaSubmitSpinner');
  const qaAnswerModal = document.getElementById('qaAnswerModal');
  const closeQaAnswerBtn = document.getElementById('closeQaAnswerBtn');
  const qaAnswerForm = document.getElementById('qaAnswerForm');
  const qaAnswerTextarea = document.getElementById('qaAnswerTextarea');
  const qaAnswerTargetId = document.getElementById('qaAnswerTargetId');
  const qaEmailAskerBtn = document.getElementById('qaEmailAskerBtn');
  const qaCreateModal = document.getElementById('qaCreateModal');
  const closeQaCreateBtn = document.getElementById('closeQaCreateBtn');
  const qaCreateForm = document.getElementById('qaCreateForm');
  const qaAddCustomBtn = document.getElementById('qaAddCustomBtn');
  const qaFilterPendingBtn = document.getElementById('qaFilterPendingBtn');
  const qaOwnerDockBtn = document.getElementById('qaOwnerDockBtn');

  function timeAgo(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function updateQACounters() {
    const questions = getQAQuestions();
    const mySubs = getMySubmissions();

    const total = questions.length;
    const pending = questions.filter(q => q.status === 'pending').length;
    const answered = questions.filter(q => q.status === 'answered').length;

    const countAllEl = document.getElementById('qaCountAll');
    if (countAllEl) countAllEl.textContent = total;

    const statTotal = document.getElementById('qaStatTotal');
    const statPending = document.getElementById('qaStatPending');
    const statAnswered = document.getElementById('qaStatAnswered');
    const qaPendingCountDock = document.getElementById('qaPendingCount');

    if (statTotal) statTotal.textContent = total;
    if (statPending) statPending.textContent = pending;
    if (statAnswered) statAnswered.textContent = answered;
    if (qaPendingCountDock) qaPendingCountDock.textContent = pending;

    const myTab = document.getElementById('qaMyQuestionsTab');
    const myCount = document.getElementById('qaMyCount');
    if (myTab && myCount) {
      if (mySubs.length > 0) {
        myTab.style.display = 'inline-block';
        myCount.textContent = mySubs.length;
      } else {
        myTab.style.display = 'none';
      }
    }
  }

  function renderQAQuestions() {
    if (!qaQuestionsList) return;

    const questions = getQAQuestions();
    const isOwner = document.body.classList.contains('owner-mode-active');
    const upvotedIds = getUpvotedIds();
    const mySubs = getMySubmissions();

    let filtered = questions.slice();

    // Owner vs Public visibility:
    // If not owner, only show answered questions OR questions submitted by this specific browser
    if (!isOwner && currentQAFilter !== 'my-questions') {
      filtered = filtered.filter(q => q.status === 'answered' || mySubs.includes(q.id));
    }

    // Apply Tab Filter
    if (currentQAFilter === 'pending') {
      filtered = filtered.filter(q => q.status === 'pending');
    } else if (currentQAFilter === 'my-questions') {
      filtered = filtered.filter(q => mySubs.includes(q.id));
    } else if (currentQAFilter !== 'all') {
      filtered = filtered.filter(q => q.category === currentQAFilter);
    }

    // Apply Search Query
    if (currentQASearch) {
      const q = currentQASearch.toLowerCase();
      filtered = filtered.filter(item => {
        const inQuestion = item.question.toLowerCase().includes(q);
        const inAsker = item.asker.toLowerCase().includes(q);
        const inCat = item.category.toLowerCase().includes(q);
        const inAnswer = item.answer && item.answer.text.toLowerCase().includes(q);
        return inQuestion || inAsker || inCat || inAnswer;
      });
    }

    // Sort: Pending first if owner, otherwise newest first
    filtered.sort((a, b) => {
      if (isOwner) {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
      }
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    if (filtered.length === 0) {
      qaQuestionsList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-secondary);">
          <i class="fa-regular fa-comment-dots" style="font-size: 2.4rem; color: var(--accent-cyan); margin-bottom: 0.8rem; display: block;"></i>
          <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 0.3rem;">No questions found</h4>
          <p style="font-size: 0.85rem;">Be the first to ask! Use the transmission box on the left to drop your question to Syed Ali Hussain.</p>
        </div>
      `;
      return;
    }

    qaQuestionsList.innerHTML = filtered.map(item => {
      const isUpvoted = upvotedIds.includes(item.id);
      const isPending = item.status === 'pending';
      const initials = item.asker.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'Q';

      let answerHtml = '';
      if (isPending) {
        answerHtml = `
          <div class="qa-pending-block">
            <i class="fa-solid fa-hourglass-half"></i>
            <span>In Syed Ali Hussain's Review Queue · Typically answered within 24h</span>
          </div>
        `;
      } else if (item.answer) {
        answerHtml = `
          <div class="qa-answer-block">
            <div class="qa-answer-author-row">
              <div class="qa-author-identity">
                <img src="assets/images/syed-ali.jpg" alt="Syed Ali Hussain" class="qa-author-thumbnail" />
                <span class="qa-author-name">Syed Ali Hussain</span>
                <i class="fa-solid fa-circle-check qa-verified-chip" title="Verified AI Developer"></i>
                <span class="qa-author-role">${escapeHtml(item.answer.role || 'Author')}</span>
              </div>
              <span class="qa-time-tag">${timeAgo(item.answer.answeredAt || item.timestamp)}</span>
            </div>
            <div class="qa-answer-body">
              ${escapeHtml(item.answer.text)}
            </div>
          </div>
        `;
      }

      const adminControlsHtml = `
        <div class="qa-admin-actions">
          <button class="btn btn-xs ${isPending ? 'btn-primary' : 'btn-outline'} qa-answer-trigger-btn" data-id="${item.id}" title="${isPending ? 'Answer this question' : 'Edit your answer'}">
            <i class="fa-solid ${isPending ? 'fa-pen-nib' : 'fa-pencil'}"></i> ${isPending ? 'Answer' : 'Edit'}
          </button>
          ${item.email ? `
            <a href="mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent('[araknet.tech] Reply to your question: ' + item.question.substring(0, 50))}" class="btn btn-xs btn-outline" title="Email asker directly">
              <i class="fa-solid fa-envelope"></i>
            </a>
          ` : ''}
          <button class="btn btn-xs btn-danger qa-delete-trigger-btn" data-id="${item.id}" title="Delete question">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      return `
        <div class="qa-item-card ${isPending ? 'is-pending' : ''}" data-id="${item.id}">
          <div class="qa-item-top">
            <div class="qa-asker-badge">
              <div class="qa-asker-avatar">${escapeHtml(initials)}</div>
              <span class="qa-asker-name">${escapeHtml(item.asker)}</span>
            </div>
            <span class="qa-category-tag">${escapeHtml(item.category)}</span>
            <span class="qa-time-tag">${timeAgo(item.timestamp)}</span>
          </div>

          <div class="qa-question-content">
            "${escapeHtml(item.question)}"
          </div>

          ${answerHtml}

          <div class="qa-item-bottom">
            <button class="qa-upvote-btn ${isUpvoted ? 'upvoted' : ''}" data-id="${item.id}">
              <i class="fa-solid fa-thumbs-up"></i>
              <span>Helpful</span>
              <span class="qa-upvote-count">${item.upvotes || 0}</span>
            </button>

            ${adminControlsHtml}
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to upvote buttons
    qaQuestionsList.querySelectorAll('.qa-upvote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        toggleUpvote(id);
      });
    });

    // Attach click listeners to owner action buttons
    qaQuestionsList.querySelectorAll('.qa-answer-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openAnswerModal(id);
      });
    });

    qaQuestionsList.querySelectorAll('.qa-delete-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteQuestion(id);
      });
    });
  }

  function toggleUpvote(id) {
    const questions = getQAQuestions();
    const upvotedIds = getUpvotedIds();
    const q = questions.find(item => item.id === id);
    if (!q) return;

    if (upvotedIds.includes(id)) {
      q.upvotes = Math.max(0, (q.upvotes || 1) - 1);
      const index = upvotedIds.indexOf(id);
      if (index > -1) upvotedIds.splice(index, 1);
    } else {
      q.upvotes = (q.upvotes || 0) + 1;
      upvotedIds.push(id);
      showToast('👍 Marked as helpful!');
    }

    saveQAQuestions(questions);
    saveUpvotedIds(upvotedIds);
    renderQAQuestions();
  }

  function openAnswerModal(id) {
    const questions = getQAQuestions();
    const q = questions.find(item => item.id === id);
    if (!q) return;

    qaAnswerTargetId.value = q.id;
    document.getElementById('qaModalAsker').textContent = q.asker;
    document.getElementById('qaModalCategory').textContent = q.category;
    document.getElementById('qaModalQuestionText').textContent = `"${q.question}"`;
    document.getElementById('qaModalTime').textContent = timeAgo(q.timestamp);

    const emailRow = document.getElementById('qaModalEmailRow');
    const emailEl = document.getElementById('qaModalEmail');
    if (q.email) {
      emailRow.style.display = 'block';
      emailEl.textContent = q.email;
      if (qaEmailAskerBtn) {
        qaEmailAskerBtn.style.display = 'inline-flex';
        qaEmailAskerBtn.onclick = () => {
          const mailto = `mailto:${encodeURIComponent(q.email)}?subject=${encodeURIComponent('[araknet.tech] Syed Ali Hussain Answer: ' + q.question.substring(0, 40))}&body=${encodeURIComponent('Hi ' + q.asker + ',\n\nRegarding your question: "' + q.question + '"\n\n' + (qaAnswerTextarea.value || ''))}`;
          window.location.href = mailto;
        };
      }
    } else {
      emailRow.style.display = 'none';
      if (qaEmailAskerBtn) qaEmailAskerBtn.style.display = 'none';
    }

    qaAnswerTextarea.value = (q.answer && q.answer.text) ? q.answer.text : '';
    qaAnswerModal.classList.add('active');
    setTimeout(() => qaAnswerTextarea.focus(), 80);
  }

  function closeAnswerModal() {
    if (qaAnswerModal) qaAnswerModal.classList.remove('active');
    if (qaAnswerForm) qaAnswerForm.reset();
  }

  if (closeQaAnswerBtn) closeQaAnswerBtn.addEventListener('click', closeAnswerModal);
  if (qaAnswerModal) {
    qaAnswerModal.addEventListener('click', (e) => {
      if (e.target === qaAnswerModal) closeAnswerModal();
    });
  }

  if (qaAnswerForm) {
    qaAnswerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = qaAnswerTargetId.value;
      const answerText = qaAnswerTextarea.value.trim();
      if (!id || !answerText) return;

      const questions = getQAQuestions();
      const q = questions.find(item => item.id === id);
      if (q) {
        q.status = 'answered';
        q.answer = {
          text: answerText,
          author: 'Syed Ali Hussain',
          role: 'AI Developer · Author',
          answeredAt: new Date().toISOString()
        };
        saveQAQuestions(questions);
        renderQAQuestions();
        closeAnswerModal();
        showToast('🚀 Answer published to live portfolio!');
      }
    });
  }

  function deleteQuestion(id) {
    if (!confirm('Are you sure you want to delete this question?')) return;
    let questions = getQAQuestions();
    questions = questions.filter(item => item.id !== id);
    saveQAQuestions(questions);
    renderQAQuestions();
    showToast('🗑️ Question deleted.');
  }

  // Question Character Counter
  if (qaQuestionInput && qaCharCounter) {
    qaQuestionInput.addEventListener('input', () => {
      const len = qaQuestionInput.value.length;
      qaCharCounter.textContent = `${len} / 400`;
      if (len > 350) {
        qaCharCounter.classList.add('near-limit');
      } else {
        qaCharCounter.classList.remove('near-limit');
      }
    });
  }

  // Question Form Submission (Public Visitor)
  if (qaAskForm) {
    qaAskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('qaAskerName').value.trim();
      const email = document.getElementById('qaAskerEmail').value.trim();
      const category = document.getElementById('qaCategorySelect').value;
      const question = qaQuestionInput.value.trim();

      if (!name || !email || !question) return;

      qaSubmitText.style.display = 'none';
      qaSubmitSpinner.style.display = 'inline-block';
      qaSubmitBtn.disabled = true;

      setTimeout(() => {
        qaSubmitSpinner.style.display = 'none';
        qaSubmitText.style.display = 'inline-block';
        qaSubmitBtn.disabled = false;

        const newId = 'qa_' + Date.now();
        const newQuestion = {
          id: newId,
          asker: name,
          email: email,
          category: category,
          question: question,
          timestamp: new Date().toISOString(),
          status: 'pending',
          upvotes: 1,
          answer: null
        };

        const questions = getQAQuestions();
        questions.unshift(newQuestion);
        saveQAQuestions(questions);
        addMySubmission(newId);

        qaFormFeedback.className = 'qa-feedback success';
        qaFormFeedback.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Question Transmitted!</strong><br />
          Thank you ${escapeHtml(name)}. Your question is in Syed Ali Hussain's queue and will appear with an answer shortly.
        `;
        qaFormFeedback.style.display = 'block';

        showToast('🚀 Question sent to Syed Ali Hussain! In queue for review.');
        qaAskForm.reset();
        if (qaCharCounter) qaCharCounter.textContent = '0 / 400';

        renderQAQuestions();

        setTimeout(() => {
          const newCard = qaQuestionsList.querySelector(`[data-id="${newId}"]`);
          if (newCard) {
            newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            newCard.style.boxShadow = '0 0 25px rgba(0, 245, 212, 0.5)';
            newCard.style.borderColor = 'var(--accent-cyan)';
            setTimeout(() => { 
              newCard.style.boxShadow = '';
              newCard.style.borderColor = '';
            }, 3000);
          }
        }, 120);

        setTimeout(() => {
          if (qaFormFeedback) qaFormFeedback.style.display = 'none';
        }, 8000);
      }, 700);
    });
  }

  // Filter Tabs
  if (qaFilterTabs) {
    qaFilterTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.qa-filter-btn');
      if (!btn) return;

      qaFilterTabs.querySelectorAll('.qa-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentQAFilter = btn.getAttribute('data-filter');
      renderQAQuestions();
    });
  }

  // Search Input
  if (qaSearchInput) {
    qaSearchInput.addEventListener('input', (e) => {
      currentQASearch = e.target.value.trim();
      renderQAQuestions();
    });
  }

  // Owner Filter Pending Button
  if (qaFilterPendingBtn) {
    qaFilterPendingBtn.addEventListener('click', () => {
      currentQAFilter = 'pending';
      if (qaFilterTabs) {
        qaFilterTabs.querySelectorAll('.qa-filter-btn').forEach(b => b.classList.remove('active'));
      }
      renderQAQuestions();
      showToast('⏳ Displaying pending questions awaiting your answer');
    });
  }

  // Owner Dock Q&A Button
  if (qaOwnerDockBtn) {
    qaOwnerDockBtn.addEventListener('click', () => {
      const qaSection = document.getElementById('qa');
      if (qaSection) qaSection.scrollIntoView({ behavior: 'smooth' });
      currentQAFilter = 'pending';
      renderQAQuestions();
    });
  }

  // Owner Custom Q&A Creation Modal
  if (qaAddCustomBtn && qaCreateModal) {
    qaAddCustomBtn.addEventListener('click', () => {
      qaCreateModal.classList.add('active');
    });
  }

  if (closeQaCreateBtn) {
    closeQaCreateBtn.addEventListener('click', () => {
      if (qaCreateModal) qaCreateModal.classList.remove('active');
    });
  }

  if (qaCreateModal) {
    qaCreateModal.addEventListener('click', (e) => {
      if (e.target === qaCreateModal) qaCreateModal.classList.remove('active');
    });
  }

  if (qaCreateForm) {
    qaCreateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const asker = document.getElementById('qaNewAsker').value.trim();
      const category = document.getElementById('qaNewCategory').value;
      const question = document.getElementById('qaNewQuestion').value.trim();
      const answer = document.getElementById('qaNewAnswer').value.trim();

      if (!asker || !question || !answer) return;

      const newQ = {
        id: 'qa_faq_' + Date.now(),
        asker: asker,
        email: 'syedali6160@gmail.com',
        category: category,
        question: question,
        timestamp: new Date().toISOString(),
        status: 'answered',
        upvotes: 5,
        answer: {
          text: answer,
          author: 'Syed Ali Hussain',
          role: 'AI Developer · Author',
          answeredAt: new Date().toISOString()
        }
      };

      const questions = getQAQuestions();
      questions.unshift(newQ);
      saveQAQuestions(questions);
      renderQAQuestions();
      if (qaCreateModal) qaCreateModal.classList.remove('active');
      qaCreateForm.reset();
      showToast('✅ New Q&A published to live feed!');
    });
  }

  // Initial Q&A Render & Counters
  renderQAQuestions();
  updateQACounters();

  // ==========================================
  // 13. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (mobileDrawer.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // ==========================================
  // 13. CUSTOM FUTURISTIC CURSOR (DESKTOP)
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorDot && cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      cursorGlow.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 350, fill: 'forwards' });
    });

    document.querySelectorAll('a, button, input, select, textarea, .cert-thumbnail-wrapper, .project-card-img-wrapper').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '55px';
        cursorGlow.style.height = '55px';
        cursorGlow.style.borderColor = 'rgba(0, 245, 212, 0.9)';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '36px';
        cursorGlow.style.height = '36px';
        cursorGlow.style.borderColor = 'rgba(0, 194, 255, 0.6)';
      });
    });
  }
});
