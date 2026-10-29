'use client';

import React, { useEffect, useRef } from 'react';
import { Project } from '@/types/portfolio';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle ESC and native dialog cancel
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      className="case-study-dialog"
      aria-labelledby="modal-case-study-title"
      aria-modal="true"
      onClick={(e) => {
        // Close if clicked on backdrop
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      style={{
        margin: 'auto',
        maxWidth: '48rem',
        width: 'calc(100% - 2rem)',
        maxHeight: '85vh',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        overflowY: 'auto',
        padding: 0,
      }}
    >
      <div style={{ padding: '2rem' }}>
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1.25rem',
            marginBottom: '1.5rem',
            gap: '1rem',
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
              Spotlight #{project.spotlightIndex} · Technical Case Study
            </div>
            <h2
              id="modal-case-study-title"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
              }}
            >
              {project.title}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              {project.kicker}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study dialog"
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
            }}
          >
            ✕ Close (ESC)
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section: Problem Breakdown */}
          <div>
            <h3
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.4rem',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              01 · Problem Statement
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
              {project.caseStudy.problem}
            </p>
          </div>

          {/* Section: Solution Architecture */}
          <div>
            <h3
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.4rem',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              02 · Solution &amp; System Architecture
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
              {project.caseStudy.solutionArchitecture}
            </p>
          </div>

          {/* Section: 4-Step Execution Pipeline */}
          <div>
            <h3
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.6rem',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              03 · 4-Step Execution Pipeline
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                backgroundColor: 'var(--color-surface-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}
            >
              {project.caseStudy.executionPipeline.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-accent)',
                      fontWeight: 700,
                    }}
                  >
                    Phase {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Verifiable Outcomes */}
          <div>
            <h3
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.4rem',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              04 · Verifiable Engineering Outcomes
            </h3>
            <ul
              style={{
                paddingLeft: '1.25rem',
                fontSize: 'var(--text-sm)',
                lineHeight: '1.6',
                color: 'var(--color-text-secondary)',
              }}
            >
              {project.caseStudy.verifiableOutcomes.map((outcome, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Unboxed Tech Stack */}
          <div>
            <h3
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.5rem',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Technology Stack
            </h3>
            <div className="metadata-list">
              {project.stack.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span className="metadata-item">{tech}</span>
                  {i < project.stack.length - 1 && (
                    <span className="metadata-separator">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Modal Footer Links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              marginTop: '1rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {project.liveLabel || 'Visit Production System ↗'}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Inspect GitHub Repository ↗
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              style={{ marginLeft: 'auto' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
