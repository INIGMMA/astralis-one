"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PackageCheck, ShieldCheck, Timer } from "lucide-react";
import Starfield from "../Starfield";
import Reveal from "../Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden px-5 pb-28 pt-10">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-neon/25">
          <div className="absolute inset-0">
            <Image
              src="/img/bedroom.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/55 to-void/90" />
          </div>
          <Starfield className="absolute inset-0 h-full w-full" density={0.00009} />

          <div className="relative z-10 px-6 py-20 text-center sm:px-16 sm:py-28">
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mist"
            >
              <Timer className="h-3.5 w-3.5 text-nova" />
              Offre de lancement — stock limité
            </motion.span>

            <h2 className="mx-auto mt-8 max-w-3xl font-display text-4xl font-800 leading-[1.06] sm:text-6xl">
              Ce soir, ta chambre peut devenir
              <span className="text-holo block">un observatoire.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-mist">
              Chaque soir sans ASTRALIS, c'est un plafond blanc de trop.
            </p>

            <div className="mt-10 flex flex-col items-center gap-5">
              <Link
                href="/commande?pack=duo"
                className="btn-primary ring-glow inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold text-white"
              >
                Je réclame ma galaxie
                <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-mist">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-comet" /> Paiement à la livraison
                </span>
                <span className="inline-flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-comet" /> Retour gratuit 30 jours
                </span>
              </div>

              {/* stock bar */}
              <div className="mt-2 w-full max-w-sm">
                <div className="flex justify-between text-xs text-faint">
                  <span>Stock du lot de lancement</span>
                  <span className="text-nova font-semibold">82% écoulé</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "82%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-neon to-nova"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
