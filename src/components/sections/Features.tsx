import {
  Sparkles,
  Music,
  Timer,
  Gamepad2,
  Moon,
  Leaf,
  Film,
  Baby,
  Brain,
} from "lucide-react";
import Reveal from "../Reveal";
import { STATS } from "@/lib/config";

const FEATURE_CARDS = [
  {
    icon: Sparkles,
    title: "21 scènes cosmiques",
    text: "Nébuleuse violette, aurore polaire, voie lactée, pluie d'étoiles… change d'univers en un clic.",
  },
  {
    icon: Music,
    title: "Enceinte Bluetooth 5.3",
    text: "Ta playlist se synchronise : la nébuleuse pulse au rythme de la musique.",
  },
  {
    icon: Timer,
    title: "Minuteur d'endormissement",
    text: "Extinction douce à 15, 30 ou 60 min. Endors-toi sous les étoiles, sans y penser.",
  },
  {
    icon: Gamepad2,
    title: "Mode gaming & cinéma",
    text: "Immersion totale pour tes sessions : l'ambiance suit l'action sur l'écran.",
  },
  {
    icon: Moon,
    title: "Silence absolu < 20 dB",
    text: "Plus silencieux qu'un murmure. Tu n'entendras que ta respiration se calmer.",
  },
  {
    icon: Leaf,
    title: "LED 5 W éco-conçue",
    text: "Moins de 1 € d'électricité par mois, même allumé tous les soirs.",
  },
];

const MOMENTS = [
  { icon: Brain, label: "Méditation" },
  { icon: Baby, label: "Chambre d'enfant" },
  { icon: Film, label: "Soirée cinéma" },
  { icon: Gamepad2, label: "Gaming" },
];

export default function Features() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Pensé pour t'hypnotiser</p>
        <h2 className="mt-5 font-display text-4xl font-800 leading-tight sm:text-5xl">
          Chaque détail sert <span className="text-holo">l'immersion</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_CARDS.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.1}>
            <div className="glass group relative h-full overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-neon/40">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon/15 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-neon/25" />
              <span className="relative grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-neon/25 to-comet/10 text-pulsar transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-display text-lg font-600">{f.title}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-mist">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* stats band */}
      <Reveal delay={0.15}>
        <div className="glass-strong mt-16 grid grid-cols-2 gap-y-8 rounded-[2rem] px-6 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-800 text-holo sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-faint">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs uppercase tracking-[0.28em] text-faint">Parfait pour :</span>
          {MOMENTS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-mist transition-colors hover:text-ink"
            >
              <Icon className="h-4 w-4 text-comet" />
              {label}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
