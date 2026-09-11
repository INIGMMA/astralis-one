"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeEuro,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  Inbox,
  Megaphone,
  Package,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Users,
  Video,
} from "lucide-react";
import { SUPPLIER_INFO, LAUNCH_CHECKLIST } from "@/lib/supplier";
import Logo from "@/components/Logo";
import { cn, euro, formatDateTime } from "@/lib/utils";

export interface AdminOrder {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  pack: string;
  qty: number;
  total: number;
  profit: number;
  status: string;
  paymentMethod: string;
  paid: boolean;
}

export interface DayPoint {
  key: string;
  label: string;
  revenue: number;
  profit: number;
  orders: number;
  isToday: boolean;
}

interface Stats {
  revenueToday: number;
  profitToday: number;
  ordersToday: number;
  revenueAll: number;
  profitAll: number;
  ordersAll: number;
  cancelled: number;
  avgCart: number;
  leads: number;
  unitsToday: number;
}

const STATUSES = ["nouveau", "confirmé", "expédié", "livré", "annulé"] as const;

const STATUS_STYLE: Record<string, string> = {
  nouveau: "bg-nova/15 text-nova border-nova/30",
  confirmé: "bg-comet/12 text-comet border-comet/30",
  expédié: "bg-indigo-400/12 text-indigo-300 border-indigo-400/30",
  livré: "bg-emerald-400/12 text-emerald-300 border-emerald-400/30",
  annulé: "bg-white/8 text-faint border-white/15 line-through",
};

const PLAYBOOK = [
  {
    icon: Video,
    title: "Contenu organique TikTok / Reels",
    text: "2 vidéos par jour : plafond sombre → allumage en une prise. Hashtags #roommakeover #galaxie. Coût : 0 €.",
  },
  {
    icon: Megaphone,
    title: "Spark Ads sur la meilleure vidéo",
    text: "10 €/jour dès qu'une vidéo dépasse 10k vues organiques. CPA cible : < 8 €.",
  },
  {
    icon: ShoppingCart,
    title: "Pousser le pack Duo (AOV 84,90 €)",
    text: "Pré-sélection du pack Duo sur la page + badge « le plus choisi » : panier moyen visé > 72 €.",
  },
  {
    icon: Users,
    title: "E-mails paniers abandonnés",
    text: "Relance J+1 avec code -5% et J+3 dernier rappel. Récupère 8-12% des hésitants.",
  },
];

const BATTLE_PLAN = [
  {
    time: "H+0",
    action: "Compte TikTok + Instagram « astralis.room »",
    detail: "Photo de profil = nébuleuse. Bio : « Ta chambre mérite mieux qu'un plafond blanc », lien boutique en bio.",
  },
  {
    time: "H+1",
    action: "Tourne 3 vidéos avec ton téléphone",
    detail: "Script 1 : chambre allumée 2 s puis noir total, allumage du projecteur, réaction. Script 2 : « POV : tu rentres après une journée horrible ». Script 3 : avant/après accéléré.",
  },
  {
    time: "H+3",
    action: "Poste entre 18 h et 21 h",
    detail: "1 vidéo / plateforme / jour minimum. Hashtags : #roommakeover #galaxie #chambre #asthetique #sommeil — description avec question (« tu choisirais quelle couleur ? »).",
  },
  {
    time: "H+6",
    action: "Réponds à CHAQUE commentaire en moins d'une heure",
    detail: "L'algorithme adore ça. Chaque « c'est où ? » = réponse publique + DM avec le lien.",
  },
  {
    time: "H+12",
    action: "10 DM ciblés, zéro spam",
    detail: "Comptes déco/chambre étudiante qui postent leur room : « Ta room est dingue, tu veux tester notre projecteur avec -10% ? Code LANCEMENT10 ».",
  },
  {
    time: "H+24",
    action: "Active Stripe et double la vidéo qui a marché",
    detail: "Crée ton compte Stripe (SIRET auto-entrepreneur), colle la clé dans les variables d'environnement — le paiement par carte s'active tout seul. Reposte la meilleure accroche.",
  },
];

function GoalRing({ profit, goal }: { profit: number; goal: number }) {
  const pct = Math.min(profit / goal, 1.5);
  const clamped = Math.min(pct, 1);
  const R = 84;
  const C = 2 * Math.PI * R;
  const reached = profit >= goal;
  return (
    <div className="relative mx-auto h-56 w-56">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="goalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={reached ? "#34d399" : "#8b5cf6"} />
            <stop offset="100%" stopColor={reached ? "#67e8f9" : "#e879f9"} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" />
        <motion.circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="url(#goalGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - clamped) }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] uppercase tracking-[0.24em] text-faint">Profit du jour</span>
        <span className={cn("font-display mt-1 text-4xl font-800", reached ? "text-comet" : "text-holo")}>
          {euro(profit)}
        </span>
        <span className="mt-1 text-xs text-faint">objectif {euro(goal)}</span>
      </div>
    </div>
  );
}

export default function AdminDashboard({
  goal,
  stats,
  days,
  orders: initialOrders,
  packMix,
}: {
  goal: number;
  stats: Stats;
  days: DayPoint[];
  orders: AdminOrder[];
  packMix: Array<{ id: string; label: string; count: number; share: number }>;
}) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const maxRevenue = Math.max(...days.map((d) => d.revenue), 1);
  const reached = stats.profitToday >= goal;

  const changeStatus = async (id: string, status: string) => {
    setPendingId(id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      startTransition(() => router.refresh());
    } finally {
      setPendingId(null);
    }
  };

  return (
    <main className="relative min-h-svh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-10%,rgba(139,92,246,0.16),transparent_65%)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="glass hidden items-center gap-2 rounded-full px-4 py-2 text-xs text-mist sm:inline-flex">
            <CircleDot className="h-3 w-3 text-emerald-400" />
            Boutique en ligne
          </span>
          <Link
            href="/"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-mist transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voir la boutique
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Espace pilote</p>
            <h1 className="mt-2 font-display text-3xl font-800 sm:text-4xl">
              Cap sur <span className="text-holo">50 € / jour</span>
            </h1>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-mist">
            <Inbox className="h-4 w-4 text-pulsar" />
            {stats.leads} e-mails captés dans le cercle
          </p>
        </div>

        {/* KPI cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              icon: BadgeEuro,
              label: "CA aujourd'hui",
              value: euro(stats.revenueToday),
              sub: `${stats.ordersToday} commande${stats.ordersToday > 1 ? "s" : ""} · ${stats.unitsToday} unité${stats.unitsToday > 1 ? "s" : ""}`,
            },
            {
              icon: TrendingUp,
              label: "Profit aujourd'hui",
              value: euro(stats.profitToday),
              sub: reached ? "Objectif atteint" : `Encore ${euro(Math.max(0, goal - stats.profitToday))}`,
              accent: reached,
            },
            {
              icon: Package,
              label: "Commandes totales",
              value: String(stats.ordersAll),
              sub: `${stats.cancelled} annulée${stats.cancelled > 1 ? "s" : ""}`,
            },
            {
              icon: ShoppingCart,
              label: "Panier moyen",
              value: euro(stats.avgCart),
              sub: "mix des 3 packs",
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "glass rounded-3xl p-5",
                card.accent && "border-emerald-400/40"
              )}
            >
              <span className="inline-flex items-center gap-2 text-xs text-faint">
                <card.icon className={cn("h-4 w-4", card.accent ? "text-emerald-300" : "text-pulsar")} />
                {card.label}
              </span>
              <p className={cn("mt-2.5 font-display text-2xl font-800", card.accent && "text-comet")}>
                {card.value}
              </p>
              <p className="mt-1 text-xs text-faint">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* gauge + chart */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong flex flex-col items-center justify-center rounded-[2rem] p-8"
          >
            <div className="flex w-full items-center justify-between">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
                <Target className="h-4 w-4 text-pulsar" />
                Jauge quotidienne
              </h2>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-semibold",
                  reached
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "border-neon/40 bg-neon/10 text-pulsar"
                )}
              >
                {reached ? "Objectif atteint" : `${Math.round(Math.min((stats.profitToday / goal) * 100, 150))}%`}
              </span>
            </div>
            <div className="mt-6">
              <GoalRing profit={stats.profitToday} goal={goal} />
            </div>
            <p className="mt-5 max-w-xs text-center text-xs leading-relaxed text-faint">
              Profit = ventes − coût produit/livraison fournisseur ({euro(17.9)}/unité), hors budget
              publicitaire du jour.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-[2rem] p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
                <TrendingUp className="h-4 w-4 text-pulsar" />
                14 derniers jours — profit quotidien
              </h2>
              <span className="text-xs text-faint">cumul {euro(stats.profitAll)}</span>
            </div>

            <div className="mt-8 flex h-44 items-end gap-2">
              {days.map((d, i) => {
                const h = Math.max((d.profit / (goal * 1.6)) * 100, 2);
                return (
                  <div key={d.key} className="group relative flex h-full flex-1 flex-col items-center justify-end">
                    <div className="pointer-events-none absolute -top-2 z-10 -translate-y-full whitespace-nowrap rounded-lg border border-white/10 bg-void/95 px-2.5 py-1.5 text-[10px] opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                      <span className="block font-semibold text-ink">{euro(d.profit)} profit</span>
                      <span className="text-faint">{d.revenue ? `${euro(d.revenue)} CA · ` : ""}{d.orders} cmd</span>
                    </div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.min(h, 100)}%` }}
                      transition={{ delay: 0.4 + i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "w-full rounded-t-lg",
                        d.profit >= goal
                          ? "bg-gradient-to-t from-emerald-500/60 to-comet"
                          : "bg-gradient-to-t from-neon/50 to-nova",
                        d.isToday && "ring-1 ring-white/40"
                      )}
                      style={{ maxHeight: `${Math.min(h, 100)}%` }}
                    />
                    <span className={cn("mt-2 text-[9px]", d.isToday ? "font-bold text-ink" : "text-faint")}>
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-5 text-[11px] text-faint">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-neon/50 to-nova" />
                Sous l'objectif
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-emerald-500/60 to-comet" />
                ≥ {euro(goal)}
              </span>
              <span className="ml-auto hidden sm:block">CA max/j : {euro(maxRevenue)}</span>
            </div>
          </motion.section>
        </div>

        {/* playbook + pack mix */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-[2rem] p-8"
          >
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-pulsar" />
              Playbook — tenir les 50 € / jour
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {PLAYBOOK.map((step) => (
                <div key={step.title} className="rounded-2xl border border-white/8 bg-void/40 p-5">
                  <step.icon className="h-5 w-5 text-comet" />
                  <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist">{step.text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-[2rem] p-8"
          >
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
              <Package className="h-4 w-4 text-pulsar" />
              Mix des packs vendus
            </h2>
            <div className="mt-6 space-y-5">
              {packMix.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between text-sm">
                    <span className="text-mist">
                      Pack {p.label} <span className="text-faint">({p.count})</span>
                    </span>
                    <span className="font-semibold">{p.share}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.share}%` }}
                      transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-neon to-comet"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-white/8 bg-void/40 p-4 text-xs leading-relaxed text-mist">
              <CheckCircle2 className="mr-1.5 inline h-3.5 w-3.5 text-emerald-300" />
              Le pack Duo concentre l'essentiel des ventes : chaque commande Duo dégage{" "}
              <span className="font-semibold text-ink">{euro(84.9 - 17.9 * 2)}</span> de marge — soit
              quasiment l'objectif journalier en une seule vente.
            </p>
          </motion.section>
        </div>

        {/* supplier & checklist section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong mt-6 overflow-hidden rounded-[2rem] p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Logistique & Démarrage</p>
              <h2 className="mt-1 font-display text-2xl font-800">
                Fiche Fournisseur & Checklist de Lancement
              </h2>
            </div>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
              Prêt pour 50 € / jour
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            {/* Supplier card */}
            <div className="rounded-2xl border border-white/10 bg-void/50 p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-pulsar">
                  <Truck className="h-4 w-4" />
                  Fournisseur Dropshipping
                </span>
                <span className="text-xs font-bold text-comet">{SUPPLIER_INFO.sku}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-700 text-ink">
                {SUPPLIER_INFO.name}
              </h3>
              <p className="mt-1 text-xs text-mist">
                Plateforme : <strong>{SUPPLIER_INFO.source}</strong>
              </p>

              <div className="mt-4 space-y-2 border-y border-white/8 py-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-faint">Coût d'achat livré client :</span>
                  <span className="font-bold text-emerald-400">{euro(SUPPLIER_INFO.costEur)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-faint">Délai moyen d'expédition :</span>
                  <span className="text-ink">{SUPPLIER_INFO.deliveryTimeDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-faint">Transporteur principal :</span>
                  <span className="text-ink">{SUPPLIER_INFO.shippingCarrier}</span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[11px] uppercase tracking-wider text-faint mb-2">Spécifications produit :</p>
                <ul className="space-y-1 text-xs text-mist">
                  {SUPPLIER_INFO.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-comet shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={SUPPLIER_INFO.url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white"
              >
                Accéder au sourcing CJ Dropshipping
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              {LAUNCH_CHECKLIST.map((group) => (
                <div key={group.category} className="rounded-2xl border border-white/8 bg-void/30 p-4">
                  <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-2">
                    {group.category}
                  </p>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-3 text-xs"
                      >
                        <span className="inline-flex items-center gap-2 text-mist">
                          <span
                            className={cn(
                              "h-4 w-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold",
                              item.done
                                ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/40"
                                : "bg-white/5 text-faint border border-white/10"
                            )}
                          >
                            {item.done ? "✓" : "○"}
                          </span>
                          <span className={item.done ? "text-ink font-medium" : "text-mist"}>
                            {item.label}
                          </span>
                        </span>
                        <span className="text-[11px] text-faint italic shrink-0">
                          {item.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* battle plan */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong mt-6 overflow-hidden rounded-[2rem] p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
              <Target className="h-4 w-4 text-nova" />
              Plan de bataille — les prochaines 24 h
            </h2>
            <span className="rounded-full border border-nova/40 bg-nova/10 px-3 py-1 text-[11px] font-semibold text-nova">
              0 € de budget requis
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BATTLE_PLAN.map((step) => (
              <div key={step.time} className="rounded-2xl border border-white/8 bg-void/40 p-5">
                <span className="rounded-full bg-neon/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pulsar">
                  {step.time}
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug">{step.action}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-mist">{step.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-2xl border border-comet/25 bg-comet/8 p-4 text-xs leading-relaxed text-mist">
            <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-comet" />
            Règle d'or : <span className="font-semibold text-ink">la vidéo vend, pas la boutique.</span>{" "}
            Une seule vidéo à 100 000 vues ≈ 300-800 visites ≈ 6-24 commandes ≈ jusqu'à 1 000 € de profit.
            Ta seule mission aujourd'hui : filmer, poster, répondre.
          </p>
        </motion.section>

        {/* orders table */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong mt-6 overflow-hidden rounded-[2rem]"
        >
          <div className="flex items-center justify-between p-8 pb-5">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
              <Package className="h-4 w-4 text-pulsar" />
              Dernières commandes
            </h2>
            <span className="text-xs text-faint">{orders.length} affichées</span>
          </div>

          <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-175 text-left text-sm">
              <thead>
                <tr className="border-y border-white/8 text-[11px] uppercase tracking-[0.16em] text-faint">
                  <th className="px-8 py-3.5 font-medium">Date</th>
                  <th className="px-4 py-3.5 font-medium">Client</th>
                  <th className="px-4 py-3.5 font-medium">Pack</th>
                  <th className="px-4 py-3.5 font-medium text-right">Total</th>
                  <th className="px-4 py-3.5 font-medium text-right">Profit</th>
                  <th className="px-8 py-3.5 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 transition-colors hover:bg-white/3">
                    <td className="px-8 py-4 text-xs text-faint">{formatDateTime(o.createdAt)}</td>
                    <td className="px-4 py-4">
                      <span className="block font-medium">
                        {o.firstName} {o.lastName}
                      </span>
                      <span className="text-xs text-faint">
                        {o.city}, {o.country}
                      </span>
                      <span
                        className={cn(
                          "mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                          o.paymentMethod === "carte"
                            ? o.paid
                              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                              : "border-star/40 bg-star/10 text-star"
                            : "border-neon/35 bg-neon/10 text-pulsar"
                        )}
                      >
                        {o.paymentMethod === "carte"
                          ? o.paid
                            ? "Carte · encaissé"
                            : "Carte · en attente"
                          : "COD · à encaisser"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-mist">
                      {o.pack} <span className="text-xs text-faint">×{o.qty}</span>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">{euro(o.total)}</td>
                    <td className="px-4 py-4 text-right font-medium text-comet">
                      +{euro(o.profit)}
                    </td>
                    <td className="px-8 py-4">
                      <div className="relative inline-block">
                        <select
                          value={o.status}
                          disabled={pendingId === o.id}
                          onChange={(e) => changeStatus(o.id, e.target.value)}
                          className={cn(
                            "cursor-pointer appearance-none rounded-full border py-1.5 pl-3.5 pr-8 text-xs font-semibold outline-none transition-all disabled:opacity-50",
                            STATUS_STYLE[o.status] ?? STATUS_STYLE.nouveau,
                            "bg-void"
                          )}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-abyss text-ink">
                              {s}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] opacity-60">
                          ▼
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <p className="px-8 py-10 text-center text-sm text-faint">
                Aucune commande pour le moment. La première arrive bientôt.
              </p>
            )}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
