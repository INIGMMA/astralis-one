import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { orders, leads } from "@/db/schema";
import { seedIfEmpty } from "@/lib/seed";
import { BRAND, getBundle } from "@/lib/config";
import { dayKey } from "@/lib/utils";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { AdminOrder, DayPoint } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Espace pilote — ASTRALIS",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await seedIfEmpty();

  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
  const allLeads = await db.select({ id: leads.id }).from(leads);

  const todayKey = dayKey(new Date());
  const active = allOrders.filter((o) => o.status !== "annulé");

  // --- aujourd'hui ---
  const todays = active.filter((o) => dayKey(new Date(o.createdAt)) === todayKey);
  const revenueToday = todays.reduce((s, o) => s + Number(o.total), 0);
  const profitToday = todays.reduce((s, o) => s + Number(o.profit), 0);

  // --- globales ---
  const revenueAll = active.reduce((s, o) => s + Number(o.total), 0);
  const profitAll = active.reduce((s, o) => s + Number(o.profit), 0);
  const avgCart = active.length > 0 ? revenueAll / active.length : 0;

  // --- 14 derniers jours ---
  const days: DayPoint[] = [];
  const dayMap = new Map<string, { revenue: number; profit: number; orders: number }>();
  for (const o of active) {
    const k = dayKey(new Date(o.createdAt));
    const cur = dayMap.get(k) ?? { revenue: 0, profit: 0, orders: 0 };
    cur.revenue += Number(o.total);
    cur.profit += Number(o.profit);
    cur.orders += 1;
    dayMap.set(k, cur);
  }
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const k = dayKey(d);
    const cur = dayMap.get(k);
    days.push({
      key: k,
      label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      revenue: +(cur?.revenue ?? 0).toFixed(2),
      profit: +(cur?.profit ?? 0).toFixed(2),
      orders: cur?.orders ?? 0,
      isToday: k === todayKey,
    });
  }

  const recent: AdminOrder[] = allOrders.slice(0, 25).map((o) => ({
    id: o.id,
    createdAt: o.createdAt.toISOString(),
    firstName: o.firstName,
    lastName: o.lastName,
    city: o.city,
    country: o.country,
    pack: getBundle(o.bundleId).label,
    qty: o.qty,
    total: Number(o.total),
    profit: Number(o.profit),
    status: o.status,
    paymentMethod: o.paymentMethod,
    paid: o.paid,
  }));

  // répartition des packs
  const packMix = ["solo", "duo", "trio"].map((id) => {
    const b = getBundle(id);
    const count = active.filter((o) => o.bundleId === id).length;
    return { id, label: b.label, count, share: active.length ? Math.round((count / active.length) * 100) : 0 };
  });

  return (
    <AdminDashboard
      goal={BRAND.goalPerDay}
      stats={{
        revenueToday,
        profitToday,
        ordersToday: todays.length,
        revenueAll,
        profitAll,
        ordersAll: active.length,
        cancelled: allOrders.length - active.length,
        avgCart,
        leads: allLeads.length,
        unitsToday: todays.reduce((s, o) => s + o.qty, 0),
      }}
      days={days}
      orders={recent}
      packMix={packMix}
    />
  );
}
