export const BRAND = {
  name: "ASTRALIS",
  product: "ASTRALIS ONE",
  tagline: "Ta chambre. Ton univers.",
  goalPerDay: 50,
  guaranteeDays: 30,
};

/** Coût fournisseur unitaire (produit + livraison fournisseur) */
export const UNIT_COST = 17.9;
export const SHIPPING_SOLO = 4.9;

export type BundleId = "solo" | "duo" | "trio";

export interface Bundle {
  id: BundleId;
  qty: number;
  label: string;
  headline: string;
  price: number;
  compareAt: number;
  shipping: number;
  badge?: string;
  perks: string[];
}

export const BUNDLES: Bundle[] = [
  {
    id: "solo",
    qty: 1,
    label: "Découverte",
    headline: "1× ASTRALIS ONE",
    price: 49.9,
    compareAt: 89.9,
    shipping: SHIPPING_SOLO,
    perks: ["21 scènes cosmiques", "Enceinte Bluetooth intégrée", "Télécommande + minuteur"],
  },
  {
    id: "duo",
    qty: 2,
    label: "Immersion totale",
    headline: "2× ASTRALIS ONE",
    price: 84.9,
    compareAt: 179.8,
    shipping: 0,
    badge: "Le plus choisi",
    perks: [
      "2 pièces transformées",
      "Livraison offerte",
      "Câbles tressés premium ×2",
      "Idéal cadeau + soi-même",
    ],
  },
  {
    id: "trio",
    qty: 3,
    label: "Constellation",
    headline: "3× ASTRALIS ONE",
    price: 109.9,
    compareAt: 269.7,
    shipping: 0,
    badge: "Meilleure valeur",
    perks: ["Toute la maison en galaxie", "Livraison offerte", "-59% sur le prix boutique"],
  },
];

export function getBundle(id: string | undefined): Bundle {
  return BUNDLES.find((b) => b.id === id) ?? BUNDLES[1];
}

/** Marge nette estimée par pack (avant pub) */
export function bundleProfit(b: Bundle): number {
  return b.price - UNIT_COST * b.qty;
}

export const FEATURES = [
  {
    icon: "sparkles",
    title: "21 scènes cosmiques",
    text: "Nébuleuse violette, aurore boréale, voie lactée… change d'univers en un clic.",
  },
  {
    icon: "music",
    title: "Enceinte Bluetooth 5.3",
    text: "Ta playlist préférée se synchronise : la lumière pulse au rythme de la musique.",
  },
  {
    icon: "timer",
    title: "Minuteur intelligent",
    text: "Endors-toi sous les étoiles : extinction automatique à 15, 30 ou 60 minutes.",
  },
  {
    icon: "remote",
    title: "Télécommande & appli",
    text: "Intensité, vitesse, couleurs : pilote tout depuis ton lit ou ton canapé.",
  },
  {
    icon: "moon",
    title: "Silence absolu",
    text: "Moteur < 20 dB. La seule chose que tu entendras, c'est ton souffle qui se calme.",
  },
  {
    icon: "leaf",
    title: "Basse consommation",
    text: "LED 5 W dernière génération : moins de 1 € d'électricité par mois.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Léa M.",
    city: "Lyon",
    rating: 5,
    pack: "Pack Immersion",
    text: "Ma fille refuse de dormir sans sa « galaxie ». Le minuteur est une bénédiction, et le mode aurore boréale est irréel. Commandé lundi, reçu jeudi.",
  },
  {
    name: "Yanis B.",
    city: "Bruxelles",
    rating: 5,
    pack: "Pack Découverte",
    text: "Je l'utilise pour mes soirées gaming et films. Le rendu au plafond est bluffant, on dirait un dôme de planétarium. Le Bluetooth se connecte en 2 secondes.",
  },
  {
    name: "Camille R.",
    city: "Bordeaux",
    rating: 5,
    pack: "Pack Constellation",
    text: "J'ai pris le pack de 3 : salon, chambre, et un en cadeau. Tout le monde me demande où je l'ai trouvé. La méditation du soir a changé ma qualité de sommeil.",
  },
  {
    name: "Thomas D.",
    city: "Nantes",
    rating: 4,
    pack: "Pack Immersion",
    text: "Projection très lumineuse même sur un grand plafond. Petit plus : la télécommande permet de fixer une couleur précise. Je recommande le mode nébuleuse lente.",
  },
  {
    name: "Inès K.",
    city: "Paris",
    rating: 5,
    pack: "Pack Découverte",
    text: "Acheté pour mes séances de yoga du soir. L'ambiance est instantanée, la lumière douce ne pique pas les yeux. Paiement à la livraison très rassurant.",
  },
  {
    name: "Hugo P.",
    city: "Lille",
    rating: 5,
    pack: "Pack Immersion",
    text: "Un dans ma chambre, un dans celle de mon frère. En mode musique, la lumière suit le beat : les soirées entre potes ont littéralement changé de dimension.",
  },
] as const;

export const FAQ = [
  {
    q: "Combien de temps pour recevoir ma commande ?",
    a: "Nos commandes sont préparées sous 24-48 h puis expédiées en livraison suivie. Compte 5 à 8 jours ouvrés pour la France et la Belgique. Tu reçois ton numéro de suivi par e-mail dès l'expédition.",
  },
  {
    q: "Puis-je vraiment payer à la livraison ?",
    a: "Oui. Le paiement à la livraison (contre-remboursement) est disponible : tu ne paies qu'au moment où le colis est entre tes mains. Tu peux aussi payer par carte si tu préfères être livré en point relais.",
  },
  {
    q: "Et si le produit ne me plaît pas ?",
    a: "Tu disposes de 30 jours après réception pour changer d'avis : retour simple, remboursement intégral sous 48 h. Aucune question posée, aucun frais caché.",
  },
  {
    q: "Est-ce adapté à la chambre d'un enfant ?",
    a: "Absolument. La lumière LED ne chauffe pas, ne scintille pas et reste douce pour les yeux. Le minuteur d'extinction automatique et le silence du moteur (< 20 dB) en font le compagnon de nuit idéal.",
  },
  {
    q: "Quelle surface couvre la projection ?",
    a: "ASTRALIS ONE couvre jusqu'à 30 m² de plafond selon la hauteur et la luminosité ambiante. Pour une immersion maximale dans un grand salon, le Pack Immersion (2 unités) crée un dôme continu.",
  },
  {
    q: "Comment fonctionne la synchronisation musicale ?",
    a: "Connecte ton téléphone en Bluetooth, lance ta playlist : le capteur intégré fait pulser la nébuleuse au rythme du son. Unmode « silence » désactive la réactivité pour le sommeil.",
  },
] as const;

export const STATS = [
  { value: "12 480", label: "galaxie livrées" },
  { value: "4,8/5", label: "note moyenne" },
  { value: "30 j", label: "satisfait ou remboursé" },
  { value: "< 20 dB", label: "silence de fonctionnement" },
] as const;

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/36750193/15575252_1920_1080_30fps.mp4";
