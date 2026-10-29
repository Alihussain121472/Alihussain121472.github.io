'use client';

import React, { useState, useMemo } from 'react';
import { CREDENTIALS } from '@/data/portfolio-data';
import { CredentialCategory } from '@/types/portfolio';

export const CertificationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'All', label: 'All', count: CREDENTIALS.length },
    {
      id: 'Research & Conferences',
      label: 'Research & Conferences',
      count: CREDENTIALS.filter((c) => c.category === 'Research & Conferences').length,
    },
    {
      id: 'AI & Computer Science',
      label: 'AI & Computer Science',
      count: CREDENTIALS.filter((c) => c.category === 'AI & Computer Science').length,
    },
    {
      id: 'Systems & Web',
      label: 'Systems & Web',
      count: CREDENTIALS.filter((c) => c.category === 'Systems & Web').length,
    },
  ];

  const filteredCredentials = useMemo(() => {
    if (selectedCategory === 'All') return CREDENTIALS;
    return CREDENTIALS.filter(
      (c) => c.category === (selectedCategory as CredentialCategory)
    );
  }, [selectedCategory]);

  return (
    <section id="certifications" className="section" aria-labelledby="certs-heading">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h2 id="certs-heading" className="section-title">
            Verified Credentials &amp; Certifications
          </h2>
          <p className="section-sub">
            Formal specializations, peer review research fellowships, and industry accreditations.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter credentials by category"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {categories.map(({ id, label, count }) => {
            const isSelected = selectedCategory === id;
            return (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: isSelected ? 600 : 400,
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: isSelected ? 'var(--color-accent-contrast)' : 'var(--color-text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Credentials Grid */}
        <div
          className="credentials-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {filteredCredentials.map((cert) => (
            <div
              key={cert.id}
              className="credential-card"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  {cert.category}
                </div>
                <h3
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {cert.title}
                </h3>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {cert.issuer} · {cert.issueDate}
                </div>
                {cert.credentialId && (
                  <div
                    className="mono-font"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {cert.credentialId}
                  </div>
                )}
              </div>

              <div>
                {/* Zero-Pill Skills */}
                <div
                  className="metadata-list"
                  style={{
                    marginBottom: '1rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid var(--color-border)',
                  }}
                  aria-label="Skills covered"
                >
                  {cert.skills.map((skill, sIdx) => (
                    <React.Fragment key={skill}>
                      <span className="metadata-item">{skill}</span>
                      {sIdx < cert.skills.length - 1 && (
                        <span className="metadata-separator">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <a
                  href={cert.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  Inspect Certificate ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .credentials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .credentials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
