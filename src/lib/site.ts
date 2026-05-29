/**
 * Zentrale Konstanten der Site. Alle Stellen, die URL, Markenname,
 * Kontaktadresse oder Navigation brauchen, importieren von hier — so
 * bleibt eine Änderung an einer Stelle.
 */

export const SITE = {
  name: "AFS Tech & Assets GmbH",
  shortName: "AFS Tech & Assets",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://afs-ta.com",
  tagline:
    "Lokale, DSGVO-freundliche KI für den Mittelstand — Beratung, Hardware, Implementierung.",
  // Öffentliche Kontaktadresse für das Lead-Formular und Impressum.
  contactEmail: "kontakt@afs-ta.com",
  // Persönliche Adresse des Geschäftsführers.
  founderEmail: "andre@afs-ta.com",
  founderPhone: "+49 176 61883207",
  founder: {
    name: "André Ferreira Sadlo",
    role: "Geschäftsführer & Gründer",
    title: "Dipl. Wirtsch.-Inf. (FH), IREB CPRE",
  },
  address: {
    street: "Stoke-on-Trent-Straße 1",
    zip: "91058",
    city: "Erlangen",
    country: "Deutschland",
  },
  legal: {
    register: "Handelsregister B",
    court: "Amtsgericht Fürth",
    registerNumber: "HRB 18362",
    vatId: "DE336045334",
  },
} as const;

/**
 * Ein Eintrag in der Hauptnavigation. Entweder ein direkter Link
 * (`href` gesetzt) oder eine Gruppe mit Unterpunkten (`children` gesetzt).
 */
export type NavLink = {
  label: string;
  href?: string;
  children?: ReadonlyArray<{ href: string; label: string; external?: boolean }>;
};

export const NAV_LINKS: ReadonlyArray<NavLink> = [
  { href: "/", label: "Start" },
  { href: "/leistungen/", label: "Leistungen" },
  { href: "/produkte/", label: "Digitale Produkte" },
  {
    href: "/tools/lokaler-ki-hardware-rechner/",
    label: "KI-Hardware-Rechner",
  },
  {
    label: "Brettany",
    children: [
      { href: "https://apps.apple.com/de/app/brettany/id6772245849", label: "Im App Store", external: true },
      { href: "/brettany-support/", label: "Support" },
      { href: "/brettany-privacy/", label: "Datenschutz" },
    ],
  },
  { href: "/ueber-mich/", label: "Über mich" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/impressum/", label: "Impressum" },
  { href: "/datenschutz/", label: "Datenschutz" },
] as const;
