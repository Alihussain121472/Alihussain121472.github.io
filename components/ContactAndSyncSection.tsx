'use client';

import React, { useState, useRef } from 'react';
import {
  PortfolioBackupVault,
  isValidEmailAddress,
  parseAndValidateBackup,
  ContactInquiry,
  EmailAddress,
} from '@/types/portfolio';

interface ContactAndSyncSectionProps {
  bookmarkedIds: readonly string[];
  onRestoreVault: (vault: PortfolioBackupVault) => void;
}

export const ContactAndSyncSection: React.FC<ContactAndSyncSectionProps> = ({
  bookmarkedIds,
  onRestoreVault,
}) => {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrorMessage, setFormErrorMessage] = useState('');

  // Backup & Sync State
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormErrorMessage('');

    if (!name.trim()) {
      setFormStatus('error');
      setFormErrorMessage('Please provide your name.');
      return;
    }

    if (!isValidEmailAddress(email)) {
      setFormStatus('error');
      setFormErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!message.trim()) {
      setFormStatus('error');
      setFormErrorMessage('Please enter your inquiry message.');
      return;
    }

    const newInquiry: ContactInquiry = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      email: email.trim() as EmailAddress,
      subject: subject.trim() || 'General Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Send to Next.js API Route Handler
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });

      if (!response.ok) {
        throw new Error('API server returned an error.');
      }

      // 2. Persist in LocalStorage vault inquiries
      const storedInquiriesRaw = localStorage.getItem('syed_portfolio_inquiries');
      const existingInquiries: ContactInquiry[] = storedInquiriesRaw
        ? JSON.parse(storedInquiriesRaw)
        : [];
      existingInquiries.push(newInquiry);
      localStorage.setItem('syed_portfolio_inquiries', JSON.stringify(existingInquiries));

      setFormStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      // Fallback: still persist locally even if offline
      const storedInquiriesRaw = localStorage.getItem('syed_portfolio_inquiries');
      const existingInquiries: ContactInquiry[] = storedInquiriesRaw
        ? JSON.parse(storedInquiriesRaw)
        : [];
      existingInquiries.push(newInquiry);
      localStorage.setItem('syed_portfolio_inquiries', JSON.stringify(existingInquiries));

      setFormStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  const handleExportVault = () => {
    try {
      const theme = (localStorage.getItem('syed_theme_preference') as 'light' | 'dark' | 'system') || 'system';
      const storedInquiriesRaw = localStorage.getItem('syed_portfolio_inquiries');
      const inquiries: ContactInquiry[] = storedInquiriesRaw ? JSON.parse(storedInquiriesRaw) : [];

      const vault: PortfolioBackupVault = {
        version: '2.0',
        exportedAt: new Date().toISOString(),
        theme,
        bookmarkedProjectIds: bookmarkedIds,
        evaluationNotes: {
          sessionNote: 'Portfolio evaluation snapshot and state vault.',
        },
        inquiries,
      };

      const blob = new Blob([JSON.stringify(vault, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `syed-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setSyncStatus('Vault exported successfully!');
      setTimeout(() => setSyncStatus(null), 3500);
    } catch {
      setSyncStatus('Failed to generate export file.');
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const rawJson = JSON.parse(event.target?.result as string);
        const result = parseAndValidateBackup(rawJson);

        if (result.success) {
          onRestoreVault(result.value);
          setSyncStatus('Backup restored and validated successfully!');
        } else {
          setSyncStatus(`Validation Error: ${result.error}`);
        }
      } catch {
        setSyncStatus('Invalid JSON file format.');
      }
      setTimeout(() => setSyncStatus(null), 5000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 id="contact-heading" className="section-title">
            Initiate Contact &amp; Portfolio State Vault
          </h2>
          <p className="section-sub">
            Open for full-time roles and projects in AI systems, autonomous agents, and web apps.
          </p>
        </div>

        <div
          className="contact-sync-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Inquiry Form */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
            }}
          >
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '1rem',
              }}
            >
              Send Direct Message
            </h3>

            {formStatus === 'success' && (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-accent)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                }}
              >
                ✓ Message received! Your inquiry has been validated and recorded. I will reply to your email promptly.
              </div>
            )}

            {formStatus === 'error' && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #EF4444',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.25rem',
                  fontSize: 'var(--text-sm)',
                  color: '#EF4444',
                }}
              >
                {formErrorMessage}
              </div>
            )}

            <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label
                  htmlFor="inquiry-name"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Your Name *
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-sm)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-email"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Email Address *
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-sm)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-subject"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Subject
                </label>
                <input
                  id="inquiry-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. AI Agent Deployment Consultation"
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-sm)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Project Details or Inquiry *
                </label>
                <textarea
                  id="inquiry-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your requirements or inquiry..."
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {formStatus === 'submitting' ? 'Submitting Inquiry...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>

          {/* Right Column: Direct Channels & Portable Backup Vault */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Direct Channels */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                Direct Channels
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Email</div>
                  <a
                    href="mailto:syedali6160@gmail.com"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', textDecoration: 'underline' }}
                  >
                    syedali6160@gmail.com
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Professional Profile</div>
                  <a
                    href="https://linkedin.com/in/ali-hussain-93a24430a"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', textDecoration: 'underline' }}
                  >
                    linkedin.com/in/ali-hussain-93a24430a ↗
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>GitHub Repository &amp; Code</div>
                  <a
                    href="https://github.com/Alihussain121472"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', textDecoration: 'underline' }}
                  >
                    github.com/Alihussain121472 ↗
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>X (Twitter)</div>
                  <a
                    href="https://x.com/Syedali6160"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', textDecoration: 'underline' }}
                  >
                    x.com/Syedali6160 ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Cloud & Local Backup Sync Vault */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}
              >
                <h3
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Portfolio State Vault
                </h3>
                <span className="mono-font" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>
                  v2.0 Schema
                </span>
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                Save and export your bookmarks, theme choice, and form messages in a single JSON file.
              </p>

              {syncStatus && (
                <div
                  style={{
                    padding: '0.5rem 0.75rem',
                    marginBottom: '1rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {syncStatus}
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={handleExportVault}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  Export Vault (.json)
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  Restore Vault (.json)
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportFile}
                  style={{ display: 'none' }}
                />
              </div>

              <div
                className="mono-font"
                style={{
                  marginTop: '0.85rem',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Active Bookmarks: {bookmarkedIds.length} system(s)
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 840px) {
          .contact-sync-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
