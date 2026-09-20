"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Mail, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  };

  return (
    <footer className="relative border-t border-white/8 bg-abyss/60">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              ASTRALIS conçoit des expériences lumineuses qui transforment les intérieurs
              en observatoires privés. Chaque appareil est testé 48 h avant expédition.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {[
                { icon: Truck, label: "Livraison suivie" },
                { icon: ShieldCheck, label: "Paiement à la livraison" },
                { icon: RotateCcw, label: "Retours 30 jours" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-mist"
                >
                  <Icon className="h-3.5 w-3.5 text-pulsar" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Le cercle Astralis</p>
            <h3 className="mt-3 font-display text-xl font-600 text-ink">
              -10% sur ta première galaxie
            </h3>
            <p className="mt-2 text-sm text-mist">
              Rejoins le cercle : reçois ton code promo et nos conseils ambiance.
            </p>
            {state === "done" ? (
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-comet">
                <CheckCircle2 className="h-4 w-4" />
                Bienvenue dans le cercle. Regarde ta boîte mail.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-5 flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    className="w-full rounded-full border border-white/12 bg-white/5 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-faint focus:border-neon/60 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-primary rounded-full px-6 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "OK"}
                </button>
              </form>
            )}
            {state === "error" && (
              <p className="mt-2 text-xs text-nova">Une erreur est survenue, réessaie.</p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-faint md:flex-row">
          <p>© {new Date().getFullYear()} ASTRALIS Studio — SIRET: 109 915 876 00014 — Tous droits réservés.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/#faq" className="transition-colors hover:text-mist">
              FAQ
            </Link>
            <Link href="/#avis" className="transition-colors hover:text-mist">
              Avis clients
            </Link>
            <Link href="/legal" className="transition-colors hover:text-mist">
              Mentions Légales & CGV
            </Link>
            <Link href="/admin" className="transition-colors hover:text-mist">
              Espace pilote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
