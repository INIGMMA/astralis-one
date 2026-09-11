import Link from "next/link";
import { ArrowRight, Check, Flame, ShieldCheck, Truck } from "lucide-react";
import Reveal from "../Reveal";
import { BUNDLES } from "@/lib/config";
import { euro } from "@/lib/utils";

export default function Bundles() {
  return (
    <section id="offres" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-150 w-full -translate-x-1/2 rounded-full bg-neon/8 blur-[160px]" />

      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Offre de lancement</p>
        <h2 className="mt-5 font-display text-4xl font-800 leading-tight sm:text-5xl">
          Choisis l'ampleur de <span className="text-holo">ta galaxie</span>
        </h2>
        <p className="mt-5 text-mist">
          Jusqu'à <span className="font-semibold text-nova">−59%</span> pour le lancement.
          Paiement à la livraison disponible, retour gratuit 30 jours.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {BUNDLES.map((b, i) => {
          const popular = b.id === "duo";
          const discount = Math.round((1 - b.price / b.compareAt) * 100);
          return (
            <Reveal key={b.id} delay={i * 0.12} className={popular ? "lg:-translate-y-4" : ""}>
              <div
                className={`relative flex h-full flex-col rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-1 ${
                  popular
                    ? "glass-strong ring-glow"
                    : "glass hover:border-white/25"
                }`}
              >
                {b.badge && (
                  <span
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${
                      popular
                        ? "bg-gradient-to-r from-neon to-nova text-white"
                        : "bg-white/10 text-mist"
                    }`}
                  >
                    {popular && <Flame className="mr-1 inline h-3.5 w-3.5" />}
                    {b.badge}
                  </span>
                )}

                <p className="text-xs uppercase tracking-[0.3em] text-faint">{b.label}</p>
                <h3 className="mt-2 font-display text-xl font-700">{b.headline}</h3>

                <div className="mt-5 flex items-end gap-3">
                  <span className={`font-display text-4xl font-800 ${popular ? "text-holo" : ""}`}>
                    {euro(b.price)}
                  </span>
                  <span className="pb-1 text-sm text-faint line-through">{euro(b.compareAt)}</span>
                  <span className="mb-1 rounded-full bg-nova/15 px-2.5 py-0.5 text-xs font-bold text-nova">
                    −{discount}%
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-faint">
                  {b.shipping === 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-comet">
                      <Truck className="h-3.5 w-3.5" /> Livraison offerte
                    </span>
                  ) : (
                    <>+ {euro(b.shipping)} livraison suivie</>
                  )}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {b.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm text-mist">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-comet" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/commande?pack=${b.id}`}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold transition-all ${
                    popular
                      ? "btn-primary text-white"
                      : "border border-white/15 text-ink hover:border-neon/50 hover:bg-neon/10"
                  }`}
                >
                  Commander ce pack
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-mist">
          <ShieldCheck className="h-4 w-4 text-comet" />
          Tu ne paies qu'à la réception de ton colis. Zéro risque, zéro prépaiement.
        </p>
      </Reveal>
    </section>
  );
}
