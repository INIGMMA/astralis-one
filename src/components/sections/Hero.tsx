"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Bluetooth,
  Moon,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Truck,
} from "lucide-react";
import Starfield from "../Starfield";
import { HERO_VIDEO, BUNDLES } from "@/lib/config";
import { euro } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay: 0.15 + i * 0.12, ease },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-svh overflow-hidden">
      {/* ambient video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-35"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/55 to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_72%_38%,rgba(139,92,246,0.22),transparent_60%)]" />
      </div>
      <Starfield className="absolute inset-0 h-full w-full" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 pb-24 pt-36 md:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-4">
        {/* left copy */}
        <motion.div style={{ y: yText }}>
          <motion.p variants={rise} initial="hidden" animate="show" custom={0} className="eyebrow flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5" />
            Le projecteur galaxie plébiscité en France
          </motion.p>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 font-display text-[2.6rem] font-800 leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            Ton plafond devient
            <span className="text-holo block">la voie lactée.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-mist"
          >
            <span className="font-serif italic text-ink">ASTRALIS ONE</span> projette une
            nébuleuse vivante sur 30&nbsp;m² en 3 secondes. 21 scènes cosmiques, enceinte
            Bluetooth, minuteur d'endormissement.
            <span className="text-ink font-medium">
              {" "}L'objet déco le plus hypnotique de l'année.
            </span>
          </motion.p>

          <motion.div variants={rise} initial="hidden" animate="show" custom={3} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/#offres"
              className="btn-primary ring-glow inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white"
            >
              Je veux ma galaxie — {euro(BUNDLES[0].price)}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-mist">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nova opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-nova" />
              </span>
              Offre de lancement −44%
            </span>
          </motion.div>

          <motion.div variants={rise} initial="hidden" animate="show" custom={4} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-mist">
            <span className="inline-flex items-center gap-2">
              <span className="flex text-star">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span className="text-ink font-semibold">4,8/5</span> · 2 314 avis
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-comet" /> Paiement à la livraison
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-comet" /> Expédié sous 24-48 h
            </span>
          </motion.div>
        </motion.div>

        {/* right product */}
        <motion.div style={{ y: yImg }} className="relative mx-auto w-full max-w-105">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.35, ease }}
            className="relative"
          >
            <div className="absolute inset-6 rounded-full bg-neon/30 blur-[90px] animate-pulse-glow" />
            <div className="animate-float">
              <Image
                src="/img/hero.png"
                alt="Projecteur galaxie ASTRALIS ONE projetant une nébuleuse violette"
                width={880}
                height={880}
                priority
                className="relative z-10 w-full rounded-[2.5rem] object-cover shadow-[0_50px_120px_-30px_rgba(139,92,246,0.5)] [mask-image:radial-gradient(circle_at_center,black_62%,transparent_78%)]"
              />
            </div>

            {[
              { icon: Bluetooth, label: "Bluetooth 5.3", className: "left-0 top-[16%]", delay: "0s" },
              { icon: Moon, label: "21 scènes", className: "right-[-2%] top-[38%]", delay: "1.2s" },
              { icon: Timer, label: "Minuteur nuit", className: "bottom-[14%] left-[6%]", delay: "2.1s" },
            ].map(({ icon: Icon, label, className, delay }) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9, ease }}
                style={{ animationDelay: delay }}
                className={`glass-strong absolute z-20 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-medium text-ink shadow-lg ${className}`}
              >
                <Icon className="h-4 w-4 text-pulsar" />
                {label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-faint"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-pulsar"
          />
        </div>
      </motion.div>
    </section>
  );
}
