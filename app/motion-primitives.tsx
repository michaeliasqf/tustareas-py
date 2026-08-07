"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  intensity?: number;
};

export function Tilt3D({ children, className, as = "div", intensity = 7 }: TiltProps) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), { stiffness: 180, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), { stiffness: 180, damping: 24 });
  const glowX = useTransform(mouseX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(mouseY, [0, 1], ["10%", "90%"]);

  function move(event: MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const props = {
    className: `tilt-surface ${className || ""}`,
    onMouseMove: move,
    onMouseLeave: reset,
    style: reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 },
    whileHover: reduced ? undefined : { scale: 1.012, z: 20 },
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  };

  const content = <>{children}<motion.span aria-hidden="true" className="tilt-glow" style={{ left: glowX, top: glowY }} /></>;
  return as === "article" ? <motion.article {...props}>{content}</motion.article> : <motion.div {...props}>{content}</motion.div>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FloatLayer({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ y: -7, scale: 1.025 }} transition={{ type: "spring", stiffness: 180, damping: 18, delay }}>{children}</motion.div>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
