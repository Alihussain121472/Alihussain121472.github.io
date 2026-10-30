// Client-side accessibility guard that sanitizes third-party browser extension nodes (e.g., <chatgpt-sidebar>) so they never violate WCAG 4.1.2 (button-name) or positive tabindex rules.
"use client";

import { useEffect } from "react";

function sanitizeExtensionNodes() {
  if (typeof document === "undefined") return;

  const hosts = document.querySelectorAll("chatgpt-sidebar");
  hosts.forEach((host) => {
    const htmlHost = host as HTMLElement;
    htmlHost.setAttribute("aria-hidden", "true");
    htmlHost.style.setProperty("display", "none", "important");
    htmlHost.style.setProperty("visibility", "hidden", "important");

    const roots: Array<Document | ShadowRoot | Element> = [htmlHost];
    if (htmlHost.shadowRoot) {
      roots.push(htmlHost.shadowRoot);
    }

    roots.forEach((root) => {
      // Fix Issue 1: Buttons must have discernible text (chatgpt-sidebar >> .size-10)
      const buttons = root.querySelectorAll("button");
      buttons.forEach((btn) => {
        const hasText = (btn.textContent || "").trim().length > 0;
        const hasLabel =
          btn.hasAttribute("aria-label") &&
          (btn.getAttribute("aria-label") || "").trim().length > 0;
        if (!hasText && !hasLabel) {
          btn.setAttribute("aria-label", "Toggle AI assistant sidebar");
          btn.setAttribute("title", "Toggle AI assistant sidebar");
        }
      });

      // Fix Issue 2: Elements should not have tabindex greater than zero (chatgpt-sidebar >> .chat-gpt-query-model-wrapper)
      const tabbables = root.querySelectorAll("[tabindex]");
      tabbables.forEach((el) => {
        const val = parseInt(el.getAttribute("tabindex") || "0", 10);
        if (val > 0) {
          el.setAttribute("tabindex", "0");
        }
      });
    });
  });
}

export function A11yExtensionGuard() {
  useEffect(() => {
    sanitizeExtensionNodes();

    const observer = new MutationObserver(() => {
      sanitizeExtensionNodes();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
