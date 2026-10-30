// Dynamic per-project Open Graph image (/projects/[slug]/opengraph-image) so project pages have unique social cards.
import { ImageResponse } from "next/og";
import { profile, projects } from "@/data/portfolio";

export const alt = "Project Case Study — Syed Ali Hussain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const title = project?.title ?? "Project Case Study";
  const description = project?.description ?? profile.valueStatement;
  const tags = project?.tags ?? ["AI Agents", "Next.js"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0d0f12",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 22,
            color: "#38bdf8",
            fontWeight: 600,
          }}
        >
          <span>{profile.name} · Case Study</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#cbd5e1",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                border: "1px solid #333b4a",
                backgroundColor: "#15181e",
                color: "#38bdf8",
                fontSize: 20,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
