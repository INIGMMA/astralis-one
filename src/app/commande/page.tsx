import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import OrderForm from "@/components/OrderForm";
import Starfield from "@/components/Starfield";
import { getBundle, type BundleId } from "@/lib/config";
import { stripeEnabled } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Commander — ASTRALIS",
  description: "Finalise ta commande ASTRALIS ONE. Paiement à la livraison, retour 30 jours.",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ pack?: string }>;
}) {
  const { pack } = await searchParams;
  const bundle = getBundle(pack);

  return (
    <main className="relative min-h-svh overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(139,92,246,0.18),transparent_65%)]" />
        <Starfield className="absolute inset-0 h-full w-full" density={0.00007} />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Link href="/" aria-label="Retour à l'accueil">
          <Logo />
        </Link>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-mist">
          <ShieldCheck className="h-3.5 w-3.5 text-comet" />
          Commande sécurisée
        </span>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-6">
        <Link
          href="/#offres"
          className="inline-flex items-center gap-2 text-sm text-faint transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux offres
        </Link>
        <h1 className="mt-4 font-display text-3xl font-800 sm:text-4xl">
          Dernière étape avant <span className="text-holo">ta galaxie</span>
        </h1>
        <p className="mt-3 max-w-xl text-mist">
          Remplis tes informations : ta commande part sous 24-48 h et tu paies
          uniquement quand le colis est entre tes mains.
        </p>

        <div className="mt-10">
          <OrderForm initialPack={bundle.id as BundleId} stripeReady={stripeEnabled()} />
        </div>
      </div>
    </main>
  );
}
