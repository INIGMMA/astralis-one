import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { leads } from "@/db/schema";

const schema = z.object({
  email: z.string().trim().email().max(120),
  source: z.string().trim().max(40).default("footer"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "E-mail invalide" }, { status: 400 });
    }
    await db.insert(leads).values({
      email: parsed.data.email.toLowerCase(),
      source: parsed.data.source,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/leads", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
