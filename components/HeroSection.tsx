'use client';

import React, { useState } from 'react';
import { HERO_METRICS, PROJECTS } from '@/data/portfolio-data';

interface HeroSectionProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCaseStudy }) => {
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState<'01' | '02' | '03'>('01');

  const activeProject =
    PROJECTS.find((p) => p.spotlightIndex === activeSpotlightIndex) || PROJECTS[0];

  return (
    <section id="hero" className="hero-section" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Hero Split Layout */}
        <div
          className="hero-split-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Commanding Typography */}
          <div className="hero-typography-col">
            <div
              className="hero-kicker"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              AI Systems Engineering · Full-Stack Architecture · Published ML Researcher
            </div>

            <h1
              className="hero-title"
              style={{
                fontSize: 'var(--text-hero)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 'var(--lh-tight)',
                color: 'var(--color-text-primary)',
                marginBottom: '1.5rem',
                textWrap: 'balance',
              }}
            >
              Architecting production AI software that turns complex workflows into autonomous, measurable systems.
            </h1>

            <p
              className="hero-lead"
              style={{
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--lh-body)',
                color: 'var(--color-text-secondary)',
                marginBottom: '2rem',
                maxWidth: '42rem',
              }}
            >
              I design and deploy end-to-end software in Islamabad, Pakistan—combining LLM orchestration (Llama 3.3, Gemini, Claude), resilient Python &amp; Next.js backends, and peer-reviewed machine learning research into live products.
            </p>

            {/* CTAs */}
            <div
              className="hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2rem',
              }}
            >
              <a href="#projects" className="btn btn-primary">
                Explore Selected Works
              </a>
              <a
                href="/assets/cv/Syed_Ali_Hussain_Resume.pdf"
                download="Syed_Ali_Hussain_Resume.pdf"
                className="btn btn-secondary"
              >
                Download CV (PDF)
              </a>
            </div>

            {/* Clean Unboxed Text Links */}
            <div
              className="hero-social-links"
              aria-label="Direct contact links"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.5rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
              }}
            >
              <a
                href="mailto:syedali6160@gmail.com"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}
              >
                syedali6160@gmail.com
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://github.com/Alihussain121472"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}
              >
                GitHub (@Alihussain121472)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://linkedin.com/in/ali-hussain-93a24430a"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://x.com/Syedali6160"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}
              >
                X (@Syedali6160)
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Architecture Spotlight Deck */}
          <div
            className="hero-spotlight-deck"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Header with 01 / 02 / 03 Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                }}
              >
                Architecture Spotlight
              </span>

              {/* 01 / 02 / 03 Tab Buttons */}
              <div
                role="tablist"
                aria-label="Select Architecture Spotlight"
                style={{ display: 'flex', gap: '0.4rem' }}
              >
                {(['01', '02', '03'] as const).map((idx) => {
                  const isSelected = activeSpotlightIndex === idx;
                  return (
                    <button
                      key={idx}
                      role="tab"
                      type="button"
                      aria-selected={isSelected}
                      onClick={() => setActiveSpotlightIndex(idx)}
                      className={`btn-tab ${isSelected ? 'active' : ''}`}
                    >
                      {idx}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Card Body */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent)',
                  marginBottom: '0.25rem',
                }}
              >
                {activeProject.kicker}
              </div>
              <h2
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                {activeProject.title}
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1rem',
                  lineHeight: varLhBody,
                }}
              >
                {activeProject.description}
              </p>

              {/* Live Vector Pipeline Steps Preview */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.6rem',
                  }}
                >
                  System Topology Pipeline
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {activeProject.pipelineSteps.map((step, sIdx) => (
                    <div
                      key={step.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: 'var(--text-xs)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-accent)',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        0{sIdx + 1}
                      </span>
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>{step.label}</strong>: {step.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unboxed Stack Metadata separated by middle dot */}
              <div
                className="metadata-list"
                style={{ marginBottom: '1.25rem' }}
                aria-label="Core technologies"
              >
                {activeProject.stack.map((item, i) => (
                  <React.Fragment key={item}>
                    <span className="metadata-item">{item}</span>
                    {i < activeProject.stack.length - 1 && (
                      <span className="metadata-separator">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Action Trigger for Case Study */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(activeProject.id)}
                  className="btn btn-primary btn-sm"
                  aria-haspopup="dialog"
                >
                  Inspect Case Study ↗
                </button>
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    Open Live Platform
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Verifiable Metrics Strip Below Hero */}
        <div
          className="hero-metrics-strip"
          aria-label="Key verifiable metrics"
          style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {HERO_METRICS.map((metric) => (
            <div key={metric.id} className="metric-strip-item">
              <div
                className="mono-font"
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  lineHeight: '1.1',
                  marginBottom: '0.35rem',
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  marginBottom: '0.2rem',
                }}
              >
                {metric.label}
              </div>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.4',
                }}
              >
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-metrics-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .hero-metrics-strip {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

const varLhBody = 'var(--lh-body)';
