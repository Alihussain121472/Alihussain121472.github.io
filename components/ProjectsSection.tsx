'use client';

import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '@/types/portfolio';
import { PROJECTS } from '@/data/portfolio-data';

interface ProjectsSectionProps {
  onOpenCaseStudy: (projectId: string) => void;
  bookmarkedIds: readonly string[];
  onToggleBookmark: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenCaseStudy,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [stackSearchQuery, setStackSearchQuery] = useState<string>('');

  const filterTabs: { id: string; label: string; count: number }[] = [
    { id: 'All', label: 'All Systems', count: PROJECTS.length },
    {
      id: 'Live Web Platforms',
      label: 'Live Web Platforms',
      count: PROJECTS.filter((p) => p.categories.includes('Live Web Platforms')).length,
    },
    {
      id: 'AI & Agent Workflows',
      label: 'AI & Agent Workflows',
      count: PROJECTS.filter((p) => p.categories.includes('AI & Agent Workflows')).length,
    },
    {
      id: 'Desktop Apps',
      label: 'Desktop Apps',
      count: PROJECTS.filter((p) => p.categories.includes('Desktop Apps')).length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' ||
        project.categories.includes(selectedCategory as ProjectCategory);

      // Search query filter (matches stack or title)
      const query = stackSearchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.kicker.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, stackSearchQuery]);

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 id="projects-heading" className="section-title">
            Featured Systems &amp; Autonomous Workflows
          </h2>
          <p className="section-sub">
            Explore real-world apps with clear system pipelines, modern code stacks, and live links to try them out.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
          >
            {filterTabs.map(({ id, label, count }) => {
              const isSelected = selectedCategory === id;
              return (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(id)}
                  className={`btn-tab ${isSelected ? 'active' : ''}`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>

          {/* Live Stack Search Input */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <label htmlFor="stack-search-input" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
              Filter by stack or keyword
            </label>
            <input
              id="stack-search-input"
              type="search"
              value={stackSearchQuery}
              onChange={(e) => setStackSearchQuery(e.target.value)}
              placeholder="Filter by stack (e.g. Python, Groq, Next.js)..."
              style={{
                width: '100%',
                padding: '0.45rem 0.85rem',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
        </div>

        {/* 3-Column Bento Grid */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              padding: '3rem 1rem',
              textAlign: 'center',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
              No projects found matching the specified filters. Try clearing your search term.
            </p>
          </div>
        ) : (
          <div
            className="projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.75rem',
            }}
          >
            {filteredProjects.map((project) => {
              const isBookmarked = bookmarkedIds.includes(project.id);

              return (
                <article
                  key={project.id}
                  className="project-bento-card"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Top: Vector System Architecture Diagram */}
                  <div>
                    <div
                      style={{
                        backgroundColor: 'var(--color-surface-subtle)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.85rem 0.75rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            color: 'var(--color-accent)',
                          }}
                        >
                          Data Pipeline #{project.spotlightIndex}
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(project.id)}
                          aria-label={isBookmarked ? `Remove ${project.title} from bookmarks` : `Bookmark ${project.title}`}
                          className={`btn-tab ${isBookmarked ? 'active' : ''}`}
                        >
                          {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
                        </button>
                      </div>

                      {/* Vector Pipeline SVG visualization */}
                      <svg
                        viewBox="0 0 320 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        aria-label={`Architecture pipeline flow for ${project.title}`}
                      >
                        {/* Node 1 */}
                        <rect x="2" y="10" width="85" height="40" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                        <text x="44" y="27" textAnchor="middle" fill="var(--color-text-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
                          {project.pipelineSteps[0]?.label.slice(0, 12)}
                        </text>
                        <text x="44" y="40" textAnchor="middle" fill="var(--color-text-muted)" fontSize="7" fontFamily="var(--font-mono)">
                          01·Ingest
                        </text>

                        {/* Arrow 1 */}
                        <path d="M92 30 H112 M108 26 L113 30 L108 34" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Node 2 */}
                        <rect x="117" y="10" width="86" height="40" rx="4" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
                        <text x="160" y="27" textAnchor="middle" fill="var(--color-accent)" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
                          {project.pipelineSteps[1]?.label.slice(0, 12)}
                        </text>
                        <text x="160" y="40" textAnchor="middle" fill="var(--color-text-muted)" fontSize="7" fontFamily="var(--font-mono)">
                          02·Process
                        </text>

                        {/* Arrow 2 */}
                        <path d="M208 30 H228 M224 26 L229 30 L224 34" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Node 3 */}
                        <rect x="233" y="10" width="85" height="40" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                        <text x="275" y="27" textAnchor="middle" fill="var(--color-text-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
                          {project.pipelineSteps[2]?.label.slice(0, 12)}
                        </text>
                        <text x="275" y="40" textAnchor="middle" fill="var(--color-text-muted)" fontSize="7" fontFamily="var(--font-mono)">
                          03·Deliver
                        </text>
                      </svg>
                    </div>

                    {/* Card Title & Content */}
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-accent)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {project.kicker}
                    </div>
                    <h3
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '1rem',
                        lineHeight: '1.5',
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom: Zero-Pill Tech Stack & Actions */}
                  <div>
                    {/* Zero-Pill Stack Metadata */}
                    <div
                      className="metadata-list"
                      style={{
                        marginBottom: '1.25rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--color-border)',
                      }}
                      aria-label="Technologies used"
                    >
                      {project.stack.map((item, i) => (
                        <React.Fragment key={item}>
                          <span className="metadata-item">{item}</span>
                          {i < project.stack.length - 1 && (
                            <span className="metadata-separator">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => onOpenCaseStudy(project.id)}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        aria-haspopup="dialog"
                      >
                        Inspect Case Study
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          aria-label={`Open ${project.title} live system`}
                        >
                          Live ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          aria-label={`Inspect ${project.title} source code on GitHub`}
                        >
                          Code ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
