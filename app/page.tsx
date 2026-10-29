'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ResearchSection } from '@/components/ResearchSection';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { ExperienceEducationSection } from '@/components/ExperienceEducationSection';
import { ContactAndSyncSection } from '@/components/ContactAndSyncSection';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { PROJECTS } from '@/data/portfolio-data';
import { PortfolioBackupVault } from '@/types/portfolio';

const BOOKMARKS_STORAGE_KEY = 'syed_bookmarked_projects';

export default function HomePage() {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<readonly string[]>([]);

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookmarkedIds(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleToggleBookmark = useCallback((projectId: string) => {
    setBookmarkedIds((prev) => {
      const isBookmarked = prev.includes(projectId);
      const updated = isBookmarked
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const handleOpenCaseStudy = useCallback((projectId: string) => {
    setActiveCaseStudyId(projectId);
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setActiveCaseStudyId(null);
  }, []);

  const handleRestoreVault = useCallback((vault: PortfolioBackupVault) => {
    setBookmarkedIds(vault.bookmarkedProjectIds);
    localStorage.setItem(
      BOOKMARKS_STORAGE_KEY,
      JSON.stringify(vault.bookmarkedProjectIds)
    );
    localStorage.setItem('syed_theme_preference', vault.theme);
    localStorage.setItem(
      'syed_portfolio_inquiries',
      JSON.stringify(vault.inquiries)
    );

    // Apply theme immediately
    const root = document.documentElement;
    let isDark = false;
    if (vault.theme === 'dark') isDark = true;
    else if (vault.theme === 'light') isDark = false;
    else isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, []);

  const activeProject = PROJECTS.find((p) => p.id === activeCaseStudyId) || null;

  return (
    <>
      <HeroSection onOpenCaseStudy={handleOpenCaseStudy} />
      <ProjectsSection
        onOpenCaseStudy={handleOpenCaseStudy}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
      />
      <ResearchSection />
      <ExpertiseSection />
      <CertificationsSection />
      <ExperienceEducationSection />
      <ContactAndSyncSection
        bookmarkedIds={bookmarkedIds}
        onRestoreVault={handleRestoreVault}
      />
      <CaseStudyModal
        project={activeProject}
        isOpen={Boolean(activeProject)}
        onClose={handleCloseCaseStudy}
      />
    </>
  );
}
