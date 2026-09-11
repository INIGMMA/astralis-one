export interface SupplierProduct {
  name: string;
  source: string;
  url: string;
  costEur: number;
  deliveryTimeDays: string;
  shippingCarrier: string;
  sku: string;
  specs: string[];
}

export const SUPPLIER_INFO: SupplierProduct = {
  name: "Projecteur Astral Nébuleuse 4K (Astralis One Base)",
  source: "CJ Dropshipping / AliExpress Direct VIP",
  url: "https://cjdropshipping.com",
  costEur: 17.9,
  deliveryTimeDays: "5-8 jours ouvrés (Europe Standard)",
  shippingCarrier: "Colissimo / YunExpress Priority Line",
  sku: "AST-ONE-PRO-4K",
  specs: [
    "21 modes galaxie & aurore",
    "Enceinte Bluetooth 5.3",
    "Télécommande infrarouge incluse",
    "Câble USB-C tressé 1.5m",
    "Moteur silencieux < 20 dB",
    "Certifications CE, FCC, RoHS",
  ],
};

export const LAUNCH_CHECKLIST = [
  {
    category: "Légal & Banque",
    items: [
      { label: "Dépôt dossier auto-entrepreneur (INPI)", done: true, note: "Effectué - attente SIRET" },
      { label: "Compte Stripe ouvert", done: true, note: "Prêt à être branché" },
      { label: "Ajout clé STRIPE_SECRET_KEY", done: false, note: "Dès réception du SIRET" },
      { label: "Compte bancaire pro (Revolut/N26/Bourso)", done: false, note: "À lier à Stripe" },
    ],
  },
  {
    category: "Fournisseur & Logistique",
    items: [
      { label: "Fiche fournisseur CJ Dropshipping repérée", done: true, note: "Coût 17,90 € livré" },
      { label: "Tester une commande échantillon pour soi", done: false, note: "Idéal pour filmer" },
      { label: "Synchroniser le stock", done: true, note: "Assuré via le modèle dropship" },
    ],
  },
  {
    category: "Marketing & Trafic",
    items: [
      { label: "Créer compte TikTok @astralis.room", done: false, note: "Nom réservé" },
      { label: "Créer compte Instagram @astralis.room", done: false, note: "Pour la preuve sociale" },
      { label: "Poster 2 vidéos / jour (script dans l'admin)", done: false, note: "Objectif 50 €/j" },
      { label: "Relance des 24 leads enregistrés", done: true, note: "Disponibles dans l'admin" },
    ],
  },
];
