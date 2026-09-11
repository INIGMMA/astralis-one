import Image from "next/image";
import Reveal from "../Reveal";

const SHOTS = [
  {
    src: "/img/macro.jpg",
    alt: "Gros plan sur la lentille du projecteur Astralis reflétant une nébuleuse",
    kicker: "Optique cristal",
    title: "Une lentille pensée comme un objectif photo",
    text: "Dôme en verre optique traité anti-reflet : des couleurs profondes, des étoiles nettes jusqu'aux coins du plafond.",
    wide: false,
  },
  {
    src: "/img/relax.jpg",
    alt: "Femme méditant dans une pièce baignée d'une projection galaxie",
    kicker: "Rituel du soir",
    title: "Le rituel qui fait décrocher ton cerveau",
    text: "Respiration guidée, yin yoga, lecture : la lumière lente et les tons froids préparent naturellement au sommeil.",
    wide: true,
  },
  {
    src: "/img/pack.jpg",
    alt: "Coffret cadeau premium Astralis noir avec finition holographique",
    kicker: "Prêt à offrir",
    title: "Un coffret qui fait son effet avant même d'être ouvert",
    text: "Boîte noire mate, finitions holographiques, câble tressé inclus. Le cadeau parfait, sans papier cadeau nécessaire.",
    wide: false,
  },
];

export default function Showcase() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Objet de désir</p>
        <h2 className="mt-5 font-display text-4xl font-800 leading-tight sm:text-5xl">
          Beau éteint. <span className="text-holo">Irréel allumé.</span>
        </h2>
      </Reveal>

      <div className="mt-14 space-y-6">
        {SHOTS.map((shot, i) => (
          <Reveal key={shot.src} delay={0.05}>
            <article
              className={`group grid overflow-hidden rounded-[2.25rem] border border-white/10 bg-panel/60 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-72 overflow-hidden sm:h-96 lg:h-auto">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel/70 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="relative flex flex-col justify-center gap-4 p-8 sm:p-12">
                <span className="eyebrow">{shot.kicker}</span>
                <h3 className="font-display text-2xl font-700 leading-snug sm:text-3xl">
                  {shot.title}
                </h3>
                <p className="max-w-md leading-relaxed text-mist">{shot.text}</p>
                <span className="mt-2 h-px w-24 bg-gradient-to-r from-neon to-transparent transition-all duration-700 group-hover:w-40" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
