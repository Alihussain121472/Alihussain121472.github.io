'use client';

import React, { useState } from 'react';
import { RESEARCH_PAPERS } from '@/data/portfolio-data';
import { CitationFormat } from '@/types/portfolio';

export const ResearchSection: React.FC = () => {
  const [activeCitationPaperId, setActiveCitationPaperId] = useState<string | null>(null);
  const [citationFormat, setCitationFormat] = useState<CitationFormat>('apa');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleCopyCitation = async (paperId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(`${paperId}-${citationFormat}`);
      setTimeout(() => {
        setCopiedFormat(null);
      }, 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="research" className="section" aria-labelledby="research-heading">
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 id="research-heading" className="section-title">
            Peer-Reviewed Research &amp; Publications
          </h2>
          <p className="section-sub">
            Bridging theoretical machine learning, optimization heuristics, and practical cybersecurity systems.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {RESEARCH_PAPERS.map((paper) => {
            const isCitationOpen = activeCitationPaperId === paper.id;
            const currentCitationText = paper.citations[citationFormat];
            const isCopied = copiedFormat === `${paper.id}-${citationFormat}`;

            return (
              <article
                key={paper.id}
                className="research-paper-card"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                }}
              >
                {/* Status Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color:
                        paper.status === 'Published'
                          ? 'var(--color-accent)'
                          : 'var(--color-text-secondary)',
                    }}
                  >
                    ● {paper.status === 'Published' ? 'Published Paper' : 'Upcoming Paper'}
                  </span>
                  <span
                    className="mono-font"
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}
                  >
                    {paper.metricHighlight}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    lineHeight: 'var(--lh-heading)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {paper.title}
                </h3>

                {/* Academic Venue */}
                <div
                  className="academic-font"
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-primary)',
                    fontStyle: 'italic',
                    marginBottom: '0.75rem',
                  }}
                >
                  {paper.venue}
                </div>

                {/* Authors with Syed Ali Hussain emphasized */}
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1rem',
                  }}
                >
                  <strong>Authors: </strong>
                  {paper.authors.split(' · ').map((author, idx, arr) => (
                    <React.Fragment key={author}>
                      {author === 'Syed Ali Hussain' ? (
                        <strong style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                          {author}
                        </strong>
                      ) : (
                        author
                      )}
                      {idx < arr.length - 1 && ' · '}
                    </React.Fragment>
                  ))}
                </p>

                {/* Abstract */}
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: '1.6',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {paper.abstract}
                </p>

                {/* Key Findings List */}
                <div
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Key Empirical Findings
                  </div>
                  <ul
                    style={{
                      paddingLeft: '1.25rem',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    {paper.keyFindings.map((finding, fIdx) => (
                      <li key={fIdx} style={{ marginBottom: '0.25rem' }}>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Action Links & Citation Switcher */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Read Manuscript (PDF) ↗
                  </a>

                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      DOI: {paper.doi} ↗
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setActiveCitationPaperId(isCitationOpen ? null : paper.id)
                    }
                    className="btn btn-secondary btn-sm"
                    aria-expanded={isCitationOpen}
                  >
                    {isCitationOpen ? 'Hide Citation Tool' : 'Cite this Paper (APA/IEEE/BibTeX)'}
                  </button>
                </div>

                {/* Dynamic Citation Switcher Drawer */}
                {isCitationOpen && (
                  <div
                    style={{
                      marginTop: '1.25rem',
                      padding: '1.25rem',
                      backgroundColor: 'var(--color-surface-subtle)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {/* Format Tabs */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        marginBottom: '0.85rem',
                      }}
                    >
                      <div
                        role="tablist"
                        aria-label="Citation Format Selector"
                        style={{ display: 'flex', gap: '0.4rem' }}
                      >
                        {(['apa', 'ieee', 'bibtex'] as const).map((fmt) => {
                          const isActive = citationFormat === fmt;
                          return (
                            <button
                              key={fmt}
                              role="tab"
                              type="button"
                              aria-selected={isActive}
                              onClick={() => setCitationFormat(fmt)}
                              className={`btn-tab ${isActive ? 'active' : ''}`}
                            >
                              {fmt.toUpperCase()}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyCitation(paper.id, currentCitationText)}
                        className="btn btn-primary btn-sm"
                      >
                        {isCopied ? '✓ Copied to Clipboard!' : 'Copy Citation Text'}
                      </button>
                    </div>

                    {/* Formatted Citation Block */}
                    <pre
                      style={{
                        fontFamily: citationFormat === 'bibtex' ? 'var(--font-mono)' : 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        padding: '0.75rem',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--color-text-primary)',
                        lineHeight: '1.5',
                      }}
                    >
                      {currentCitationText}
                    </pre>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
