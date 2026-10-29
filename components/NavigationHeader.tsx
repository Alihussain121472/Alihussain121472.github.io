'use client';

import React, { useState, useEffect } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Experience & CV', href: '#cv' },
] as const;

export const NavigationHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`main-header ${scrolled ? 'header-scrolled' : ''}`}
      style={{
        boxShadow: scrolled ? '0 4px 20px -2px rgba(0, 0, 0, 0.08)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--nav-height)',
          gap: '1.25rem',
        }}
      >
        {/* Zone 1: Brand Wordmark (Left) */}
        <div style={{ flexShrink: 0 }}>
          <a
            href="#hero"
            aria-label="Syed Ali Hussain - Homepage"
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.025em',
                color: 'var(--color-text-primary)',
                whiteSpace: 'nowrap',
              }}
            >
              Syed Ali Hussain
            </span>
            <span
              className="mono-font brand-kicker"
              style={{
                fontSize: '11px',
                color: 'var(--color-accent)',
                fontWeight: 600,
              }}
            >
              AI / Systems
            </span>
          </a>
        </div>

        {/* Zone 2: Minimalist Navigation Links (Center) */}
        <nav
          className="desktop-nav"
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.15s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single-Button Theme Switcher & Actions (Right) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            flexShrink: 0,
          }}
        >
          {/* Single-button theme switcher */}
          <ThemeSwitcher />

          {/* Primary Action CTA */}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              fontSize: 'var(--text-xs)',
              padding: '0.45rem 0.9rem',
              height: '36px',
            }}
          >
            Get in Touch
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{
              display: 'none',
              width: '40px',
              height: '36px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              padding: 0,
              transition: 'background-color 0.15s ease, border-color 0.15s ease',
            }}
          >
            {mobileMenuOpen ? (
              // Close X Icon
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (visible when open on small screens) */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.12)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                padding: '0.65rem 0',
                borderBottom: '1px solid var(--color-border)',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{label}</span>
              <span aria-hidden="true" style={{ color: 'var(--color-text-muted)' }}>→</span>
            </a>
          ))}

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              paddingTop: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            <a
              href="/assets/cv/Syed_Ali_Hussain_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ flex: 1, fontSize: 'var(--text-xs)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume (PDF)
            </a>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ flex: 1, fontSize: 'var(--text-xs)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Me
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 500px) {
          .brand-kicker {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
