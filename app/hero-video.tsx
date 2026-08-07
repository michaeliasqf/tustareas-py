"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = (visible: boolean) => {
      if (motionPreference.matches || !visible) video.pause();
      else video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => updatePlayback(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(video);
    const preferenceChanged = () => updatePlayback(true);
    motionPreference.addEventListener("change", preferenceChanged);
    updatePlayback(true);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", preferenceChanged);
      video.pause();
    };
  }, []);

  return (
    <div className="hero-video-frame">
      <video ref={videoRef} muted loop playsInline preload="metadata" aria-label="Docente orientando a una estudiante durante una sesión de tutoría en una biblioteca">
        <source src="/hero-tutoring-library-hd.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-tint" aria-hidden="true" />
    </div>
  );
}
