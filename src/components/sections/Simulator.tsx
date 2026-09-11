"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Gauge, Megaphone, ShoppingBag, Target, TrendingUp } from "lucide-react";
import Reveal from "../Reveal";
import { BRAND, UNIT_COST } from "@/lib/config";
import { euro } from "@/lib/utils";

const PRESETS = [
  { label: "Lancement", sales: 1, ads: 5 },
  { label: "Croisière", sales: 2, ads: 10 },
  { label: "Fusée", sales: 4, ads: 18 },
];

export default function Simulator() {
  const [sales, setSales] = useState(2);
  const [ads, setAds] = useState(10);
  const avgCart = 72; // panier moyen constaté (mix des 3 packs)
  const avgQty = 1.6; // unités moyennes par commande

  const calc = useMemo(() => {
    const revenue = sales * avgCart;
    const cogs = sales * avgQty * UNIT_COST;
    const gross = revenue - cogs;
    const net = gross - ads;
    const month = net * 30;
    const progress = Math.max(0, Math.min(100, (net / BRAND.goalPerDay) * 100));
    return { revenue, gross, net, month, progress };
  }, [sales, ads]);

  const reached = calc.net >= BRAND.goalPerDay;

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-comet/12 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-nova/12 blur-[120px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <Target className="h-3.5 w-3.5" />
                Le plan derrière la boutique
              </p>
              <h2 className="mt-5 font-display text-3xl font-800 leading-tight sm:text-4xl">
                Ta trajectoire vers <span className="text-holo">50 € / jour</span>
              </h2>
              <p className="mt-5 leading-relaxed text-mist">
                Prix fournisseur négocié : <span className="text-ink font-semibold">{euro(UNIT_COST)}</span>{" "}
                livré. Panier moyen observé : <span className="text-ink font-semibold">{euro(avgCart)}</span>.
                Résultat : <span className="text-ink font-semibold">2 ventes par jour</span> suffisent
                pour dépasser l'objectif, pubs incluses. Fais glisser les curseurs :
              </p>

              <div className="mt-8 space-y-7">
                <div>
                  <div className="mb-2.5 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 text-mist">
                      <ShoppingBag className="h-4 w-4 text-pulsar" />
                      Ventes par jour
                    </span>
                    <span className="font-display text-lg font-700 text-ink">{sales}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={sales}
                    onChange={(e) => setSales(Number(e.target.value))}
                    className="w-full accent-violet-500"
                    aria-label="Ventes par jour"
                  />
                </div>
                <div>
                  <div className="mb-2.5 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 text-mist">
                      <Megaphone className="h-4 w-4 text-pulsar" />
                      Budget pub / jour
                    </span>
                    <span className="font-display text-lg font-700 text-ink">{euro(ads)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={ads}
                    onChange={(e) => setAds(Number(e.target.value))}
                    className="w-full accent-violet-500"
                    aria-label="Budget publicité par jour"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setSales(p.sales);
                        setAds(p.ads);
                      }}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        sales === p.sales && ads === p.ads
                          ? "bg-neon text-white"
                          : "bg-white/6 text-mist hover:bg-white/12"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* results */}
          <Reveal delay={0.15}>
            <div className="flex h-full flex-col justify-center gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-void/60 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-faint">CA / jour</p>
                  <p className="mt-2 font-display text-2xl font-700">{euro(calc.revenue)}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-void/60 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-faint">Marge brute</p>
                  <p className="mt-2 font-display text-2xl font-700">{euro(calc.gross)}</p>
                </div>
              </div>

              <div
                className={`relative overflow-hidden rounded-3xl border p-6 transition-colors duration-500 ${
                  reached ? "border-comet/40 bg-comet/8" : "border-neon/30 bg-neon/8"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mist">
                    <Gauge className="h-4 w-4" />
                    Profit net / jour (pubs déduites)
                  </p>
                  <TrendingUp className={`h-5 w-5 ${reached ? "text-comet" : "text-pulsar"}`} />
                </div>
                <motion.p
                  key={calc.net.toFixed(2)}
                  initial={{ opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 font-display text-5xl font-800 ${reached ? "text-comet" : "text-holo"}`}
                >
                  {euro(calc.net)}
                </motion.p>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-faint">
                    <span>Objectif {euro(BRAND.goalPerDay)}/jour</span>
                    <span>{Math.round(calc.progress)}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className={`h-full rounded-full ${
                        reached
                          ? "bg-gradient-to-r from-comet to-emerald-400"
                          : "bg-gradient-to-r from-neon via-nova to-comet"
                      }`}
                      animate={{ width: `${calc.progress}%` }}
                      transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    />
                  </div>
                  <p className="mt-3 text-sm">
                    {reached ? (
                      <span className="text-comet font-semibold">
                        Objectif atteint — environ {euro(calc.month)} de profit par mois.
                      </span>
                    ) : (
                      <span className="text-mist">
                        Plus que {euro(Math.max(0, BRAND.goalPerDay - calc.net))}/jour pour
                        atteindre l'objectif.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
