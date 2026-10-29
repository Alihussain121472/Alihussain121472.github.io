'use client';

import React from 'react';
import { EDUCATION, EXPERIENCE } from '@/data/portfolio-data';

export const ExperienceEducationSection: React.FC = () => {
  return (
    <section id="cv" className="section" aria-labelledby="cv-heading">
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <h2 id="cv-heading" className="section-title">
              Curriculum Vitae &amp; Background
            </h2>
            <p className="section-sub">
              Academic pedigree, institutional research fellowships, and industry software engineering.
            </p>
          </div>

          <a
            href="/assets/cv/Syed_Ali_Hussain_Resume.pdf"
            download="Syed_Ali_Hussain_Resume.pdf"
            className="btn btn-primary"
          >
            Download Full CV (PDF) ↓
          </a>
        </div>

        <div
          className="cv-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
          }}
        >
          {/* Education Track */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1.25rem',
              }}
            >
              Academic Foundation
            </h3>

            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.4rem',
                }}
              >
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {EDUCATION.degree}
                </h4>
                <span className="mono-font" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {EDUCATION.period}
                </span>
              </div>

              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', marginBottom: '0.75rem', fontWeight: 600 }}>
                {EDUCATION.institution}
              </div>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                {EDUCATION.focus}
              </p>
            </div>
          </div>

          {/* Professional Experience Track */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1.25rem',
              }}
            >
              Research &amp; Engineering Experience
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {EXPERIENCE.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '0.35rem',
                    }}
                  >
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {exp.role}
                    </h4>
                    <span className="mono-font" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {exp.period}
                    </span>
                  </div>

                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    {exp.organization} · {exp.location}
                  </div>

                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 800px) {
          .cv-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
