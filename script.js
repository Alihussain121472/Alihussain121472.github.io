/**
 * ARAKNET.TECH — SCRIPT ENGINE FOR SYED ALI
 * Dynamic Features: Neural Canvas, Typewriter, Counter Observer,
 * Dynamic Certification Manager (Add/Remove/Lightbox), Command Palette (Ctrl+K),
 * Copy-to-Clipboard, and Interactive Forms.
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

        // Mouse interaction
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

        // Connect with mouse
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
              // Ease-out expo
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
  // 4. DYNAMIC CERTIFICATION MANAGEMENT SYSTEM
  // (Add, Remove, LocalStorage, Lightbox, Filter)
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

  const STORAGE_KEY = 'araknet_portfolio_certificates_v1';

  function getStoredCertificates() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read localStorage certificates:', e);
    }
    return [...defaultCertificates];
  }

  function saveStoredCertificates(certs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
    } catch (e) {
      console.warn('Could not save certificates to localStorage:', e);
      showToast('Notice: Storage limit reached for local images');
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
          <h3>No certificates in this category yet</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">Click "Add Certificate" above to upload your certification pictures!</p>
        </div>
      `;
      return;
    }

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
            <button class="cert-delete-btn" onclick="window.deleteCertificate('${cert.id}')" title="Remove this certificate">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text
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

  // Delete Certificate Handler
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

  // Add Certificate Modal Handling
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
    addCertModal.classList.add('active');
  }
  function closeAddModal() {
    addCertModal.classList.remove('active');
    addCertForm.reset();
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

  // File reader for uploaded images
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
          certUrlInput.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeSelectedFileBtn) {
    removeSelectedFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedImageBase64 = null;
      certFileInput.value = '';
      dropPreview.style.display = 'none';
      dropPrompt.style.display = 'block';
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
        localStorage.removeItem(STORAGE_KEY);
        currentCertificates = [...defaultCertificates];
        renderCertificates();
        manageCertsModal.classList.remove('active');
        showToast('Restored default credentials');
      }
    });
  }

  // Initial render of certificates
  renderCertificates();

  // ==========================================
  // 5. RESUME MODAL VIEWER
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
  // 6. COMMAND PALETTE (Ctrl+K)
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
      } else if (action === 'trigger') {
        const trigger = item.getAttribute('data-trigger');
        closeCmdPalette();
        if (trigger === 'add-cert') openAddModal();
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
  // 7. TOAST NOTIFICATION SYSTEM & CLIPBOARD
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

  // Copy email buttons
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
  // 8. CONTACT FORM HANDLER
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const sendBtnText = document.getElementById('sendBtnText');
  const sendBtnSpinner = document.getElementById('sendBtnSpinner');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) return;

      sendBtnText.style.display = 'none';
      sendBtnSpinner.style.display = 'inline-block';
      sendBtn.disabled = true;

      // Simulate transmission with high-tech UX and provide mailto fallback
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
        
        // Mailto fallback
        const mailtoUrl = `mailto:syedali6160@gmail.com?subject=${encodeURIComponent('[araknet.tech] ' + subject + ' - ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
        window.location.href = mailtoUrl;

        contactForm.reset();
      }, 1000);
    });
  }

  // ==========================================
  // 9. MOBILE MENU TOGGLE
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
  // 10. CUSTOM FUTURISTIC CURSOR (DESKTOP)
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorDot && cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      // Smooth lag for glow
      cursorGlow.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 350, fill: 'forwards' });
    });

    // Expand on hoverable elements
    document.querySelectorAll('a, button, input, select, textarea, .cert-thumbnail-wrapper').forEach(el => {
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
