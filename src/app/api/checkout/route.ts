import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { getBundle, UNIT_COST } from "@/lib/config";
import { CARD_DISCOUNT, getStripe, stripeEnabled } from "@/lib/payments";

const schema = z.object({
  firstName: z.string().trim().min(2, "Prénom trop court").max(60),
  lastName: z.string().trim().min(2, "Nom trop court").max(60),
  email: z.string().trim().email("E-mail invalide").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9 ().-]{8,20}$/, "Téléphone invalide"),
  address: z.string().trim().min(5, "Adresse incomplète").max(160),
  zip: z.string().trim().regex(/^[0-9A-Za-z -]{3,10}$/, "Code postal invalide"),
  city: z.string().trim().min(2).max(80),
  country: z.enum(["France", "Belgique", "Suisse", "Luxembourg"]),
  bundleId: z.enum(["solo", "duo", "trio"]),
  note: z.string().trim().max(500).optional().nullable(),
});

export async function POST(req: Request) {
  try {
    if (!stripeEnabled()) {
      return NextResponse.json(
        { error: "Le paiement par carte arrive très bientôt — choisis le paiement à la livraison." },
        { status: 400 }
      );
    }

    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Données invalides" },
        { status: 400 }
      );
    }
    const data = parsed.data;
    const bundle = getBundle(data.bundleId);

    const baseTotal = bundle.price + bundle.shipping;
    const total = +(baseTotal * (1 - CARD_DISCOUNT)).toFixed(2);
    const profit = +(total - baseTotal + (bundle.price - UNIT_COST * bundle.qty)).toFixed(2);

    const [created] = await db
      .insert(orders)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        zip: data.zip,
        city: data.city,
        country: data.country,
        bundleId: bundle.id,
        qty: bundle.qty,
        unitCost: UNIT_COST.toFixed(2),
        total: total.toFixed(2),
        profit: profit.toFixed(2),
        status: "en attente",
        paymentMethod: "carte",
        paid: false,
        note: data.note ?? null,
      })
      .returning({ id: orders.id });

    const h = await headers();
    const origin = h.get("origin") ?? "http://localhost:3000";

    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(total * 100),
            product_data: {
              name: `ASTRALIS ONE — Pack ${bundle.label} (×${bundle.qty})`,
              description:
                "Expédition prioritaire 24 h — offre -5% pour paiement immédiat",
            },
          },
        },
      ],
      metadata: { orderId: created.id },
      success_url: `${origin}/confirmation?id=${created.id}&paiement=ok`,
      cancel_url: `${origin}/commande?pack=${bundle.id}`,
    });

    return NextResponse.json({ url: session.url, id: created.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/checkout", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
