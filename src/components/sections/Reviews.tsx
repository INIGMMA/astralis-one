import { BadgeCheck, Star } from "lucide-react";
import Reveal from "../Reveal";
import { REVIEWS } from "@/lib/config";

export default function Reviews() {
  return (
    <section id="avis" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">2 314 avis vérifiés</p>
        <h2 className="mt-5 font-display text-4xl font-800 leading-tight sm:text-5xl">
          Ils dorment déjà <span className="text-holo">sous les étoiles</span>
        </h2>
        <div className="mt-6 inline-flex items-center gap-3">
          <span className="flex text-star">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </span>
          <span className="text-sm text-mist">
            <span className="font-semibold text-ink">4,8/5</span> — 96% recommandent
          </span>
        </div>
      </Reveal>

      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.1} className="break-inside-avoid">
            <figure className="glass rounded-[1.6rem] p-6 transition-all duration-500 hover:border-neon/35">
              <div className="flex items-center justify-between">
                <span className="flex text-star">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s < r.rating ? "fill-current" : "text-faint"}`}
                    />
                  ))}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-comet">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Achat vérifié
                </span>
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-ink/90">
                «&nbsp;{r.text}&nbsp;»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-neon/40 to-nova/25 font-display text-sm font-700 text-white">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {r.name} — {r.city}
                  </span>
                  <span className="block text-xs text-faint">{r.pack}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
