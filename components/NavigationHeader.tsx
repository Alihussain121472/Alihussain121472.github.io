'use client';

import React, { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'CV', href: '#cv' },
] as const;

export const NavigationHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="main-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--nav-height)',
          gap: '1.5rem',
        }}
      >
        {/* Zone 1: Brand Wordmark (Left) */}
        <div style={{ flexShrink: 0 }}>
          <a
            href="#hero"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'var(--text-lg)',
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              whiteSpace: 'nowrap',
            }}
          >
            Syed Ali Hussain
          </a>
        </div>

        {/* Zone 2: Minimalist Navigation Links without icons (Center) */}
        <nav
          className="desktop-nav"
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
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
                transition: 'color 0.15s ease',
                position: 'relative',
                padding: '0.25rem 0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.textDecoration = 'underline';
                e.currentTarget.style.textUnderlineOffset = '4px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action CTA & Theme Switcher (Right) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            flexShrink: 0,
          }}
        >
          <ThemeSwitcher />
          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              fontSize: 'var(--text-xs)',
              padding: '0.45rem 0.9rem',
            }}
          >
            Get in Touch
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{
              display: 'none',
              padding: '0.4rem 0.6rem',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (visible when toggled on small screens) */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: inline-block !important;
          }
        }
      `}</style>
    </header>
  );
};
