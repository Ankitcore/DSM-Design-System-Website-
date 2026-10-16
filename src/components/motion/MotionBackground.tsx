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
  hasRing: boolean;
}

interface SignalPacket {
  fromNode: number;
  toNode: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
  size: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  speed: number;
}

interface GeometricGlyph {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  type: "crosshair" | "quadrant" | "box" | "arc" | "tokenTag" | "dimension";
  color: string;
  alpha: number;
  label?: string;
}

export const MotionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasResolution = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasResolution();

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

    // Interactive Ripple on click
    const ripples: ClickRipple[] = [];
    const handlePointerDown = (e: PointerEvent) => {
      // Create expanding architectural ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: Math.min(width, height) * 0.35,
        alpha: 0.45,
        color: Math.random() > 0.3 ? "67, 197, 139" : "255, 201, 74",
        speed: 3.5,
      });

      // Gently disperse nodes near the click
      for (const node of nodes) {
        const dx = node.x - e.clientX;
        const dy = node.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (1 - dist / 180) * 8;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Palette: strictly DSM brand tokens
    const palette = [
      { color: "67, 197, 139", weight: 0.65 }, // Mint Green #43C58B
      { color: "255, 201, 74", weight: 0.2 },  // Golden Yellow #FFC94A
      { color: "255, 128, 69", weight: 0.15 }, // Warm Orange #FF8045
    ];

    const pickColor = () => {
      const r = Math.random();
      if (r < 0.65) return palette[0].color;
      if (r < 0.85) return palette[1].color;
      return palette[2].color;
    };

    let nodes: NodeItem[] = [];
    let glyphs: GeometricGlyph[] = [];
    let packets: SignalPacket[] = [];
    const activePairs: [number, number][] = [];

    const tokenLabels = ["4px", "8px", "16px", "24px", "#43C58B", "tokens", "scale", "grid"];

    const initElements = () => {
      const isMobile = width < 768;
      const nodeCount = isMobile ? 22 : 44;
      const glyphCount = isMobile ? 4 : 8;

      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.35;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          radius: 1.2 + Math.random() * 1.8,
          color: pickColor(),
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.018 + Math.random() * 0.02,
          hasRing: Math.random() > 0.7,
        });
      }

      glyphs = [];
      const glyphTypes: ("crosshair" | "quadrant" | "box" | "arc" | "tokenTag" | "dimension")[] = [
        "crosshair",
        "quadrant",
        "box",
        "arc",
        "tokenTag",
        "dimension",
      ];

      for (let i = 0; i < glyphCount; i++) {
        glyphs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.004,
          size: 12 + Math.random() * 16,
          type: glyphTypes[i % glyphTypes.length],
          color: pickColor(),
          alpha: 0.12 + Math.random() * 0.14,
          label: tokenLabels[i % tokenLabels.length],
        });
      }

      packets = [];
    };

    initElements();

    // Resize handling
    const handleResize = () => {
      setupCanvasResolution();
      initElements();
      if (prefersReducedMotion) {
        drawStaticScene();
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Static scene for reduced motion preference
    const drawStaticScene = () => {
      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, width, height);

      // Fine structural background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      const gridSize = 72;

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

      // Static node points
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

    // Animation Loop
    let time = 0;
    const maxConnectionDist = 145;
    let scanLineY = 0;

    const render = () => {
      time += 0.01;

      // Mouse smooth interpolation
      if (isHovering) {
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
      }

      // 1. BASE CANVAS
      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, width, height);

      // 2. ATMOSPHERIC HARMONIC LIGHT FIELDS (Slow organic morphing)
      const ambient1X = width * 0.28 + Math.sin(time * 0.25) * 80;
      const ambient1Y = height * 0.32 + Math.cos(time * 0.2) * 70;
      const grad1 = ctx.createRadialGradient(ambient1X, ambient1Y, 0, ambient1X, ambient1Y, 520);
      grad1.addColorStop(0, "rgba(67, 197, 139, 0.055)");
      grad1.addColorStop(0.5, "rgba(67, 197, 139, 0.015)");
      grad1.addColorStop(1, "rgba(23, 23, 23, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const ambient2X = width * 0.72 + Math.cos(time * 0.22) * 90;
      const ambient2Y = height * 0.68 + Math.sin(time * 0.26) * 80;
      const grad2 = ctx.createRadialGradient(ambient2X, ambient2Y, 0, ambient2X, ambient2Y, 560);
      grad2.addColorStop(0, "rgba(255, 201, 74, 0.04)");
      grad2.addColorStop(0.5, "rgba(255, 128, 69, 0.015)");
      grad2.addColorStop(1, "rgba(23, 23, 23, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3. INTERACTIVE MOUSE SPOTLIGHT (High-tech cursor aura)
      if (isHovering && mouseX > 0 && mouseY > 0) {
        const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
        mouseGrad.addColorStop(0, "rgba(67, 197, 139, 0.085)");
        mouseGrad.addColorStop(0.4, "rgba(67, 197, 139, 0.025)");
        mouseGrad.addColorStop(1, "rgba(23, 23, 23, 0)");
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. ARCHITECTURAL COORDINATE GRID WITH CURSOR ILLUMINATION
      const gridSize = width < 768 ? 72 : 88;
      ctx.lineWidth = 1;

      // Base grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
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

      // Grid intersections & Cursor proximity illumination
      const highlightDist = 220;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          if (isHovering) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < highlightDist) {
              const alpha = (1 - d / highlightDist) * 0.35;
              // Subtle illuminated crosshair at nearby grid intersections
              ctx.strokeStyle = `rgba(67, 197, 139, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(x - 3, y);
              ctx.lineTo(x + 3, y);
              ctx.moveTo(x, y - 3);
              ctx.lineTo(x, y + 3);
              ctx.stroke();
            }
          }
        }
      }

      // 5. RADAR / CALIBRATION SCANNING BEAM
      scanLineY = (scanLineY + 0.4) % (height + 300);
      const scanGrad = ctx.createLinearGradient(0, scanLineY - 120, 0, scanLineY);
      scanGrad.addColorStop(0, "rgba(67, 197, 139, 0)");
      scanGrad.addColorStop(0.9, "rgba(67, 197, 139, 0.025)");
      scanGrad.addColorStop(1, "rgba(67, 197, 139, 0.05)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLineY - 120, width, 120);

      ctx.strokeStyle = "rgba(67, 197, 139, 0.06)";
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(width, scanLineY);
      ctx.stroke();

      // 6. EXPANDING INTERACTIVE CLICK RIPPLES
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.alpha *= 0.965;

        ctx.strokeStyle = `rgba(${rip.color}, ${rip.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary concentric dashed halo
        if (rip.radius > 25) {
          ctx.save();
          ctx.setLineDash([4, 6]);
          ctx.strokeStyle = `rgba(${rip.color}, ${rip.alpha * 0.45})`;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.65, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // 7. NODE CONSTELLATION & ACTIVE CONNECTIONS
      activePairs.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            activePairs.push([i, j]);
            const lineAlpha = (1 - dist / maxConnectionDist) * 0.09;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 8. DATA SIGNAL PACKETS TRAVELING ALONG GRAPH EDGES
      // Spawn new packet occasionally if capacity allows
      if (packets.length < 8 && activePairs.length > 0 && Math.random() < 0.05) {
        const randomPair = activePairs[Math.floor(Math.random() * activePairs.length)];
        packets.push({
          fromNode: randomPair[0],
          toNode: randomPair[1],
          progress: 0,
          speed: 0.012 + Math.random() * 0.018,
          color: Math.random() > 0.3 ? "67, 197, 139" : "255, 201, 74",
          size: 1.5 + Math.random() * 1.5,
        });
      }

      // Render and update packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1 || !nodes[pkt.fromNode] || !nodes[pkt.toNode]) {
          packets.splice(i, 1);
          continue;
        }

        const n1 = nodes[pkt.fromNode];
        const n2 = nodes[pkt.toNode];
        const px = n1.x + (n2.x - n1.x) * pkt.progress;
        const py = n1.y + (n2.y - n1.y) * pkt.progress;

        // Glowing packet head
        const pktAlpha = Math.sin(pkt.progress * Math.PI) * 0.85;
        ctx.fillStyle = `rgba(${pkt.color}, ${pktAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fill();

        // Tracer glow
        ctx.fillStyle = `rgba(${pkt.color}, ${pktAlpha * 0.25})`;
        ctx.beginPath();
        ctx.arc(px, py, pkt.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 9. NODES WITH ORGANIC PULSE & DAMPED MOUSE REPULSION
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        // Smooth boundaries wrap
        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        if (node.y > height + 30) node.y = -30;

        // Mouse proximity interaction (elastic deflection)
        if (isHovering) {
          const mdx = node.x - mouseX;
          const mdy = node.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxMouseDist = 170;

          if (mdist < maxMouseDist && mdist > 0) {
            const force = (1 - mdist / maxMouseDist) * 1.8;
            node.x += (mdx / mdist) * force;
            node.y += (mdy / mdist) * force;
          }
        }

        // Pulse alpha
        node.phase += node.pulseSpeed;
        const currentAlpha = node.baseAlpha + Math.sin(node.phase) * 0.12;
        const finalAlpha = Math.max(0.08, currentAlpha);

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${finalAlpha})`;
        ctx.fill();

        // Architectural concentric dashed orbit on designated primary nodes
        if (node.hasRing) {
          ctx.save();
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = `rgba(${node.color}, ${finalAlpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3.8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Soft halo on larger nodes
        if (node.radius > 2.2) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.color}, 0.04)`;
          ctx.fill();
        }
      }

      // 10. FLOATING DESIGN SYSTEM GLYPHS & TOKEN CHIPS
      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i];

        glyph.x += glyph.vx;
        glyph.y += glyph.vy;
        glyph.rotation += glyph.rotSpeed;

        if (glyph.x < -50) glyph.x = width + 50;
        if (glyph.x > width + 50) glyph.x = -50;
        if (glyph.y < -50) glyph.y = height + 50;
        if (glyph.y > height + 50) glyph.y = -50;

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
          // Micro center ring
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.stroke();
        } else if (glyph.type === "quadrant") {
          ctx.beginPath();
          ctx.arc(0, 0, glyph.size, 0, Math.PI / 2);
          ctx.stroke();
          // Chord line
          ctx.beginPath();
          ctx.moveTo(glyph.size, 0);
          ctx.lineTo(0, glyph.size);
          ctx.setLineDash([2, 3]);
          ctx.stroke();
        } else if (glyph.type === "box") {
          const half = glyph.size / 2;
          ctx.strokeRect(-half, -half, glyph.size, glyph.size);
          // Center coordinate tick
          ctx.beginPath();
          ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${glyph.color}, ${glyph.alpha})`;
          ctx.fill();
        } else if (glyph.type === "arc") {
          ctx.beginPath();
          ctx.arc(0, 0, glyph.size, -Math.PI / 4, (3 * Math.PI) / 4);
          ctx.stroke();
        } else if (glyph.type === "tokenTag" && glyph.label) {
          // Architectural token label chip: e.g. "4px", "#43C58B"
          ctx.font = "10px monospace";
          ctx.fillStyle = `rgba(${glyph.color}, ${glyph.alpha * 1.2})`;
          ctx.strokeStyle = `rgba(${glyph.color}, ${glyph.alpha * 0.4})`;
          const textWidth = ctx.measureText(glyph.label).width;
          const padding = 5;
          ctx.strokeRect(-textWidth / 2 - padding, -8, textWidth + padding * 2, 16);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(glyph.label, 0, 0);
        } else if (glyph.type === "dimension") {
          // Dimension line with arrowheads
          const len = glyph.size * 1.4;
          ctx.beginPath();
          ctx.moveTo(-len / 2, 0);
          ctx.lineTo(len / 2, 0);
          ctx.moveTo(-len / 2, -3);
          ctx.lineTo(-len / 2, 3);
          ctx.moveTo(len / 2, -3);
          ctx.lineTo(len / 2, 3);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Visibility management
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
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
