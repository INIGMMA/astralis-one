# 🌌 ASTRALIS ONE — Boutique Dropshipping Officielle

Boutique e-commerce haut de gamme pour le projecteur galaxie **ASTRALIS ONE** conçue avec **Next.js (App Router)**, **Tailwind CSS v4**, **Framer Motion**, et **PostgreSQL via Drizzle ORM**.

Objectif : **50 € de profit net / jour** (1 à 2 ventes par jour avec le pack Duo ou Trio).

---

## 🚀 Fonctionnalités

- **Expérience client immersive** : vidéo nébuleuse cosmique 4K, animations Framer Motion, étoiles filantes sur canvas interactif, lentille macro et mises en situation en chambre / salon.
- **Offres ancrées & rentables** :
  - **Pack Solo** : 49,90 € (+ 4,90 € livraison) — marge nette ~32 €
  - **Pack Duo (Le plus choisi)** : 84,90 € (Livraison offerte) — marge nette ~49 €
  - **Pack Trio (Constellation)** : 109,90 € (Livraison offerte) — marge nette ~56 €
- **Double mode de règlement** :
  - **Paiement à la livraison (Cash On Delivery)** : conversion maximale, zéro friction, zéro avance de carte pour le client.
  - **Paiement par carte bancaire sécurisé (Stripe Checkout)** : remise de 5% immédiate incitative, expédition prioritaire.
- **Espace Pilote Admin (`/admin`)** :
  - Jauge d'objectif journalier à 50 € en direct
  - Graphique de profit sur 14 jours
  - Gestion des statuts de commandes en 1 clic (nouveau, confirmé, expédié, livré, annulé)
  - Fiche sourcing fournisseur (CJ Dropshipping, coût unitaire 17,90 € livré)
  - Plan de bataille des 24 premières heures & scripts TikTok/Reels

---

## 🛠️ Déploiement en 1 clic sur Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi avec ton compte GitHub (`INIGMMA`).
2. Clique sur **Add New... → Project**, puis importe le repo **`INIGMMA/astralis-one`**.
3. Ajoute tes variables d'environnement :
   - `DATABASE_URL` : ton URL PostgreSQL (ex: [Neon.tech](https://neon.tech) ou [Supabase](https://supabase.com) gratuit)
   - `STRIPE_SECRET_KEY` (optionnel) : ta clé Stripe (`sk_live_...` ou `sk_test_...`)
   - `STRIPE_WEBHOOK_SECRET` (optionnel) : ton secret webhook Stripe
4. Clique sur **Deploy** ! Ton site est en ligne 24h/24 avec certificat SSL gratuit.

---

## 📦 Commandes locales

```bash
# Installation
npm install

# Développement local
npm run dev

# Construction de production
npm run build
```

---

© 2026 ASTRALIS Studio — Tous droits réservés.
