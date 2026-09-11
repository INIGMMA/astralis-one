import type Stripe from "stripe";

/** Stripe est activé dès qu'une clé secrète est présente côté serveur. */
export function stripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith("sk_"));
}

let cached: Stripe | null = null;

/** Instance Stripe paresseuse — jamais initialisée si la clé est absente. */
export async function getStripe(): Promise<Stripe> {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY manquante");
  const { default: StripeClient } = await import("stripe");
  cached = new StripeClient(key);
  return cached;
}

/** Remise immédiate pour paiement par carte (expédition prioritaire). */
export const CARD_DISCOUNT = 0.05;
