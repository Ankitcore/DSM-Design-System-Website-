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
          <div
            style={{
              width: "48px",
              height: "48px",
              position: "relative",
              display: "flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "24px",
                height: "24px",
                backgroundColor: "#43C58B",
                borderTopLeftRadius: "24px",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "24px",
                height: "24px",
                backgroundColor: "#FF8045",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "4px",
                top: "4px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#FFC94A",
              }}
            />
          </div>
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
