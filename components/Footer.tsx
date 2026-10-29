'use client';

import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '4rem',
        paddingBottom: '3.5rem',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-secondary)',
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      <div className="container">
        {/* Top Zone: Identity & Live Engagement Telemetry */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ maxWidth: '34rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '0.4rem',
              }}
            >
              Syed Ali Hussain
            </div>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                lineHeight: '1.6',
                color: 'var(--color-text-secondary)',
                marginBottom: '1rem',
              }}
            >
              AI Systems Engineer &amp; Full-Stack Architect based in Islamabad, Pakistan.
              Designing autonomous agent pipelines, resilient backends, and published machine learning research.
            </p>

            {/* Live Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-primary)',
              }}
            >
              <span className="pulse-indicator" aria-hidden="true" />
              <span>Available for select engineering &amp; research engagements</span>
            </div>
          </div>

          {/* Quick Actions: Back to Top & Theme Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <ThemeSwitcher />
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-tab"
              aria-label="Scroll back to top of page"
              style={{
                height: '36px',
                padding: '0.4rem 0.85rem',
                fontSize: 'var(--text-xs)',
              }}
            >
              Back to Top ↑
            </button>
          </div>
        </div>

        {/* Middle Zone: 3-Column Navigation Grid */}
        <div
          className="footer-nav-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.5rem',
            paddingTop: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {/* Column 1: Systems & Research */}
          <div>
            <div
              className="mono-font"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Systems &amp; Research
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="#projects" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  NovaBrief Tech (AI SaaS)
                </a>
              </li>
              <li>
                <a href="#projects" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  Araknet.tech (Geospatial Engine)
                </a>
              </li>
              <li>
                <a href="#projects" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  MY Mentore (AI Study Platform)
                </a>
              </li>
              <li>
                <a href="#research" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  SVM Cyberattack Detection (IJICT Paper)
                </a>
              </li>
              <li>
                <a href="#expertise" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  Technical Architecture Stack
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Credentials & Experience */}
          <div>
            <div
              className="mono-font"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Credentials &amp; Verification
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="#certifications" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  Harvard CS50P Certification
                </a>
              </li>
              <li>
                <a href="#certifications" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  Google &amp; Cisco Cyber Credentials
                </a>
              </li>
              <li>
                <a href="#cv" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  FAST-NUCES AI Coursework
                </a>
              </li>
              <li>
                <a
                  href="/assets/cv/Syed_Ali_Hussain_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                  className="footer-link"
                >
                  Download Curriculum Vitae (PDF) ↗
                </a>
              </li>
              <li>
                <a href="#contact" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  Portfolio State Vault (JSON Export)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Connectivity */}
          <div>
            <div
              className="mono-font"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Direct Connectivity
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="mailto:syedali6160@gmail.com" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  syedali6160@gmail.com ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Alihussain121472"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                  className="footer-link"
                >
                  GitHub (@Alihussain121472) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ali-hussain-93a24430a"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                  className="footer-link"
                >
                  LinkedIn Profile ↗
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/Syedali6160"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                  className="footer-link"
                >
                  X (@Syedali6160) ↗
                </a>
              </li>
              <li>
                <a href="#contact" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-link">
                  Send Direct Inquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '2rem',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Syed Ali Hussain. Designed &amp; engineered with typography-first discipline.
          </div>

          <div
            className="mono-font"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <span>Next.js 15 App Router</span>
            <span aria-hidden="true">·</span>
            <span>Strict TypeScript</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: '#10B981', fontWeight: 600 }}>WCAG 2.2 AA Verified</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          transition: color 0.15s ease;
        }
        .footer-link:hover {
          color: var(--color-text-primary) !important;
          text-decoration: underline !important;
          text-underline-offset: 3px;
        }
        @media (max-width: 768px) {
          .footer-nav-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
