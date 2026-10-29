'use client';

import React from 'react';

export const TopPunchlineBanner: React.FC = () => {
  return (
    <aside
      className="top-punchline-banner"
      aria-label="Professional announcement"
      style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-border)',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-mono)',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem 1rem',
        }}
      >
        <span>
          <strong>SYED ALI HUSSAIN</strong> · Building AI agents, map tools, and reliable web apps from research to code.
        </span>
        <a
          href="#projects"
          style={{
            color: 'var(--color-accent)',
            fontWeight: 600,
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            whiteSpace: 'nowrap',
          }}
        >
          Explore Live Systems ↓
        </a>
      </div>
    </aside>
  );
};
