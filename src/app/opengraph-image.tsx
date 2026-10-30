// Dynamic root Open Graph image displaying Syed Ali Hussain's name, role line, and value statement.
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.roleLine}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0f12",
          color: "#f8fafc",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24,
            color: "#38bdf8",
            fontWeight: 600,
          }}
        >
          <span>{profile.roleLine}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#cbd5e1",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            {profile.valueStatement}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #333b4a",
            paddingTop: "28px",
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <span>{profile.site.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#38bdf8" }}>
            NovaBrief Tech · SZABIST · AIEYS
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
