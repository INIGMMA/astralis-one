"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgePercent,
  Check,
  ChevronDown,
  CreditCard,
  HandCoins,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  Truck,
  User,
  Zap,
} from "lucide-react";
import { BUNDLES, getBundle, type BundleId } from "@/lib/config";
import { cn, euro } from "@/lib/utils";

const inputCls =
  "w-full rounded-2xl border border-white/12 bg-white/4 px-4 py-3.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-neon/60 focus:bg-white/6 focus:outline-none";

const CARD_DISCOUNT = 0.05;

export default function OrderForm({
  initialPack,
  stripeReady = false,
}: {
  initialPack: BundleId;
  stripeReady?: boolean;
}) {
  const router = useRouter();
  const [pack, setPack] = useState<BundleId>(initialPack);
  const [method, setMethod] = useState<"cod" | "carte">("cod");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const bundle = getBundle(pack);
  const baseTotal = bundle.price + bundle.shipping;
  const total = method === "carte" ? baseTotal * (1 - CARD_DISCOUNT) : baseTotal;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      address: String(fd.get("address") ?? ""),
      zip: String(fd.get("zip") ?? ""),
      city: String(fd.get("city") ?? ""),
      country: String(fd.get("country") ?? "France"),
      bundleId: pack,
      note: String(fd.get("note") ?? "") || null,
    };
    try {
      if (method === "carte") {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !json.url) {
          setError(json.error ?? "Paiement indisponible, essaie le paiement à la livraison.");
          setLoading(false);
          return;
        }
        window.location.href = json.url;
        return;
      }
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !json.id) {
        setError(json.error ?? "Une erreur est survenue. Réessaie.");
        setLoading(false);
        return;
      }
      router.push(`/confirmation?id=${json.id}`);
    } catch {
      setError("Connexion impossible. Vérifie ton réseau et réessaie.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      {/* left column */}
      <div className="space-y-8">
        {/* pack selector */}
        <section className="glass rounded-[1.75rem] p-6 sm:p-8">
          <h2 className="flex items-center gap-3 font-display text-lg font-700">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-neon/25 text-sm text-pulsar">1</span>
            Choisis ton pack
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {BUNDLES.map((b) => {
              const active = b.id === pack;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setPack(b.id)}
                  className={cn(
                    "relative rounded-2xl border p-4 text-left transition-all duration-300",
                    active
                      ? "border-neon/70 bg-neon/12 ring-glow"
                      : "border-white/10 bg-white/3 hover:border-white/25"
                  )}
                >
                  {b.badge && (
                    <span className="absolute -top-2.5 left-3 rounded-full bg-gradient-to-r from-neon to-nova px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {b.badge}
                    </span>
                  )}
                  <span className="block font-display text-2xl font-800">×{b.qty}</span>
                  <span className="mt-1 block text-xs text-mist">{b.label}</span>
                  <span className="mt-2 block text-sm font-semibold text-ink">{euro(b.price)}</span>
                  <span className="block text-[11px] text-faint line-through">
                    {euro(b.compareAt)}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="pack-check"
                      className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-neon text-white"
                    >
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* contact */}
        <section className="glass rounded-[1.75rem] p-6 sm:p-8">
          <h2 className="flex items-center gap-3 font-display text-lg font-700">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-neon/25 text-sm text-pulsar">2</span>
            Tes coordonnées
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input name="firstName" required minLength={2} placeholder="Prénom" className={cn(inputCls, "pl-11")} />
            </div>
            <input name="lastName" required minLength={2} placeholder="Nom" className={inputCls} />
            <input name="email" type="email" required placeholder="E-mail (pour le suivi)" className={cn(inputCls, "sm:col-span-2")} />
            <input
              name="phone"
              type="tel"
              required
              placeholder="Téléphone (pour le livreur)"
              className={cn(inputCls, "sm:col-span-2")}
            />
          </div>
        </section>

        {/* address */}
        <section className="glass rounded-[1.75rem] p-6 sm:p-8">
          <h2 className="flex items-center gap-3 font-display text-lg font-700">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-neon/25 text-sm text-pulsar">3</span>
            Adresse de livraison
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="relative sm:col-span-2">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input name="address" required minLength={5} placeholder="Numéro et rue" className={cn(inputCls, "pl-11")} />
            </div>
            <input name="zip" required placeholder="Code postal" className={inputCls} />
            <input name="city" required minLength={2} placeholder="Ville" className={inputCls} />
            <div className="relative sm:col-span-2">
              <select name="country" className={cn(inputCls, "appearance-none pr-10")} defaultValue="France">
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Luxembourg</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            </div>
            <textarea
              name="note"
              rows={2}
              placeholder="Instructions pour le livreur (digicode, étage…) — facultatif"
              className={cn(inputCls, "resize-none sm:col-span-2")}
            />
          </div>
        </section>

        {/* payment method */}
        <section className="glass rounded-[1.75rem] p-6 sm:p-8">
          <h2 className="flex items-center gap-3 font-display text-lg font-700">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-neon/25 text-sm text-pulsar">4</span>
            Mode de paiement
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={cn(
                "relative rounded-2xl border p-5 text-left transition-all duration-300",
                method === "cod"
                  ? "border-neon/70 bg-neon/12 ring-glow"
                  : "border-white/10 bg-white/3 hover:border-white/25"
              )}
            >
              <HandCoins className="h-6 w-6 text-pulsar" />
              <p className="mt-3 text-sm font-semibold">Paiement à la livraison</p>
              <p className="mt-1 text-xs leading-relaxed text-mist">
                Tu paies en espèces ou par carte directement au livreur. Zéro prépaiement, zéro risque.
              </p>
              {method === "cod" && (
                <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-neon text-white">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => stripeReady && setMethod("carte")}
              disabled={!stripeReady}
              className={cn(
                "relative rounded-2xl border p-5 text-left transition-all duration-300",
                method === "carte"
                  ? "border-comet/70 bg-comet/10 ring-glow"
                  : "border-white/10 bg-white/3",
                stripeReady ? "hover:border-white/25" : "cursor-not-allowed opacity-60"
              )}
            >
              <CreditCard className="h-6 w-6 text-comet" />
              <p className="mt-3 text-sm font-semibold">
                Carte bancaire{" "}
                <span className="rounded-full bg-comet/15 px-2 py-0.5 text-[10px] font-bold text-comet">
                  −5% immédiat
                </span>
              </p>
              <p className="mt-1 text-xs leading-relaxed text-mist">
                {stripeReady
                  ? "Paiement sécurisé Stripe. Ta commande part en priorité 24 h."
                  : "Bientôt disponible — activation en cours. Choisis la livraison en attendant."}
              </p>
              {method === "carte" && (
                <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-comet text-void">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>
          </div>
        </section>
      </div>

      {/* right column — summary */}
      <aside className="lg:sticky lg:top-28 h-fit space-y-6">
        <div className="glass-strong rounded-[1.75rem] p-6 sm:p-7">
          <div className="flex gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10">
              <Image src="/img/hero.png" alt="ASTRALIS ONE" fill sizes="80px" className="object-cover" />
              <span className="absolute bottom-1 right-1 rounded-full bg-void/80 px-1.5 py-0.5 text-[10px] font-bold">
                ×{bundle.qty}
              </span>
            </div>
            <div>
              <p className="font-display text-sm font-700">ASTRALIS ONE</p>
              <p className="mt-1 text-xs text-mist">Pack {bundle.label}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-nova">
                <BadgePercent className="h-3.5 w-3.5" />
                Lancement −{Math.round((1 - bundle.price / bundle.compareAt) * 100)}%
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between text-mist">
              <span>Sous-total</span>
              <span className="text-ink">{euro(bundle.price)}</span>
            </div>
            <div className="flex justify-between text-mist">
              <span>Livraison suivie</span>
              <span className={bundle.shipping === 0 ? "text-comet" : "text-ink"}>
                {bundle.shipping === 0 ? "Offerte" : euro(bundle.shipping)}
              </span>
            </div>
            {method === "carte" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between text-mist"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-comet" />
                  Remise paiement immédiat
                </span>
                <span className="text-comet">−{euro(baseTotal * CARD_DISCOUNT)}</span>
              </motion.div>
            )}
            <div className="flex items-end justify-between border-t border-white/10 pt-4">
              <span className="text-mist">
                {method === "carte" ? "Total à payer maintenant" : "Total à la livraison"}
              </span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={total.toFixed(2)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-display text-3xl font-800 text-holo"
                >
                  {euro(total)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 flex w-full items-center justify-center gap-3 rounded-full py-4.5 text-base font-semibold text-white disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {method === "carte" ? "Redirection sécurisée…" : "Confirmation en cours…"}
              </>
            ) : method === "carte" ? (
              <>
                <CreditCard className="h-5 w-5" />
                Payer {euro(total)} — je pars en priorité
              </>
            ) : (
              <>
                <HandCoins className="h-5 w-5" />
                Confirmer — je paie à la livraison
              </>
            )}
          </button>

          {error && (
            <p className="mt-3 rounded-xl border border-nova/40 bg-nova/10 px-4 py-2.5 text-center text-xs text-nova">
              {error}
            </p>
          )}

          <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-faint">
            <Lock className="h-3 w-3" />
            {method === "carte"
              ? "Transaction chiffrée via Stripe. Aucune donnée carte stockée."
              : "Aucun paiement en ligne — tu règles le livreur à réception."}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Truck, label: "Expédié sous 24-48 h" },
            { icon: ShieldCheck, label: "30 jours pour changer d'avis" },
            { icon: HandCoins, label: "COD ou carte sécurisée" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="glass rounded-2xl p-3.5 text-center">
              <Icon className="mx-auto h-4.5 w-4.5 text-pulsar" />
              <p className="mt-2 text-[10.5px] leading-tight text-mist">{label}</p>
            </div>
          ))}
        </div>
      </aside>
    </form>
  );
}
