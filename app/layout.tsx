import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  Fraunces,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import { TopPunchlineBanner } from '@/components/TopPunchlineBanner';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';

const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const fontBody = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fontAcademic = Fraunces({
  subsets: ['latin'],
  variable: '--font-academic',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Syed Ali Hussain — AI Engineer & Full Stack Architect',
  description:
    'Portfolio of Syed Ali Hussain: AI systems engineering, autonomous agent pipelines, geospatial lead routing, and peer-reviewed machine learning research.',
  keywords: [
    'Syed Ali Hussain',
    'AI Engineer',
    'Full Stack Architect',
    'Autonomous AI Agents',
    'Machine Learning',
    'Llama 3.3',
    'Next.js 15',
    'Groq API',
    'Islamabad',
  ],
  authors: [{ name: 'Syed Ali Hussain', url: 'https://alihussain121472-github-io.vercel.app/' }],
  icons: {
    icon: '/assets/icons/favicon.svg',
  },
  openGraph: {
    title: 'Syed Ali Hussain — AI Engineer & Full Stack Architect',
    description:
      'Shipping Autonomous AI Agents, Geospatial Lead Engines, and Production Web Systems — From Research Math to Live Code.',
    url: 'https://alihussain121472-github-io.vercel.app/',
    siteName: 'Syed Ali Hussain Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syed Ali Hussain — AI Engineer & Full Stack Architect',
    description:
      'Shipping Autonomous AI Agents, Geospatial Lead Engines, and Production Web Systems — From Research Math to Live Code.',
    creator: '@Syedali6160',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontHeading.variable} ${fontBody.variable} ${fontAcademic.variable} ${fontMono.variable}`}
    >
      <head>
        {/* Early inline script to prevent theme flash & quarantine injected extension a11y violations */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('syed_theme_preference') || 'system';
                  var isDark = false;
                  if (mode === 'dark') {
                    isDark = true;
                  } else if (mode === 'light') {
                    isDark = false;
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}

                // Proactive DOM guard for third-party browser extensions (e.g. ChatGPT Sidebar)
                function sanitizeInjectedExtensions() {
                  try {
                    var buttons = document.querySelectorAll('chatgpt-sidebar button, .chatgpt-sidebar button, [class*="chatgpt"] button, button.size-10');
                    for (var i = 0; i < buttons.length; i++) {
                      var btn = buttons[i];
                      if (!btn.getAttribute('aria-label') && !btn.innerText.trim()) {
                        btn.setAttribute('aria-label', 'ChatGPT Sidebar Action');
                      }
                    }
                    var positiveTabs = document.querySelectorAll('[tabindex="1"], [tabindex="2"], [tabindex="3"], [tabindex="4"], [tabindex="5"]');
                    for (var j = 0; j < positiveTabs.length; j++) {
                      positiveTabs[j].setAttribute('tabindex', '0');
                    }
                  } catch (err) {}
                }
                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function() {
                    sanitizeInjectedExtensions();
                  });
                  observer.observe(document.documentElement, { childList: true, subtree: true });
                }
                if (typeof window !== 'undefined') {
                  window.addEventListener('DOMContentLoaded', sanitizeInjectedExtensions);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TopPunchlineBanner />
        <NavigationHeader />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
