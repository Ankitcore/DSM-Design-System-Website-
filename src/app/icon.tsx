import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          padding: "2px",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path d="M 2 1 A 41 41 0 0 1 2 83 V 1 Z" fill="#4BD1A0" />
          <circle cx="73" cy="38.5" r="24" fill="#FDC527" />
          <path d="M 49 53 L 91 99 H 7 A 50 50 0 0 1 49 53 Z" fill="#FD702D" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
