// Root layout configuring fonts, Metadata API, JSON-LD Person schema, no-flash theme script, and Vercel Analytics.
import React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { education, experience, profile } from "@/data/portfolio";
import { isTodo } from "@/components/TodoBadge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name} — ${profile.roles.join(" · ")}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.bio,
  openGraph: {
    title: `${profile.name} — ${profile.headline}`,
    description: profile.bio,
    url: profile.site,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.bio,
  },
};

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var root = document.documentElement;
    root.classList.remove('dark', 'light');
    if (saved === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sameAs = Object.values(profile.socials).filter((val) => !isTodo(val));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.bio,
    url: profile.site,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
    },
    worksFor: experience.map((item) => ({
      "@type": "Organization",
      name: item.org,
    })),
    sameAs,
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans selection:bg-accent selection:text-accent-fg">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-accent-fg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
