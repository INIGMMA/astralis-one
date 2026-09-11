"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  speed: number;
  phase: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function Starfield({
  className,
  density = 0.00012,
}: {
  className?: string;
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(w * h * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        base: Math.random() * 0.55 + 0.2,
        speed: Math.random() * 1.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * w * 0.8 + w * 0.1,
        y: Math.random() * h * 0.25,
        vx: -(Math.random() * 5 + 6),
        vy: Math.random() * 3 + 2.4,
        life: 0,
        maxLife: 60 + Math.random() * 30,
      });
    };

    let meteorTimer = 0;
    let t = 0;

    const draw = () => {
      t += 1 / 60;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const tw = s.base + Math.sin(t * s.speed + s.phase) * 0.35;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#e9e4ff";
        ctx.fill();
      }

      meteorTimer -= 1;
      if (meteorTimer <= 0) {
        if (Math.random() > 0.4) spawnMeteor();
        meteorTimer = 240 + Math.random() * 420;
      }

      meteors = meteors.filter((m) => m.life < m.maxLife);
      for (const m of meteors) {
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        const fade = 1 - m.life / m.maxLife;
        ctx.globalAlpha = fade * 0.9;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 9, m.y - m.vy * 9);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(1, "rgba(139,92,246,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className={cn("pointer-events-none", className)} aria-hidden />;
}
