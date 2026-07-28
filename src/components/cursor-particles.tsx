"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; size: number; life: number; maxLife: number; color: string };

export function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !finePointer.matches || reducedMotion.matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const particles: Particle[] = [];
    let width = 0, height = 0, lastX = 0, lastY = 0, lastAt = 0, frame = 0, previous = performance.now();
    let positioned = false;
    const resize = () => {
      width = innerWidth; height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const add = (x: number, y: number, vx: number, vy: number, burst = false) => {
      if (particles.length >= 130) particles.shift();
      const life = (burst ? 480 : 350) + Math.random() * 300;
      particles.push({ x, y, vx, vy, size: 1 + Math.random() * 2.2, life, maxLife: life, color: `hsla(${Math.floor(Math.random() * 360)},88%,56%,.72)` });
    };
    const draw = (now: number) => {
      const elapsed = now - previous; const delta = Math.min(32, elapsed); previous = now;
      context.clearRect(0, 0, width, height);
      for (let index = particles.length - 1; index >= 0; index--) {
        const particle = particles[index]!;
        particle.life -= elapsed;
        if (particle.life <= 0) { particles.splice(index, 1); continue; }
        const seconds = delta / 1000; particle.vy += 88 * seconds; particle.vx *= Math.pow(.985, delta / 16.67); particle.x += particle.vx * seconds; particle.y += particle.vy * seconds;
        const progress = particle.life / particle.maxLife;
        context.globalAlpha = Math.min(1, progress * 1.8); context.fillStyle = particle.color; context.beginPath(); context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); context.fill();
      }
      context.globalAlpha = 1; frame = particles.length ? requestAnimationFrame(draw) : 0;
    };
    const start = () => { if (!frame) { previous = performance.now(); frame = requestAnimationFrame(draw); } };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      if (!positioned) { lastX = event.clientX; lastY = event.clientY; lastAt = now; positioned = true; return; }
      const dx = event.clientX - lastX, dy = event.clientY - lastY, distance = Math.hypot(dx, dy), speed = distance / Math.max(8, now - lastAt);
      if (distance > 1 && speed > .05) for (let index = 0; index < Math.min(7, Math.max(1, Math.round(distance / 18))); index++) add(lastX + dx * (index / 7), lastY + dy * (index / 7), -dx * 1.2 + (Math.random() - .5) * 35, -dy * .7 + 35 + Math.random() * 25);
      lastX = event.clientX; lastY = event.clientY; lastAt = now; start();
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      for (let index = 0; index < 18; index++) { const angle = index / 18 * Math.PI * 2; const force = 45 + Math.random() * 60; add(event.clientX, event.clientY, Math.cos(angle) * force, Math.sin(angle) * force, true); } start();
    };
    resize(); addEventListener("resize", resize); addEventListener("pointermove", move); addEventListener("pointerdown", down);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); removeEventListener("pointermove", move); removeEventListener("pointerdown", down); };
  }, []);
  return <canvas ref={canvasRef} className="cursor-particles fixed inset-0 z-30 size-full pointer-events-none motion-reduce:hidden max-[900px]:hidden" aria-hidden="true" />;
}
