// Interactive constellation network background with ambient sky-blue glow, floating nodes, and geometric connecting lines.
"use client";

import React, { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tier: 0 | 1 | 2; // 0 = primary hub (6px), 1 = secondary (4.5px), 2 = micro (3px)
}

interface EdgeSegment {
  x: number;
  y: number;
  length: number;
  angle: number;
  strength: 0 | 1 | 2; // 0 = strong, 1 = medium, 2 = faint
}

// Initial normalized coordinates (0..1) modeled directly after the reference constellation layout
const INITIAL_NODES: Array<{ nx: number; ny: number; tier: 0 | 1 | 2 }> = [
  // Upper-left & top constellation chain (matches screenshot directly)
  { nx: 0.045, ny: 0.125, tier: 0 },
  { nx: 0.16, ny: 0.015, tier: 1 },
  { nx: 0.292, ny: 0.31, tier: 0 },
  { nx: 0.428, ny: 0.205, tier: 0 },
  { nx: 0.596, ny: 0.262, tier: 1 },
  { nx: 0.655, ny: 0.01, tier: 2 },

  // Mid-canvas & right constellation cluster (matches screenshot)
  { nx: 0.453, ny: 0.788, tier: 1 },
  { nx: 0.716, ny: 0.605, tier: 1 },
  { nx: 0.918, ny: 0.462, tier: 2 },
  { nx: 0.95, ny: 0.858, tier: 2 },
  { nx: 0.99, ny: 0.78, tier: 1 },
  { nx: 0.985, ny: 0.96, tier: 1 },

  // Additional balanced nodes across viewport for full-screen depth
  { nx: 0.82, ny: 0.16, tier: 0 },
  { nx: 0.91, ny: 0.24, tier: 1 },
  { nx: 0.76, ny: 0.34, tier: 2 },
  { nx: 0.12, ny: 0.48, tier: 2 },
  { nx: 0.22, ny: 0.62, tier: 1 },
  { nx: 0.07, ny: 0.74, tier: 0 },
  { nx: 0.18, ny: 0.88, tier: 2 },
  { nx: 0.34, ny: 0.92, tier: 2 },
  { nx: 0.58, ny: 0.52, tier: 2 },
  { nx: 0.64, ny: 0.84, tier: 0 },
  { nx: 0.78, ny: 0.91, tier: 1 },
  { nx: 0.85, ny: 0.72, tier: 1 },
];

const MAX_EDGES = 48;

export function ConstellationBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const edgeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth || 1280;
    let height = window.innerHeight || 800;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nodes: NodePoint[] = INITIAL_NODES.map((item, idx) => {
      const angle = (idx * 137.5 * Math.PI) / 180;
      const speed = item.tier === 0 ? 0.16 : item.tier === 1 ? 0.22 : 0.28;
      return {
        x: item.nx * width,
        y: item.ny * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tier: item.tier,
      };
    });

    const mouse = { x: -9999, y: -9999, active: false };

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    function handleResize() {
      const newW = window.innerWidth || 1280;
      const newH = window.innerHeight || 800;
      const scaleX = newW / width;
      const scaleY = newH / height;
      nodes.forEach((n) => {
        n.x *= scaleX;
        n.y *= scaleY;
      });
      width = newW;
      height = newH;
    }

    function renderFrame() {
      const maxDist = Math.min(Math.max(width * 0.18, 175), 250);
      const maxDistSq = maxDist * maxDist;

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n) continue;
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 12) {
            n.x = 12;
            n.vx = Math.abs(n.vx);
          } else if (n.x > width - 12) {
            n.x = width - 12;
            n.vx = -Math.abs(n.vx);
          }

          if (n.y < 12) {
            n.y = 12;
            n.vy = Math.abs(n.vy);
          } else if (n.y > height - 12) {
            n.y = height - 12;
            n.vy = -Math.abs(n.vy);
          }
        }

        const el = nodeRefs.current[i];
        if (el) {
          const offset = n.tier === 0 ? 3.5 : n.tier === 1 ? 2.5 : 1.5;
          el.style.transform = `translate3d(${(n.x - offset).toFixed(1)}px, ${(
            n.y - offset
          ).toFixed(1)}px, 0)`;
        }
      }

      // Compute edges between nearby nodes
      const edges: EdgeSegment[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        if (!ni) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          if (edges.length >= MAX_EDGES) break;
          const nj = nodes[j];
          if (!nj) continue;
          const dx = nj.x - ni.x;
          const dy = nj.y - ni.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const ratio = dist / maxDist;
            const strength: 0 | 1 | 2 =
              ratio < 0.45 ? 0 : ratio < 0.75 ? 1 : 2;
            edges.push({
              x: ni.x,
              y: ni.y,
              length: dist,
              angle: Math.atan2(dy, dx),
              strength,
            });
          }
        }
      }

      // Add subtle interactive edges to cursor when active
      if (mouse.active && !prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          if (edges.length >= MAX_EDGES) break;
          const ni = nodes[i];
          if (!ni) continue;
          const dx = mouse.x - ni.x;
          const dy = mouse.y - ni.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq * 1.1) {
            const dist = Math.sqrt(distSq);
            edges.push({
              x: ni.x,
              y: ni.y,
              length: dist,
              angle: Math.atan2(dy, dx),
              strength: dist < maxDist * 0.5 ? 0 : 1,
            });
          }
        }
      }

      // Apply transforms to pre-allocated edge DOM pool
      for (let k = 0; k < MAX_EDGES; k++) {
        const edgeEl = edgeRefs.current[k];
        if (!edgeEl) continue;
        const edge = edges[k];
        if (!edge) {
          edgeEl.style.display = "none";
        } else {
          edgeEl.style.display = "block";
          edgeEl.style.width = `${edge.length.toFixed(1)}px`;
          edgeEl.style.transform = `translate3d(${edge.x.toFixed(
            1
          )}px, ${edge.y.toFixed(1)}px, 0) rotate(${edge.angle.toFixed(4)}rad)`;
          edgeEl.className =
            edge.strength === 0
              ? "constellation-edge constellation-edge-strong"
              : edge.strength === 1
              ? "constellation-edge constellation-edge-mid"
              : "constellation-edge constellation-edge-faint";
        }
      }
    }

    renderFrame();

    let rafId = 0;
    if (!prefersReducedMotion) {
      const tick = () => {
        renderFrame();
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Upper-Left Ambient Sky-Blue Radial Glow (matches reference image) */}
      <div className="constellation-glow-primary absolute -left-24 -top-28 h-[480px] w-[760px] rounded-full blur-[110px]" />

      {/* Lower-Right Subtle Secondary Glow */}
      <div className="constellation-glow-secondary absolute -bottom-32 -right-24 h-[420px] w-[620px] rounded-full blur-[120px]" />

      {/* Pre-allocated Geometric Connecting Lines Pool */}
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

      {/* Constellation Nodes */}
      {INITIAL_NODES.map((node, idx) => (
        <div
          key={`node-${idx}`}
          ref={(el) => {
            nodeRefs.current[idx] = el;
          }}
          className={
            node.tier === 0
              ? "constellation-node constellation-node-primary"
              : node.tier === 1
              ? "constellation-node constellation-node-secondary"
              : "constellation-node constellation-node-micro"
          }
        />
      ))}
    </div>
  );
}
