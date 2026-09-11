"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Plug, Orbit, BedDouble } from "lucide-react";
import Reveal from "../Reveal";

const STEPS = [
  {
    icon: Plug,
    num: "01",
    title: "Branche. C'est tout.",
    text: "Un seul câble USB-C. Pose-le sur la table de nuit, vise le plafond, allume.",
  },
  {
    icon: Orbit,
    num: "02",
    title: "Choisis ta scène.",
    text: "Nébuleuse lente pour dormir, aurore boréale pour rêver, mode fête synchronisé musique.",
  },
  {
    icon: BedDouble,
    num: "03",
    title: "Dérive vers le sommeil.",
    text: "Le minuteur éteint tout en douceur. Ton cerveau, lui, est déjà ailleurs.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <section id="experience" ref={ref} className="relative mx-auto max-w-6xl px-5 py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-130 w-200 -translate-x-1/2 rounded-full bg-neon/10 blur-[140px]" />

      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* images stack */}
        <div className="relative h-130 sm:h-150">
          <motion.div style={{ y: yA }} className="absolute left-0 top-0 w-[68%]">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-40px_rgba(139,92,246,0.45)]">
              <Image
                src="/img/bedroom.jpg"
                alt="Chambre dont le plafond est recouvert d'une projection de galaxie violette"
                width={760}
                height={900}
                className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
          <motion.div style={{ y: yB }} className="absolute bottom-0 right-0 w-[52%]">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 ring-glow">
              <Image
                src="/img/living.jpg"
                alt="Salon baigné d'une projection d'aurore boréale"
                width={620}
                height={720}
                className="aspect-5/6 w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-strong absolute right-[6%] top-[8%] rounded-3xl px-5 py-4 text-center"
          >
            <span className="font-display block text-3xl font-800 text-holo">30 m²</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-mist">de ciel étoilé</span>
          </motion.span>
        </div>

        {/* copy */}
        <div>
          <Reveal>
            <p className="eyebrow">L'expérience Astralis</p>
            <h2 className="mt-5 font-display text-4xl font-800 leading-[1.08] sm:text-5xl">
              Une pièce.
              <span className="text-holo block">Un univers.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
              Éteins la lumière. Allume <span className="font-serif italic text-ink">ASTRALIS ONE</span>.
              En trois secondes, ton plafond s'ouvre sur une nébuleuse en mouvement lent,
              parsemée d'étoiles dérivantes. Zéro installation, zéro application obligatoire.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.12}>
                <div className="glass group flex items-start gap-5 rounded-3xl p-5 transition-all duration-500 hover:border-neon/40 hover:bg-white/4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-neon/30 to-nova/15 text-pulsar transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-faint">
                      Étape {step.num}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-600 text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
