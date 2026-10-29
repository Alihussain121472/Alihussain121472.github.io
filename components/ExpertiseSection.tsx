'use client';

import React from 'react';
import { TECHNICAL_EXPERTISE } from '@/data/portfolio-data';

export const ExpertiseSection: React.FC = () => {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-heading">
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 id="expertise-heading" className="section-title">
            Technical Architecture &amp; Engineering Stack
          </h2>
          <p className="section-sub">
            Core tools, models, and engineering practices used across my projects and research.
          </p>
        </div>

        <div
          className="expertise-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.75rem',
          }}
        >
          {TECHNICAL_EXPERTISE.map((domain) => (
            <div
              key={domain.category}
              className="expertise-card"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.4rem',
                }}
              >
                {domain.category}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.25rem',
                  lineHeight: '1.5',
                }}
              >
                {domain.description}
              </p>

              {/* Zero-Pill Typography Metadata */}
              <div
                className="metadata-list"
                style={{
                  fontSize: 'var(--text-xs)',
                  lineHeight: '1.8',
                }}
              >
                {domain.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span className="metadata-item">{skill}</span>
                    {sIdx < domain.skills.length - 1 && (
                      <span className="metadata-separator">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .expertise-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
