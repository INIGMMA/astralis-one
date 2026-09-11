import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle2 } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Mentions Légales & CGV — ASTRALIS",
};

export default function LegalPage() {
  return (
    <main className="relative min-h-svh bg-void text-ink px-5 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-mist hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour à la boutique
          </Link>
        </div>

        <div className="mt-10 space-y-10 text-mist text-sm leading-relaxed">
          <section>
            <h1 className="font-display text-3xl font-800 text-ink mb-4">
              Mentions Légales & Conditions Générales de Vente
            </h1>
            <p className="text-xs text-faint">Dernière mise à jour : 2026</p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-700 text-ink mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-pulsar" />
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong>ASTRALIS</strong> est édité sous le statut d’Entrepreneur Individuel (Micro-entreprise).
              <br />
              <strong>Dénomination commerciale :</strong> ASTRALIS Studio
              <br />
              <strong>Numéro d’immatriculation :</strong> En cours d'attribution par l'INSEE (Dépôt guichet unique INPI effectué).
              <br />
              <strong>Directeur de la publication :</strong> L'exploitant de l'entreprise ASTRALIS.
              <br />
              <strong>Contact client :</strong> support@astralis-room.fr
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-700 text-ink mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-comet" />
              2. Produits & Tarifs
            </h2>
            <p>
              ASTRALIS commercialise des projecteurs d'ambiance et luminaires cosmétiques pour particuliers (ASTRALIS ONE).
              Les prix sont exprimés en Euros (€) toutes taxes comprises (TVA non applicable, art. 293 B du CGI - franchise en base de TVA).
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-700 text-ink mb-3">
              3. Modalités de Commande et de Paiement
            </h2>
            <p>
              Deux modes de règlement sont proposés au consommateur :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Paiement à la livraison (Contre-Remboursement / Cash on Delivery) :</strong> le règlement de la commande intervient directement auprès du transporteur lors de la remise en main propre du colis.
              </li>
              <li>
                <strong>Paiement sécurisé par carte bancaire (via Stripe) :</strong> transaction chiffrée selon les normes SSL/TLS. Les coordonnées bancaires ne sont à aucun moment stockées sur nos serveurs.
              </li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-700 text-ink mb-3">
              4. Livraison & Expédition
            </h2>
            <p>
              Les commandes sont préparées sous 24 à 48 heures ouvrées puis expédiées via transporteurs suivis (Colissimo, YunExpress, etc.).
              Le délai indicatif de livraison en France métropolitaine, Belgique et Suisse est de <strong>5 à 8 jours ouvrés</strong>. Un numéro de suivi est fourni au client dès l’expédition.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-700 text-ink mb-3">
              5. Droit de Rétractation (Garantie 30 Jours)
            </h2>
            <p>
              Conformément aux dispositions de l'article L.221-18 du Code de la consommation, le client dispose d'un délai légal de 14 jours, étendu par ASTRALIS à <strong>30 jours calendaires</strong> à compter de la réception du produit, pour exercer son droit de rétractation et demander un remboursement intégral.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-700 text-ink mb-3">
              6. Données Personnelles & Confidentialité (RGPD)
            </h2>
            <p>
              Les données recueillies lors du processus de commande (nom, adresse, téléphone, email) sont strictement nécessaires à la bonne exécution de la livraison et au suivi de la relation commerciale. Elles ne sont cédées à aucun tiers à des fins de prospection non consentie.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
