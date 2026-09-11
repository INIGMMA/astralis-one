import { db } from "@/db";
import { orders } from "@/db/schema";
import { getBundle, UNIT_COST } from "@/lib/config";

const PEOPLE: Array<[string, string, string]> = [
  ["Léa", "Martin", "Lyon"],
  ["Yanis", "Benali", "Bruxelles"],
  ["Camille", "Rousseau", "Bordeaux"],
  ["Thomas", "Dubois", "Nantes"],
  ["Inès", "Kaci", "Paris"],
  ["Hugo", "Petit", "Lille"],
  ["Chloé", "Moreau", "Toulouse"],
  ["Nathan", "Leroy", "Marseille"],
  ["Emma", "Girard", "Rennes"],
  ["Louis", "Fournier", "Strasbourg"],
  ["Jade", "Roux", "Genève"],
  ["Gabriel", "Vincent", "Nice"],
  ["Manon", "Fabre", "Montpellier"],
  ["Raphaël", "Mercier", "Dijon"],
  ["Sarah", "Blanchard", "Liège"],
  ["Arthur", "Guerin", "Tours"],
];

const STREETS = [
  "12 rue des Lilas",
  "4 avenue Jean Jaurès",
  "27 impasse du Moulin",
  "8 rue Victor Hugo",
  "103 boulevard de la République",
  "5 place du Marché",
  "19 rue des Acacias",
];

// nombre de commandes par jour, du plus ancien (il y a 13 j) à aujourd'hui
const DAILY_COUNTS = [1, 2, 1, 0, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2];
// packs pondérés : duo en majorité
const PACK_ROTATION = ["duo", "solo", "duo", "trio", "duo", "solo", "duo", "trio"] as const;

export async function seedIfEmpty() {
  const existing = await db.select({ id: orders.id }).from(orders).limit(1);
  if (existing.length > 0) return;

  const rows: (typeof orders.$inferInsert)[] = [];
  let cursor = 0;

  for (let age = DAILY_COUNTS.length - 1; age >= 0; age--) {
    const idx = DAILY_COUNTS.length - 1 - age;
    const count = DAILY_COUNTS[idx];
    for (let k = 0; k < count; k++) {
      const [first, last, city] = PEOPLE[cursor % PEOPLE.length];
      const packId = PACK_ROTATION[(cursor + age) % PACK_ROTATION.length];
      const bundle = getBundle(packId);

      const created = new Date();
      created.setDate(created.getDate() - age);
      created.setHours(9 + ((cursor * 3 + k * 5) % 12), (cursor * 17 + k * 23) % 60, 0, 0);

      const status =
        age >= 6 ? "livré" : age >= 3 ? "expédié" : age >= 1 ? "confirmé" : k === 0 ? "confirmé" : "nouveau";

      rows.push({
        createdAt: created,
        firstName: first,
        lastName: last,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
        phone: `+336${(10000000 + cursor * 137111).toString().slice(0, 8)}`,
        address: STREETS[cursor % STREETS.length],
        zip: `${(10 + ((cursor * 7) % 80)).toString().padStart(2, "0")}000`,
        city,
        country: cursor % 5 === 1 ? "Belgique" : cursor % 10 === 8 ? "Suisse" : "France",
        bundleId: bundle.id,
        qty: bundle.qty,
        unitCost: UNIT_COST.toFixed(2),
        total: (bundle.price + bundle.shipping).toFixed(2),
        profit: (bundle.price - UNIT_COST * bundle.qty).toFixed(2),
        status,
        note: null,
      });
      cursor++;
    }
  }

  if (rows.length > 0) {
    await db.insert(orders).values(rows);
  }
}
