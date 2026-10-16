import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "DSM — Design System for Modern Products";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#171717",
          padding: "80px",
          border: "2px solid #353535",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Logo emblem */}
          <svg
            width="52"
            height="52"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path d="M 2 1 A 41 41 0 0 1 2 83 V 1 Z" fill="#4BD1A0" />
            <circle cx="73" cy="38.5" r="24" fill="#FDC527" />
            <path d="M 49 53 L 91 99 H 7 A 50 50 0 0 1 49 53 Z" fill="#FD702D" />
          </svg>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#F5F5F2",
              letterSpacing: "-0.04em",
            }}
          >
            DSM.
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "18px",
              color: "#43C58B",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            DSM / DESIGN SYSTEM
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#F5F5F2",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Build better products. Faster.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#A7A7A1",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            A thoughtfully crafted design system for modern products. Reusable components, design foundations, and WCAG 2.2 AA standards.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "32px",
            borderTop: "1px solid #353535",
            fontSize: "18px",
            color: "#73736E",
            fontFamily: "monospace",
          }}
        >
          <span>WCAG 2.2 AA Audited • Strict TypeScript</span>
          <span style={{ color: "#43C58B" }}>v2.1.0 Stable</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
