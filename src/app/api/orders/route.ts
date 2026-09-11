import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { getBundle, UNIT_COST } from "@/lib/config";

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

    const total = +(bundle.price + bundle.shipping).toFixed(2);
    const profit = +(bundle.price - UNIT_COST * bundle.qty).toFixed(2);

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
        status: "nouveau",
        note: data.note ?? null,
      })
      .returning({ id: orders.id });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/orders", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
