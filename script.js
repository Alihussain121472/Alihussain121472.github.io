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
      'Indie Builder',
      'Automation Engineer',
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
      subtitle: 'Daily AI-Powered Intelligence Briefings & Student Program Tracking',
      pitch: 'An automated morning intelligence briefing platform for students that filters out internet noise and generates instant 60-second AI summaries of fellowships, tech breakthroughs, and student programs.',
      skills: [
        'LLM Prompt Engineering & Distillation',
        'Sub-second Inference Orchestration',
        'Asynchronous Background Cron Architecture',
        'Relational Schema & Vector Modeling',
        'Automated Content Curation Pipeline',
        'Student Opportunity Scraping & Triage'
      ],
      tools: [
        'Python', 'Flask', 'Llama 3.3 (70B)', 'Groq Cloud API',
        'Supabase', 'PostgreSQL', 'APScheduler', 'Tailwind CSS',
        'Gunicorn', 'RESTful Endpoints'
      ],
      sites: [
        { label: 'Live SaaS Application', url: 'https://www.novabrief.tech' },
        { label: 'Groq Cloud Inference Engine', url: 'https://groq.com' },
        { label: 'Supabase Cloud Database', url: 'https://supabase.com' },
        { label: 'Render Cloud Deployment', url: 'https://render.com' },
        { label: 'GitHub Repository', url: 'https://github.com/Alihussain121472' }
      ],
      metrics: [
        'Sub-second (<650ms) Llama 3.3 generation latency via Groq',
        '500+ active student readers receiving curated digests',
        'Hourly background scraper operates with 0 manual intervention',
        '99.8% server uptime maintained across academic cycles'
      ],
      actions: [
        { label: 'Visit Live novabrief.tech', url: 'https://www.novabrief.tech', primary: true, icon: 'fa-globe' },
        { label: 'GitHub Profile', url: 'https://github.com/Alihussain121472', primary: false, icon: 'fa-brands fa-github' }
      ]
    },
    'email-agent': {
      category: 'AUTONOMOUS WORKFLOW · AI AGENT',
      title: 'NovaBrief Email Reply Agent',
      subtitle: 'Autonomous Context-Aware Inbox Assistant Built with n8n & LLMs',
      pitch: 'A 24/7 autonomous inbox assistant that reads incoming support & business emails, understands intent, and drafts contextual human-like replies with zero manual effort.',
      skills: [
        'Event-Driven Webhook Architecture',
        'Multi-Step Agent Reasoning & Intent Triage',
        'Anti-Hallucination Guardrails & Fallbacks',
        'Email Context Parsing & Entity Extraction',
        'JSON Schema Validation & Error Recovery',
        'Human-in-the-Loop Quality Gates'
      ],
      tools: [
        'n8n Workflow Automation', 'Groq API', 'Llama 3.3',
        'Gmail API / IMAP', 'Webhooks', 'Docker',
        'Node.js Runtime', 'JSON Schema'
      ],
      sites: [
        { label: 'n8n Workflow Platform', url: 'https://n8n.io' },
        { label: 'Google Cloud Platform OAuth', url: 'https://console.cloud.google.com' },
        { label: 'Groq Fast LLM Inference', url: 'https://groq.com' },
        { label: 'NovaBrief Webhook Ingestion', url: 'https://www.novabrief.tech' }
      ],
      metrics: [
        '94% automated resolution rate on routine queries',
        'Under 10 seconds from email receipt to generated draft',
        'Eliminated an estimated 15+ hours of weekly manual inbox toil',
        'Zero security incidents via strict token isolation'
      ],
      actions: [
        { label: 'View GitHub Workflows', url: 'https://github.com/Alihussain121472', primary: true, icon: 'fa-brands fa-github' },
        { label: 'Contact About Custom n8n Build', url: '#contact', primary: false, icon: 'fa-envelope' }
      ]
    },
    'dha-agent': {
      category: 'VERTICAL SAAS · REAL ESTATE AI',
      title: 'DHA Multan Real Estate AI Agent',
      subtitle: '24/7 Intelligent Property Valuation & Investor Consultation Assistant',
      pitch: 'An on-demand property advisory agent that answers plot inquiries, compares sector pricing trends, and calculates transfer fees for DHA Multan investors and overseas buyers.',
      skills: [
        'Domain-Specific RAG Knowledge Engineering',
        'Real Estate Financial Valuation & ROI Modeling',
        'Urdu & English Conversational NLP',
        'Sector Liquidity & Growth Forecasting',
        'Automated Transfer Fee & Tax Calculations'
      ],
      tools: [
        'Python', 'Anthropic Claude API', 'n8n',
        'Vector Embeddings', 'SQLite / PostgreSQL', 'FastAPI',
        'HTML5 / CSS3 Responsive UI'
      ],
      sites: [
        { label: 'DHA Multan Official Reference', url: 'https://www.dhamultan.org' },
        { label: 'Anthropic Claude Engine', url: 'https://anthropic.com' },
        { label: 'GitHub Repository', url: 'https://github.com/Alihussain121472' },
        { label: 'Portfolio Host (araknet.tech)', url: 'https://araknet.tech' }
      ],
      metrics: [
        'Covers all 20+ residential and commercial sectors in DHA Multan',
        'Zero downtime query resolution for overseas Pakistani buyers',
        'Instantaneous calculation of transfer taxes, CVT, and stamp duties',
        'High investor satisfaction during pilot phase'
      ],
      actions: [
        { label: 'Request Demo / Consultation', url: '#contact', primary: true, icon: 'fa-envelope' },
        { label: 'GitHub Profile', url: 'https://github.com/Alihussain121472', primary: false, icon: 'fa-brands fa-github' }
      ]
    },
    'khidmat-ai': {
      category: 'CIVIC TECH · PUBLIC ASSISTANCE',
      title: 'Khidmat AI — Civic Assistance',
      subtitle: 'AI-Powered Citizen Guidance & Public Administrative Support',
      pitch: 'A civic assistance application that helps citizens effortlessly understand government procedures, draft public service requests, and resolve utility disputes in everyday language.',
      skills: [
        'Multi-Lingual Public Service Triage',
        'Legal & Procedural Prompt Structuring',
        'Document Checklist Automation',
        'Web Security & Accessible UI Design'
      ],
      tools: [
        'Python', 'Django Framework', 'Open-Source LLMs',
        'REST APIs', 'SQLite / PostgreSQL', 'Bootstrap 5'
      ],
      sites: [
        { label: 'Citizen Service Portals Reference', url: 'https://pakistan.gov.pk' },
        { label: 'GitHub Codebase', url: 'https://github.com/Alihussain121472' },
        { label: 'Render Cloud Deployment', url: 'https://render.com' }
      ],
      metrics: [
        '1,200+ public service inquiries assisted',
        'Average response latency under 1.4 seconds',
        '100% free accessibility for citizens with zero user paywalls'
      ],
      actions: [
        { label: 'View on GitHub', url: 'https://github.com/Alihussain121472', primary: true, icon: 'fa-brands fa-github' },
        { label: 'Contact Syed Ali', url: '#contact', primary: false, icon: 'fa-envelope' }
      ]
    },
    'seo-agent': {
      category: 'GROWTH ENGINE · AUTOMATION PIPELINE',
      title: 'Autonomous SEO & Content Agent',
      subtitle: 'End-to-End Competitor SERP Analysis & E-E-A-T Content Structuring',
      pitch: 'An automated pipeline that scrapes top-ranking Google search competitors, extracts keyword entity gaps, and structures high-ranking articles in minutes instead of days.',
      skills: [
        'Automated SERP Scraping & Parsing',
        'Semantic Entity & N-Gram Extraction',
        'Google E-E-A-T Signal Optimization',
        'Structured Schema JSON-LD Generation',
        'Internal Link Graph Construction'
      ],
      tools: [
        'Python', 'BeautifulSoup4', 'Playwright',
        'Groq / Llama 3.3', 'Markdown AST Engine', 'RegEx'
      ],
      sites: [
        { label: 'Google Search Console Connectors', url: 'https://search.google.com' },
        { label: 'Schema.org Standards', url: 'https://schema.org' },
        { label: 'GitHub Repository', url: 'https://github.com/Alihussain121472' }
      ],
      metrics: [
        '85% reduction in manual content structuring and research time',
        'Over 4,500 semantic keywords processed per client batch',
        'Generated Schema markup passes 100% Google Rich Results tests'
      ],
      actions: [
        { label: 'View GitHub Repository', url: 'https://github.com/Alihussain121472', primary: true, icon: 'fa-brands fa-github' },
        { label: 'Consult on SEO Pipeline', url: '#contact', primary: false, icon: 'fa-envelope' }
      ]
    }
  };

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
  // 5. VIEWER ACCESS (PUBLIC USERS LOGIN WITH EMAIL)
  // ==========================================
  const VIEWER_STORAGE_KEY = 'araknet_viewer_email_v1';
  const VISITORS_LOG_KEY = 'araknet_visitors_log_v1';

  const viewerModal = document.getElementById('viewerModal');
  const viewerAccessBtn = document.getElementById('viewerAccessBtn');
  const mobileViewerBtn = document.getElementById('mobileViewerBtn');
  const closeViewerModalBtn = document.getElementById('closeViewerModalBtn');
  const viewerForm = document.getElementById('viewerForm');
  const viewerEmailInput = document.getElementById('viewerEmailInput');
  const viewerStatusText = document.getElementById('viewerStatusText');

  function getVisitorsLog() {
    try {
      const stored = localStorage.getItem(VISITORS_LOG_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function recordVisitorEmail(email) {
    try {
      const list = getVisitorsLog();
      const existing = list.find(v => v.email.toLowerCase() === email.toLowerCase());
      if (!existing) {
        list.unshift({ email, timestamp: new Date().toLocaleString() });
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

  function updateViewerDisplay() {
    const currentViewer = localStorage.getItem(VIEWER_STORAGE_KEY);
    if (currentViewer && viewerStatusText) {
      const shortName = currentViewer.split('@')[0];
      viewerStatusText.textContent = `Viewer: ${shortName}`;
      viewerAccessBtn.classList.add('active');
    }
  }

  function openViewerModal() {
    if (viewerModal) {
      viewerModal.classList.add('active');
      setTimeout(() => {
        if (viewerEmailInput) viewerEmailInput.focus();
      }, 50);
    }
  }

  function closeViewerModal() {
    if (viewerModal) viewerModal.classList.remove('active');
  }

  if (viewerAccessBtn) viewerAccessBtn.addEventListener('click', openViewerModal);
  if (mobileViewerBtn) mobileViewerBtn.addEventListener('click', openViewerModal);
  if (closeViewerModalBtn) closeViewerModalBtn.addEventListener('click', closeViewerModal);
  if (viewerModal) {
    viewerModal.addEventListener('click', (e) => {
      if (e.target === viewerModal) closeViewerModal();
    });
  }

  if (viewerForm) {
    viewerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = viewerEmailInput.value.trim();
      if (email && email.includes('@')) {
        localStorage.setItem(VIEWER_STORAGE_KEY, email);
        recordVisitorEmail(email);
        updateViewerDisplay();
        closeViewerModal();
        showToast(`Welcome ${email}! Viewer Pass activated.`);
      }
    });
  }

  updateViewerDisplay();
  updateVisitorCountBadge();

  // ==========================================
  // 6. DYNAMIC CERTIFICATION MANAGEMENT SYSTEM
  // ==========================================
  const defaultCertificates = [
    {
      id: 'cert_cisco_ai_2026',
      title: 'Introduction to Modern AI',
      issuer: 'Cisco Networking Academy',
      date: '28 Jan 2026',
      category: 'ai',
      image: 'assets/images/certificates/cisco-modern-ai.svg',
      verifyUrl: 'https://www.netacad.com'
    },
    {
      id: 'cert_harvard_cs50_python',
      title: "CS50's Intro to Programming with Python",
      issuer: 'Harvard University · David J. Malan',
      date: '2026',
      category: 'programming',
      image: 'assets/images/certificates/harvard-cs50-python.svg',
      verifyUrl: 'https://cs50.harvard.edu/python/'
    },
    {
      id: 'cert_aieys_teaching_2026',
      title: 'AI-Enhanced Teaching Certification',
      issuer: 'AI-Explain You Science (AIEYS)',
      date: '11 Apr 2026',
      category: 'education',
      image: 'assets/images/certificates/aieys-ai-teaching.svg',
      verifyUrl: 'https://aieys.org'
    }
  ];

  const CERTS_STORAGE_KEY = 'araknet_portfolio_certificates_v1';

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
            <a href="${cert.verifyUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-outline">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Verify Credential
            </a>
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
  const lightboxVerifyBtn = document.getElementById('lightboxVerifyBtn');
  const lightboxDownloadBtn = document.getElementById('lightboxDownloadBtn');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  window.openCertLightbox = function(certId) {
    const cert = currentCertificates.find(c => c.id === certId);
    if (!cert) return;

    lightboxImg.src = cert.image;
    lightboxTitle.textContent = cert.title;
    lightboxIssuer.textContent = cert.issuer;
    lightboxDate.textContent = `Issued: ${cert.date}`;
    lightboxVerifyBtn.href = cert.verifyUrl || '#';
    lightboxVerifyBtn.style.display = cert.verifyUrl ? 'inline-flex' : 'none';

    lightboxDownloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = cert.image;
      a.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

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
      const verifyUrl = document.getElementById('newCertVerifyUrl').value.trim();
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
  const EDITS_STORAGE_KEY = 'araknet_portfolio_custom_edits_v1';
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
    showToast('🔑 Owner Mode Unlocked! Click any text to edit.');
  }

  function disableOwnerMode() {
    document.body.classList.remove('owner-mode-active');
    sessionStorage.removeItem(OWNER_SESSION_KEY);
    if (ownerDock) ownerDock.style.display = 'none';
    if (certAdminActions) certAdminActions.style.display = 'none';

    document.querySelectorAll('[data-edit-key]').forEach(el => {
      el.removeAttribute('contenteditable');
      const badge = el.querySelector('.pencil-badge');
      if (badge) badge.remove();
    });

    renderCertificates();
    showToast('🔒 Owner Mode Locked. Portfolio is in View-Only mode.');
  }

  if (adminAuthForm) {
    adminAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = adminPasscodeInput.value.trim();
      if (entered === DEFAULT_PASSCODE) {
        closeOwnerLoginModal();
        enableOwnerMode();
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
  // 12. MOBILE MENU TOGGLE
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
