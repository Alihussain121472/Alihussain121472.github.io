'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-primary)',
              marginBottom: '0.25rem',
            }}
          >
            Syed Ali Hussain
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            AI Systems Engineering &amp; Applied Machine Learning Research · Islamabad, Pakistan
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <a href="#hero" style={{ textDecoration: 'underline' }}>
            Top ↑
          </a>
          <span aria-hidden="true">·</span>
          <a href="#projects" style={{ textDecoration: 'underline' }}>
            Projects
          </a>
          <span aria-hidden="true">·</span>
          <a href="#research" style={{ textDecoration: 'underline' }}>
            Research
          </a>
          <span aria-hidden="true">·</span>
          <a href="#certifications" style={{ textDecoration: 'underline' }}>
            Credentials
          </a>
          <span aria-hidden="true">·</span>
          <a href="#contact" style={{ textDecoration: 'underline' }}>
            Contact
          </a>
        </div>

        <div
          className="mono-font"
          style={{
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
            }}
            aria-hidden="true"
          />
          <span>Next.js 15 · Strict TypeScript · 2026</span>
        </div>
      </div>
    </footer>
  );
};
