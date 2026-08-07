"use client";

import { useEffect, useRef } from "react";

export default function HeroFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: 38 }, (_, index) => ({
      x: ((index * 73) % 101) / 100,
      y: ((index * 47) % 97) / 96,
      depth: 0.3 + ((index * 29) % 65) / 100,
      radius: 0.8 + (index % 4) * 0.45,
    }));
    let width = 0;
    let height = 0;
    let frame = 0;
    let scrollY = window.scrollY;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const onScroll = () => { scrollY = window.scrollY; };
    const draw = (stamp = 0) => {
      context.clearRect(0, 0, width, height);
      const time = reduced ? 0 : stamp * 0.00025;
      const scrollShift = Math.min(scrollY, height) * 0.18;
      for (let band = 0; band < 5; band += 1) {
        context.beginPath();
        const base = height * (0.18 + band * 0.17) - scrollShift * (0.12 + band * 0.035);
        for (let x = -50; x <= width + 50; x += 28) {
          const y = base + Math.sin(x * 0.008 + time * (1.1 + band * 0.18) + band) * (28 + band * 8);
          if (x === -50) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = band % 2 ? "rgba(7,83,239,.18)" : "rgba(105,157,209,.22)";
        context.lineWidth = band % 2 ? 1.2 : 1.7;
        context.stroke();
      }
      points.forEach((point, index) => {
        const travel = ((point.y + time * (0.22 + point.depth * 0.2) + scrollY * 0.00015 * point.depth) % 1.15) - 0.05;
        const x = point.x * width + Math.sin(time * 1.8 + index) * 13 * point.depth;
        const y = travel * height;
        context.beginPath();
        context.arc(x, y, point.radius * point.depth, 0, Math.PI * 2);
        context.shadowColor = "rgba(7,83,239,.32)";
        context.shadowBlur = 8;
        context.fillStyle = `rgba(7,83,239,${0.1 + point.depth * 0.18})`;
        context.fill();
        context.shadowBlur = 0;
      });
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize();
    draw();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-flow-canvas" aria-hidden="true" />;
}
