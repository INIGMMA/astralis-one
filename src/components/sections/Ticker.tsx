import { Sparkles } from "lucide-react";

const ITEMS = [
  "Livraison suivie offerte dès 2 unités",
  "Paiement à la livraison disponible",
  "30 jours satisfait ou remboursé",
  "Expédition sous 24-48 h",
  "12 480 galaxies livrées",
  "Offre de lancement −44%",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/8 bg-gradient-to-r from-neon/12 via-nova/8 to-comet/10 py-3.5 backdrop-blur">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-[13px] font-medium tracking-wide text-mist">
            <Sparkles className="h-3.5 w-3.5 text-pulsar" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
