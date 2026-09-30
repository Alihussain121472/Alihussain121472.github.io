# araknet.tech — Personal Portfolio

> **Syed Ali Hussain** · AI Engineer & Full Stack Developer · Student @ SZABIST (BSAI) · Islamabad, Pakistan

[![Website](https://img.shields.io/badge/Domain-araknet.tech-6366F1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://araknet.tech)
[![NovaBrief](https://img.shields.io/badge/Flagship%20Product-NovaBrief.tech-00F5D4?style=for-the-badge&logo=safari&logoColor=050A14)](https://www.novabrief.tech)
[![GitHub](https://img.shields.io/badge/GitHub-Alihussain121472-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Alihussain121472)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ali%20Hussain-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ali-hussain-93a24430a/)

---

## Overview

A fast, accessible personal portfolio built with **pure vanilla HTML, CSS, and JavaScript** — no framework, no build step, no Node.js required. Designed to load instantly and deploy anywhere that serves static files.

### Features

- **Dark / light mode** — respects OS preference on first visit; persists to `localStorage`
- **Smooth scroll-reveal** — project cards and skill groups animate in using `IntersectionObserver`
- **Active nav highlighting** — current section is tracked on scroll via `IntersectionObserver`
- **Accessible markup** — ARIA labels, `role` attributes, keyboard-navigable theme toggle and mobile menu
- **Responsive layout** — single CSS file, no framework; breakpoints at 640 px, 768 px, and 900 px
- **Contact form** — client-side validation + `mailto:` link; no backend or API key needed
- **Inline SVG favicon** — neural-node icon embedded directly in `<head>`, no extra file
- **Open Graph & Twitter Card meta** — rich previews when shared on LinkedIn, WhatsApp, or Twitter/X

---

## Repository Structure

```text
portfolio/
├── index.html                          # All markup — semantic HTML5
├── style.css                           # All styles — CSS custom properties, no framework
├── .env.example                        # Environment variable reference (safe to commit)
├── .gitignore
├── bust_cache.py                       # Local utility: bump ?v= on asset URLs after updates
├── README.md
└── assets/
    ├── images/
    │   ├── syed-ali.jpg                # Profile photo
    │   ├── novabrief-preview.png       # NovaBrief project preview
    │   ├── leads-agent-preview.svg     # Araknet Business Discovery Agent preview
    │   ├── email-agent-preview.svg     # Email reply agent preview
    │   ├── dha-agent-preview.svg       # DHA Multan real estate agent preview
    │   └── certificates/
    │       ├── szabist-ijict-ml-research-publication.jpg
    │       ├── harvard-cs50-python.svg
    │       ├── google-python-crash-course.jpg
    │       ├── google-technical-support-fundamentals.jpg
    │       ├── cisco-modern-ai.jpg
    │       ├── aieys-web-developer-internship.jpg
    │       ├── aieys-ai-teaching.jpg
    │       └── Certificate of participation in AI Confrence in Germany.jpeg
    └── cv/
        └── Syed_Ali_Hussain_Resume.pdf
```

---

## Deploying to Vercel (Recommended)

This site is a **static site with no build step**. Vercel serves it directly from the repository root.

### First-time deployment

1. Push this repository to GitHub (`Alihussain121472`).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repository.
3. In the configuration screen set:
   | Setting | Value |
   |---|---|
   | Framework Preset | **Other** |
   | Root Directory | `.` (repository root) |
   | Build Command | *(leave empty)* |
   | Output Directory | `.` (repository root) |
4. Click **Deploy**. Vercel builds nothing — it serves `index.html` directly.
5. Under **Domains**, add `araknet.tech`. Vercel will guide you through the DNS records. SSL is provisioned automatically.

### Subsequent deployments

Every `git push` to the `main` branch triggers a new Vercel deployment automatically. No manual steps needed.

### Environment variables

This site has **no server-side runtime** — the browser executes all JavaScript directly. Environment variables are therefore not consumed by any code. They are documented in `.env.example` purely as a reference for future use (e.g. if a serverless contact-form function is added later).

If you do add a Vercel Serverless Function:
1. Add the variable in **Vercel Project Settings → Environment Variables**.
2. Never paste secrets into `index.html` or `style.css` — they would be publicly visible.

---

## Alternative Deployment Options

### Cloudflare Pages
1. Push to GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo. Framework: `None`. Build command: *(empty)*. Output directory: `.`.
4. Deploy, then add `araknet.tech` under **Custom Domains**.

### Netlify
1. Push to GitHub.
2. Netlify Dashboard → **Add new site** → **Import an existing project**.
3. Build command: *(empty)*. Publish directory: `.`.
4. Add `araknet.tech` under **Domain management**.

### cPanel / Traditional Hosting
1. Zip all files.
2. Upload and extract inside `public_html` via cPanel File Manager.
3. Confirm SSL is active in cPanel.

---

## Local Development

No install step needed — open directly in a browser, or use the Python built-in server to avoid CORS issues with local file paths:

```bash
python -m http.server 8000
# Then open http://localhost:8000
```

### Updating assets and busting the browser cache

After replacing any image, run the cache-buster so visitors always get the new file:

```bash
python bust_cache.py
```

This increments the `?v=N` query string on every tracked asset URL inside `index.html`. Commit the result as normal.

---

## Contact

**Syed Ali Hussain**
- Email: [syedali6160@gmail.com](mailto:syedali6160@gmail.com)
- GitHub: [@Alihussain121472](https://github.com/Alihussain121472)
- LinkedIn: [Syed Ali Hussain](https://www.linkedin.com/in/ali-hussain-93a24430a/)
- Twitter / X: [@Syedali6160](https://x.com/Syedali6160)
- Flagship SaaS: [NovaBrief Tech](https://www.novabrief.tech)
