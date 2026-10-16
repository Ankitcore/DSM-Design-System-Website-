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
          borderRadius: "6px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Quadrant mark */}
        <div
          style={{
            position: "absolute",
            left: "4px",
            top: "4px",
            width: "12px",
            height: "12px",
            backgroundColor: "#43C58B",
            borderTopLeftRadius: "12px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "4px",
            bottom: "4px",
            width: "12px",
            height: "12px",
            backgroundColor: "#FF8045",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "6px",
            top: "6px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#FFC94A",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
