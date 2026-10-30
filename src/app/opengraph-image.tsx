// Dynamic OpenGraph image generator displaying Syed Ali Hussain's name, roles, and headline.
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.headline}`;
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
          backgroundColor: "#111111",
          color: "#f5f5f5",
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
            color: "#00e5ff",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>{profile.roles.join(" · ")}</span>
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
              fontSize: 32,
              color: "#a3a3a3",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #262626",
            paddingTop: "28px",
            fontSize: 22,
            color: "#737373",
          }}
        >
          <span>{profile.site.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#00e5ff" }}>NovaBrief Tech · SZABIST · AIEYS</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
