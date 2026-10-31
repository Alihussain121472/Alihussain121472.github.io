// Light, luminous constellation background with cursor spotlight and smooth afterglow on mouse hover and page scroll.
"use client";

import React, { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tier: 0 | 1 | 2;
  glow: number;
}

const INITIAL_NODES: ReadonlyArray<{ nx: number; ny: number; tier: 0 | 1 | 2 }> = [
  { nx: 0.05, ny: 0.12, tier: 0 },
  { nx: 0.16, ny: 0.04, tier: 1 },
  { nx: 0.28, ny: 0.18, tier: 1 },
  { nx: 0.29, ny: 0.32, tier: 0 },
  { nx: 0.43, ny: 0.21, tier: 0 },
  { nx: 0.54, ny: 0.12, tier: 1 },
  { nx: 0.6, ny: 0.27, tier: 1 },
  { nx: 0.66, ny: 0.05, tier: 2 },
  { nx: 0.82, ny: 0.16, tier: 0 },
  { nx: 0.91, ny: 0.24, tier: 1 },
  { nx: 0.76, ny: 0.34, tier: 2 },
  { nx: 0.12, ny: 0.48, tier: 1 },
  { nx: 0.24, ny: 0.58, tier: 0 },
  { nx: 0.38, ny: 0.46, tier: 1 },
  { nx: 0.52, ny: 0.42, tier: 0 },
  { nx: 0.58, ny: 0.54, tier: 2 },
  { nx: 0.72, ny: 0.6, tier: 0 },
  { nx: 0.88, ny: 0.48, tier: 1 },
  { nx: 0.07, ny: 0.74, tier: 0 },
  { nx: 0.18, ny: 0.86, tier: 1 },
  { nx: 0.34, ny: 0.76, tier: 1 },
  { nx: 0.36, ny: 0.92, tier: 2 },
  { nx: 0.46, ny: 0.79, tier: 0 },
  { nx: 0.64, ny: 0.84, tier: 0 },
  { nx: 0.78, ny: 0.9, tier: 1 },
  { nx: 0.85, ny: 0.72, tier: 1 },
  { nx: 0.95, ny: 0.85, tier: 2 },
  { nx: 0.97, ny: 0.64, tier: 1 },
];

const MAX_EDGES = 48;

const NODE_BASE_CLASSES = [
  "constellation-node constellation-node-primary",
  "constellation-node constellation-node-secondary",
  "constellation-node constellation-node-micro",
] as const;

const NODE_WARM_CLASSES = [
  "constellation-node constellation-node-primary is-warm",
  "constellation-node constellation-node-secondary is-warm",
  "constellation-node constellation-node-micro is-warm",
] as const;

const NODE_LIT_CLASSES = [
  "constellation-node constellation-node-primary is-lit",
  "constellation-node constellation-node-secondary is-lit",
  "constellation-node constellation-node-micro is-lit",
] as const;

const EDGE_CLASSES = [
  "constellation-edge constellation-edge-strong",
  "constellation-edge constellation-edge-mid",
  "constellation-edge constellation-edge-faint",
  "constellation-edge constellation-edge-lit",
] as const;

export function ConstellationBackground() {
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const edgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let width = window.innerWidth || 1280;
    let height = window.innerHeight || 800;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nodes: NodePoint[] = INITIAL_NODES.map((item, idx) => {
      const angle = (idx * 137.5 * Math.PI) / 180;
      const speed = item.tier === 0 ? 0.28 : item.tier === 1 ? 0.38 : 0.46;
      return {
        x: item.nx * width,
        y: item.ny * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tier: item.tier,
        glow: 0,
      };
    });

    const mouse = { x: -9999, y: -9999, active: false };
    let scrollEnergy = 0;
    let scrollVelocityY = 0;
    let lastScrollY = window.scrollY || 0;

    function applyEdge(
      slot: number,
      x: number,
      y: number,
      dist: number,
      angle: number,
      tier: 0 | 1 | 2 | 3
    ) {
      const el = edgeRefs.current[slot];
      if (!el) return;
      if (el.style.display !== "block") el.style.display = "block";
      el.style.setProperty("--edge-w", `${dist.toFixed(1)}px`);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
        1
      )}px, 0) rotate(${angle.toFixed(3)}rad)`;
      const targetClass = EDGE_CLASSES[tier];
      if (el.className !== targetClass) el.className = targetClass;
    }

    function renderFrame() {
      const maxDist = Math.min(Math.max(width * 0.19, 185), 260);
      const maxDistSq = maxDist * maxDist;
      const mouseRadius = Math.max(maxDist * 1.15, 240);
      const mouseRadiusSq = mouseRadius * mouseRadius;

      if (cursorGlowRef.current) {
        if (mouse.active) {
          cursorGlowRef.current.style.opacity = "1";
          cursorGlowRef.current.style.transform = `translate3d(${mouse.x.toFixed(
            1
          )}px, ${mouse.y.toFixed(1)}px, 0)`;
        } else {
          cursorGlowRef.current.style.opacity = "0";
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n) continue;

        if (!prefersReducedMotion) {
          n.x += n.vx * (1 + scrollEnergy * 1.1);
          n.y += n.vy * (1 + scrollEnergy * 1.1) + scrollVelocityY;

          if (n.x < 12) {
            n.x = 12;
            n.vx = Math.abs(n.vx);
          } else if (n.x > width - 12) {
            n.x = width - 12;
            n.vx = -Math.abs(n.vx);
          }

          if (n.y < 12) {
            n.y = height - 13;
          } else if (n.y > height - 12) {
            n.y = 13;
          }
        }

        if (mouse.active) {
          const mdx = mouse.x - n.x;
          const mdy = mouse.y - n.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouseRadiusSq) {
            const mRatio = 1 - Math.sqrt(mDistSq) / mouseRadius;
            const targetGlow = Math.min(1, 0.55 + mRatio * 0.75);
            if (targetGlow > n.glow) n.glow = targetGlow;
            if (!prefersReducedMotion && mDistSq > 900) {
              n.x += mdx * 0.004 * mRatio;
              n.y += mdy * 0.004 * mRatio;
            }
          }
        }

        if (scrollEnergy > n.glow) {
          n.glow = scrollEnergy;
        }

        const el = nodeRefs.current[i];
        if (el) {
          const offset = n.tier === 0 ? 3.75 : n.tier === 1 ? 2.75 : 2;
          el.style.transform = `translate3d(${(n.x - offset).toFixed(1)}px, ${(
            n.y - offset
          ).toFixed(1)}px, 0)`;

          const targetNodeClass =
            n.glow > 0.62
              ? NODE_LIT_CLASSES[n.tier]
              : n.glow > 0.2
              ? NODE_WARM_CLASSES[n.tier]
              : NODE_BASE_CLASSES[n.tier];
          if (el.className !== targetNodeClass) {
            el.className = targetNodeClass;
          }
        }

        n.glow *= 0.935;
        if (n.glow < 0.02) n.glow = 0;
      }

      scrollEnergy *= 0.9;
      if (scrollEnergy < 0.01) scrollEnergy = 0;
      scrollVelocityY *= 0.78;
      if (Math.abs(scrollVelocityY) < 0.04) scrollVelocityY = 0;

      let edgeCount = 0;
      for (let i = 0; i < nodes.length && edgeCount < MAX_EDGES; i++) {
        const ni = nodes[i];
        if (!ni) continue;
        for (let j = i + 1; j < nodes.length && edgeCount < MAX_EDGES; j++) {
          const nj = nodes[j];
          if (!nj) continue;
          const dx = nj.x - ni.x;
          const dy = nj.y - ni.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const ratio = dist / maxDist;
            const pairGlow = Math.max(ni.glow, nj.glow);
            const tier: 0 | 1 | 2 | 3 =
              pairGlow > 0.45 && ratio < 0.8
                ? 3
                : ratio < 0.48
                ? 0
                : ratio < 0.78
                ? 1
                : 2;
            applyEdge(edgeCount++, ni.x, ni.y, dist, Math.atan2(dy, dx), tier);
          }
        }
      }

      if (mouse.active && !prefersReducedMotion) {
        for (let i = 0; i < nodes.length && edgeCount < MAX_EDGES; i++) {
          const ni = nodes[i];
          if (!ni) continue;
          const dx = mouse.x - ni.x;
          const dy = mouse.y - ni.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            applyEdge(
              edgeCount++,
              ni.x,
              ni.y,
              dist,
              Math.atan2(dy, dx),
              dist < mouseRadius * 0.75 ? 3 : 0
            );
          }
        }
      }

      for (let k = edgeCount; k < MAX_EDGES; k++) {
        const el = edgeRefs.current[k];
        if (el && el.style.display !== "none") el.style.display = "none";
      }
    }

    renderFrame();

    let rafId = 0;
    let lastTime = 0;

    function tick(now: number) {
      if (document.hidden) {
        rafId = 0;
        return;
      }
      const isInteractive = mouse.active || scrollEnergy > 0.05;
      const frameInterval = isInteractive ? 16 : 32;
      if (now - lastTime >= frameInterval) {
        lastTime = now;
        renderFrame();
      }
      rafId = window.requestAnimationFrame(tick);
    }

    function startLoop() {
      if (!prefersReducedMotion && !rafId && !document.hidden) {
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function handleVisibilityChange() {
      if (document.hidden && rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      } else {
        startLoop();
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function handlePointerMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    function handleScroll() {
      const currentY = window.scrollY || 0;
      const deltaY = currentY - lastScrollY;
      lastScrollY = currentY;
      scrollEnergy = 1;
      scrollVelocityY = Math.max(Math.min(-deltaY * 0.07, 3.2), -3.2);
    }

    function handleWheel(e: WheelEvent) {
      scrollEnergy = 1;
      scrollVelocityY = Math.max(Math.min(-e.deltaY * 0.025, 3.2), -3.2);
    }

    function handleResize() {
      const newW = window.innerWidth || 1280;
      const newH = window.innerHeight || 800;
      const scaleX = newW / width;
      const scaleY = newH / height;
      for (const n of nodes) {
        n.x *= scaleX;
        n.y *= scaleY;
      }
      width = newW;
      height = newH;
    }

    startLoop();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-0 w-0 overflow-visible"
    >
      <div className="constellation-glow-primary" />
      <div className="constellation-glow-secondary" />
      <div
        ref={cursorGlowRef}
        style={{ opacity: 0 }}
        className="constellation-cursor-glow"
      />

      {Array.from({ length: MAX_EDGES }).map((_, idx) => (
        <div
          key={`edge-${idx}`}
          ref={(el) => {
            edgeRefs.current[idx] = el;
          }}
          style={{ display: "none" }}
          className="constellation-edge constellation-edge-mid"
        />
      ))}

      {INITIAL_NODES.map((node, idx) => (
        <div
          key={`node-${idx}`}
          ref={(el) => {
            nodeRefs.current[idx] = el;
          }}
          className={NODE_BASE_CLASSES[node.tier]}
        />
      ))}
    </div>
  );
}
