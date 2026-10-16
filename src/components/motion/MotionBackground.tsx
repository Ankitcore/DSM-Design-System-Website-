"use client";

import React, { useEffect, useRef } from "react";

interface NodeItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  phase: number;
  pulseSpeed: number;
}

interface GeometricGlyph {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  type: "crosshair" | "quadrant" | "box" | "arc";
  color: string;
  alpha: number;
}

export const MotionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        drawStaticScene();
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Mouse coordinates with smooth damping
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let isHovering = false;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isHovering = true;
    };

    const handlePointerLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
      isHovering = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
      if (prefersReducedMotion) {
        drawStaticScene();
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Design System Token Colors
    const palette = [
      { color: "67, 197, 139", weight: 0.6 }, // Mint Green #43C58B
      { color: "255, 201, 74", weight: 0.25 }, // Golden Yellow #FFC94A
      { color: "255, 128, 69", weight: 0.15 }, // Warm Orange #FF8045
    ];

    const pickColor = () => {
      const r = Math.random();
      if (r < 0.6) return palette[0].color;
      if (r < 0.85) return palette[1].color;
      return palette[2].color;
    };

    let nodes: NodeItem[] = [];
    let glyphs: GeometricGlyph[] = [];

    const initElements = () => {
      const isMobile = width < 768;
      const nodeCount = isMobile ? 18 : 38;
      const glyphCount = isMobile ? 3 : 7;

      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const baseAlpha = 0.18 + Math.random() * 0.32;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.2 + Math.random() * 1.6,
          color: pickColor(),
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        });
      }

      glyphs = [];
      const glyphTypes: ("crosshair" | "quadrant" | "box" | "arc")[] = [
        "crosshair",
        "quadrant",
        "box",
        "arc",
      ];
      for (let i = 0; i < glyphCount; i++) {
        glyphs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.003,
          size: 10 + Math.random() * 14,
          type: glyphTypes[i % glyphTypes.length],
          color: pickColor(),
          alpha: 0.12 + Math.random() * 0.15,
        });
      }
    };

    initElements();

    // Static scene for reduced-motion mode
    const drawStaticScene = () => {
      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, width, height);

      // Fine structural background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      const gridSize = 80;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Static node matrix
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${node.baseAlpha})`;
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      drawStaticScene();
      return;
    }

    // Main animation loop
    let time = 0;
    const maxConnectionDist = 135;

    const render = () => {
      time += 0.01;

      // Smooth mouse interpolation
      if (isHovering) {
        mouseX += (targetMouseX - mouseX) * 0.06;
        mouseY += (targetMouseY - mouseY) * 0.06;
      }

      // 1. Clear with base canvas #171717
      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, width, height);

      // 2. Structural Layer: Fine 1px architectural grid
      const gridSize = width < 768 ? 90 : 110;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Ambient Atmospheric Glow Pools (breathing light fields)
      const ambient1X = width * 0.25 + Math.sin(time * 0.3) * 60;
      const ambient1Y = height * 0.3 + Math.cos(time * 0.25) * 50;
      const grad1 = ctx.createRadialGradient(ambient1X, ambient1Y, 0, ambient1X, ambient1Y, 420);
      grad1.addColorStop(0, "rgba(67, 197, 139, 0.045)");
      grad1.addColorStop(0.6, "rgba(67, 197, 139, 0.01)");
      grad1.addColorStop(1, "rgba(23, 23, 23, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const ambient2X = width * 0.75 + Math.cos(time * 0.28) * 70;
      const ambient2Y = height * 0.65 + Math.sin(time * 0.32) * 60;
      const grad2 = ctx.createRadialGradient(ambient2X, ambient2Y, 0, ambient2X, ambient2Y, 460);
      grad2.addColorStop(0, "rgba(255, 201, 74, 0.035)");
      grad2.addColorStop(0.5, "rgba(255, 128, 69, 0.012)");
      grad2.addColorStop(1, "rgba(23, 23, 23, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 4. Update and Draw Moving Connection Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            const lineAlpha = (1 - dist / maxConnectionDist) * 0.07;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 5. Update and Draw Nodes with organic pulse and mouse reaction
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around boundaries smoothly
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        // Mouse displacement (gentle repulsion)
        if (isHovering) {
          const mdx = node.x - mouseX;
          const mdy = node.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxMouseDist = 160;

          if (mdist < maxMouseDist && mdist > 0) {
            const force = (1 - mdist / maxMouseDist) * 1.4;
            node.x += (mdx / mdist) * force;
            node.y += (mdy / mdist) * force;
          }
        }

        // Pulse alpha
        node.phase += node.pulseSpeed;
        const currentAlpha = node.baseAlpha + Math.sin(node.phase) * 0.1;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${Math.max(0.08, currentAlpha)})`;
        ctx.fill();

        // Subtle core glow on mint nodes
        if (node.color === palette[0].color && node.radius > 2.0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.color}, 0.035)`;
          ctx.fill();
        }
      }

      // 6. Draw Subtle Floating Geometric Primitives (Design System Symbols)
      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i];

        glyph.x += glyph.vx;
        glyph.y += glyph.vy;
        glyph.rotation += glyph.rotSpeed;

        if (glyph.x < -30) glyph.x = width + 30;
        if (glyph.x > width + 30) glyph.x = -30;
        if (glyph.y < -30) glyph.y = height + 30;
        if (glyph.y > height + 30) glyph.y = -30;

        ctx.save();
        ctx.translate(glyph.x, glyph.y);
        ctx.rotate(glyph.rotation);
        ctx.strokeStyle = `rgba(${glyph.color}, ${glyph.alpha})`;
        ctx.lineWidth = 1.2;

        if (glyph.type === "crosshair") {
          const half = glyph.size / 2;
          ctx.beginPath();
          ctx.moveTo(-half, 0);
          ctx.lineTo(half, 0);
          ctx.moveTo(0, -half);
          ctx.lineTo(0, half);
          ctx.stroke();
        } else if (glyph.type === "quadrant") {
          // Arc quadrant echoing DSM geometry
          ctx.beginPath();
          ctx.arc(0, 0, glyph.size, 0, Math.PI / 2);
          ctx.stroke();
        } else if (glyph.type === "box") {
          // Architectural square
          const half = glyph.size / 2;
          ctx.strokeRect(-half, -half, glyph.size, glyph.size);
        } else if (glyph.type === "arc") {
          ctx.beginPath();
          ctx.arc(0, 0, glyph.size, -Math.PI / 3, Math.PI / 3);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause when page is hidden (tab switch or minimized)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup lifecycle
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{
        backgroundColor: "#171717",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
