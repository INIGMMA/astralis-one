import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import {
  ArrowRight,
  CheckCircle2,
  HandCoins,
  MapPin,
  PackageSearch,
  Rocket,
  Truck,
} from "lucide-react";
import { db } from "@/db";
import { orders } from "@/db/schema";
import Logo from "@/components/Logo";
import Starfield from "@/components/Starfield";
import { getBundle } from "@/lib/config";
import { euro } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Commande confirmée — ASTRALIS",
};

export const dynamic = "force-dynamic";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const order = id
    ? (await db.select().from(orders).where(eq(orders.id, id)).limit(1))[0]
    : undefined;

  const bundle = order ? getBundle(order.bundleId) : null;

  return (
    <main className="relative min-h-svh overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(139,92,246,0.22),transparent_65%)]" />
        <Starfield className="absolute inset-0 h-full w-full" density={0.00008} />
      </div>

      <header className="relative z-10 mx-auto flex max-w-3xl justify-center px-5 py-8">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-24">
        <div className="glass-strong rounded-[2.25rem] p-8 text-center sm:p-12">
          <span className="mx-auto grid h-18 w-18 place-items-center rounded-full bg-gradient-to-br from-comet/30 to-neon/25 ring-glow">
            <CheckCircle2 className="h-9 w-9 text-comet" />
          </span>

          {order && bundle ? (
            <>
              <p className="eyebrow mt-7">Commande #{order.id.slice(0, 8).toUpperCase()}</p>
              <h1 className="mt-3 font-display text-3xl font-800 sm:text-4xl">
                Merci {order.firstName} — ta galaxie
                <span className="text-holo"> décolle bientôt.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-mist">
                Ta commande est enregistrée. Prépare-toi : notre équipe la confirme par
                téléphone sous 24 h, puis elle part en livraison suivie.
              </p>

              <div className="mx-auto mt-8 max-w-md space-y-3 rounded-3xl border border-white/10 bg-void/50 p-6 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-mist">Pack</span>
                  <span className="font-semibold">{bundle.headline} — {bundle.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mist">Livraison</span>
                  <span>{bundle.shipping === 0 ? "Offerte" : euro(bundle.shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="inline-flex items-center gap-2 text-mist">
                    <HandCoins className="h-4 w-4 text-pulsar" />
                    {order.paymentMethod === "carte" ? "Payé par carte (merci !)" : "À payer au livreur"}
                  </span>
                  <span className="font-display text-xl font-800 text-holo">
                    {euro(Number(order.total))}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-3">
                  <span className="inline-flex items-center gap-2 text-mist">
                    <MapPin className="h-4 w-4 text-pulsar" />
                    Livraison à
                  </span>
                  <span className="text-right">
                    {order.address}, {order.zip} {order.city}, {order.country}
                  </span>
                </div>
              </div>

              <div className="mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-3">
                {[
                  { icon: CheckCircle2, t: "Confirmation", d: "Appel ou SMS sous 24 h" },
                  { icon: Truck, t: "Expédition", d: "Sous 24-48 h, suivi par e-mail" },
                  { icon: PackageSearch, t: "Réception", d: "5-8 jours ouvrés" },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="glass rounded-2xl p-4">
                    <Icon className="h-5 w-5 text-comet" />
                    <p className="mt-2.5 text-sm font-semibold">{t}</p>
                    <p className="mt-1 text-xs text-faint">{d}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="mt-7 font-display text-3xl font-800 sm:text-4xl">
                Merci pour <span className="text-holo">ta commande.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-mist">
                Ta demande est bien reçue. Notre équipe te contacte très vite pour
                confirmer l'expédition.
              </p>
            </>
          )}

          <Link
            href="/"
            className="btn-primary mt-10 inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-white"
          >
            <Rocket className="h-4 w-4" />
            Retour à la boutique
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
