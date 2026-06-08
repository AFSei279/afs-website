/**
 * Reine Logik für den KI-Entscheidungsberater.
 *
 * Zwei Bausteine, bewusst frei von React:
 *  1) Entscheidungsbaum  → leitet aus Entscheider-freundlichen Fragen ein
 *     Lösungsprofil und eine Lokal-vs-Cloud-Empfehlung ab.
 *  2) Amortisationsrechner → vergleicht die Gesamtkosten einer lokalen
 *     KI-Lösung mit einem ChatGPT-Abo (Enterprise oder Business/Team) über
 *     einen wählbaren Zeitraum und ermittelt den Break-even.
 *
 * Preisannahmen (Stand Juni 2026, alle Defaults editierbar in der UI):
 *  - ChatGPT Enterprise: ~60 $/Nutzer/Monat (Range 45–75), 150-Plätze-Minimum,
 *    Jahresvertrag. Default hier 55 €/Nutzer/Monat.
 *  - ChatGPT Business/Team: ~20–25 $/Nutzer/Monat. Default hier 22 €/Nutzer/Monat.
 *  Quellen sind in der UI verlinkt.
 */

// ===========================================================================
//  TEIL 1 — ENTSCHEIDUNGSBAUM
// ===========================================================================

export type UseCaseId =
  | "assistant"
  | "knowledge"
  | "documents"
  | "coding"
  | "customer";

export type DataSensitivity = "high" | "medium" | "low";
export type UserBand = "1-3" | "4-10" | "11-50" | "50+";
export type BudgetBand = "lt5k" | "5to25k" | "25to60k" | "open";

export interface AdvisorAnswers {
  /** Mehrfachauswahl möglich. */
  useCases: UseCaseId[];
  sensitivity: DataSensitivity;
  users: UserBand;
  budget: BudgetBand;
}

export type Hosting = "local" | "hybrid" | "cloud";

export interface AdvisorRecommendation {
  /** Empfohlenes Lösungsprofil, Entscheider-freundlich formuliert. */
  profileTitle: string;
  profileText: string;
  /** Lokal, Hybrid oder Cloud — die Kern-Empfehlung. */
  hosting: Hosting;
  hostingTitle: string;
  hostingText: string;
  /** Konkrete nächste Bausteine (was AFS umsetzt). */
  buildingBlocks: string[];
  /** Grobe Hardware-Klasse als Brücke zum Hardware-Rechner. */
  hardwareHint: string;
  /** Sinnvolle Vorbelegung für den Amortisationsrechner. */
  amortDefaults: {
    users: number;
    hardwareInvest: number;
    setupCost: number;
    powerDrawW: number;
    suggestedPlan: PlanId;
  };
}

// Anzeige-Metadaten für die UI (Labels an einer Stelle).
export const USE_CASE_OPTIONS: {
  id: UseCaseId;
  label: string;
  desc: string;
}[] = [
  {
    id: "assistant",
    label: "Allgemeiner KI-Assistent",
    desc: "Texte, E-Mails, Recherche, Brainstorming für Mitarbeiter.",
  },
  {
    id: "knowledge",
    label: "Firmenwissen für alle zugänglich",
    desc: "Handbücher, Verträge, Wiki & Dokumente per KI durchsuchbar (RAG).",
  },
  {
    id: "documents",
    label: "Dokumente analysieren",
    desc: "Lange Dokumente zusammenfassen, vergleichen, Daten extrahieren.",
  },
  {
    id: "coding",
    label: "Entwicklung & Technik",
    desc: "Programmier-Unterstützung, Code-Review, Automatisierung.",
  },
  {
    id: "customer",
    label: "Kundenkommunikation",
    desc: "Chatbot, Anfragen vorqualifizieren, Antwortentwürfe.",
  },
];

export const SENSITIVITY_OPTIONS: {
  id: DataSensitivity;
  label: string;
  desc: string;
}[] = [
  {
    id: "high",
    label: "Sehr sensibel",
    desc: "Personal-, Mandanten-, Patienten- oder Vertragsdaten. Dürfen das Haus nicht verlassen.",
  },
  {
    id: "medium",
    label: "Vertraulich",
    desc: "Interne Daten — Cloud mit Auftragsverarbeitungsvertrag wäre denkbar.",
  },
  {
    id: "low",
    label: "Unkritisch",
    desc: "Überwiegend öffentliche oder unkritische Informationen.",
  },
];

export const USER_BAND_OPTIONS: {
  id: UserBand;
  label: string;
  count: number;
}[] = [
  { id: "1-3", label: "1–3 Mitarbeiter", count: 3 },
  { id: "4-10", label: "4–10 Mitarbeiter", count: 8 },
  { id: "11-50", label: "11–50 Mitarbeiter", count: 25 },
  { id: "50+", label: "Mehr als 50", count: 75 },
];

export const BUDGET_OPTIONS: {
  id: BudgetBand;
  label: string;
  desc: string;
}[] = [
  { id: "lt5k", label: "Bis 5.000 €", desc: "Einstieg, einzelner Arbeitsplatz." },
  { id: "5to25k", label: "5.000 – 25.000 €", desc: "Team-Lösung." },
  { id: "25to60k", label: "25.000 – 60.000 €", desc: "Server für viele Nutzer." },
  { id: "open", label: "Noch offen", desc: "Beratung gewünscht." },
];

const USER_COUNT: Record<UserBand, number> = {
  "1-3": 3,
  "4-10": 8,
  "11-50": 25,
  "50+": 75,
};

/**
 * Leitet aus den Antworten eine Empfehlung ab. Die Logik ist bewusst
 * nachvollziehbar gehalten — sie soll Entscheider orientieren, nicht
 * eine individuelle Beratung ersetzen.
 */
export function recommend(answers: AdvisorAnswers): AdvisorRecommendation {
  const users = USER_COUNT[answers.users];
  const wantsKnowledge = answers.useCases.includes("knowledge");
  const wantsCustomer = answers.useCases.includes("customer");
  const multiUser = users >= 4;

  // --- Lokal vs. Cloud ---
  let hosting: Hosting;
  if (answers.sensitivity === "high") {
    hosting = "local";
  } else if (answers.sensitivity === "low" && !wantsKnowledge) {
    hosting = "cloud";
  } else {
    hosting = "hybrid";
  }

  // Budget kann eine reine Lokal-Empfehlung bei kleinem Rahmen relativieren.
  const tightBudget = answers.budget === "lt5k";

  const hostingMeta = buildHostingMeta(hosting, answers, tightBudget);

  // --- Lösungsprofil ---
  let profileTitle: string;
  let profileText: string;
  let hardwareHint: string;
  let hardwareInvest: number;
  let setupCost: number;
  let powerDrawW: number;

  if (wantsKnowledge && multiUser) {
    profileTitle = "Firmenwissen-Server (RAG) für das Team";
    profileText =
      "Eine zentrale KI, die auf Ihr Firmenwissen zugreift — Dokumente, Handbücher und Verträge werden durchsuchbar und beantwortbar, ohne dass sie das Haus verlassen. Mehrere Mitarbeiter arbeiten gleichzeitig damit.";
    hardwareHint =
      "Workstation oder kleiner Server, 64–128 GB Speicher, dedizierte GPU. Details über den Hardware-Rechner.";
    hardwareInvest = users >= 25 ? 28000 : 14000;
    setupCost = 6000;
    powerDrawW = 450;
  } else if (wantsKnowledge) {
    profileTitle = "Lokaler KI-Arbeitsplatz mit Firmenwissen";
    profileText =
      "Eine lokale KI mit Zugriff auf Ihre Dokumente (RAG) für eine kleine Gruppe. Ideal, um Wissen zugänglich zu machen, ohne in Server-Hardware zu investieren.";
    hardwareHint =
      "Leistungsfähiger Arbeitsplatz, 48–96 GB Unified Memory bzw. starke GPU. Details über den Hardware-Rechner.";
    hardwareInvest = 7000;
    setupCost = 3500;
    powerDrawW = 250;
  } else if (multiUser) {
    profileTitle = "Geteilter KI-Assistent für das Team";
    profileText =
      "Ein KI-Assistent, den mehrere Mitarbeiter gemeinsam nutzen — für Texte, Recherche und Routineaufgaben. Zentral betrieben, mit sauberer Rollen- und Zugriffstrennung.";
    hardwareHint =
      "Workstation oder Mini-Server, 64 GB Speicher. Details über den Hardware-Rechner.";
    hardwareInvest = 9000;
    setupCost = 3500;
    powerDrawW = 300;
  } else {
    profileTitle = "Lokaler KI-Arbeitsplatz";
    profileText =
      "Eine lokale KI für einzelne Mitarbeiter — für Texte, E-Mails und Recherche. Der schlanke Einstieg in DSGVO-freundliche KI ohne laufende Abo-Kosten.";
    hardwareHint =
      "Apple Silicon ab 32–64 GB oder PC mit starker GPU. Details über den Hardware-Rechner.";
    hardwareInvest = 4500;
    setupCost = 1500;
    powerDrawW = 180;
  }

  // Kundenkommunikation ergänzt das Profil um einen Chatbot-Baustein.
  const buildingBlocks = buildBlocks(answers, wantsKnowledge, wantsCustomer);

  const suggestedPlan: PlanId = users >= 150 ? "enterprise" : "business";

  return {
    profileTitle,
    profileText,
    hosting,
    hostingTitle: hostingMeta.title,
    hostingText: hostingMeta.text,
    buildingBlocks,
    hardwareHint,
    amortDefaults: {
      users,
      hardwareInvest,
      setupCost,
      powerDrawW,
      suggestedPlan,
    },
  };
}

function buildHostingMeta(
  hosting: Hosting,
  answers: AdvisorAnswers,
  tightBudget: boolean
): { title: string; text: string } {
  if (hosting === "local") {
    return {
      title: "Empfehlung: Lokale KI",
      text:
        "Ihre Daten sind sensibel und sollen im Haus bleiben — das ist das Kernargument für lokale KI. Das Modell läuft auf Ihrer Hardware, es gibt keinen Cloud-Anbieter im Datenfluss und keine laufenden Pro-Kopf-Abokosten." +
        (tightBudget
          ? " Bei einem Budget bis 5.000 € starten wir mit einem einzelnen Arbeitsplatz und skalieren später."
          : ""),
    };
  }
  if (hosting === "cloud") {
    return {
      title: "Empfehlung: Cloud genügt — vorerst",
      text:
        "Bei unkritischen Daten und wenigen Nutzern ist ein ChatGPT-Abo der schnellste, günstigste Start. Lokale KI lohnt sich, sobald die Nutzerzahl steigt oder sensible Daten dazukommen — der Amortisationsrechner unten zeigt, ab wann.",
    };
  }
  return {
    title: "Empfehlung: Hybrid",
    text:
      "Ein Teil Ihrer Anwendungsfälle ist gut in der Cloud aufgehoben, ein anderer — vor allem das Firmenwissen oder vertrauliche Daten — gehört nach Hause. Eine lokale Basis für Sensibles, ergänzt um Cloud, wo es unkritisch ist.",
  };
}

function buildBlocks(
  answers: AdvisorAnswers,
  wantsKnowledge: boolean,
  wantsCustomer: boolean
): string[] {
  const blocks: string[] = [];
  blocks.push("Hardware-Auswahl & -Beschaffung in der passenden Klasse");
  blocks.push("Installation der lokalen LLM-Umgebung (Ollama / Open WebUI / vLLM)");
  if (wantsKnowledge) {
    blocks.push("RAG-Pipeline: Ihre Dokumente werden durchsuchbar und beantwortbar");
  }
  if (answers.useCases.includes("documents")) {
    blocks.push("Workflows für Dokumentenanalyse & Zusammenfassung");
  }
  if (wantsCustomer) {
    blocks.push("Chatbot für Kundenanfragen mit Antwortentwürfen");
  }
  if (answers.useCases.includes("coding")) {
    blocks.push("Coding-Assistent für Ihr Entwicklungsteam");
  }
  blocks.push("DSGVO-Architektur: Rollen, Zugriffe, Protokollierung");
  blocks.push("Integration in Ihre Tools (Microsoft 365, Confluence, ERP, CRM)");
  return blocks;
}

// ===========================================================================
//  TEIL 2 — AMORTISATIONSRECHNER (Lokale KI vs. ChatGPT)
// ===========================================================================

export type PlanId = "enterprise" | "business";

export const PLAN_OPTIONS: {
  id: PlanId;
  label: string;
  defaultPricePerUser: number; // € / Nutzer / Monat
  minSeats: number;
  note: string;
}[] = [
  {
    id: "enterprise",
    label: "ChatGPT Enterprise",
    defaultPricePerUser: 55,
    minSeats: 150,
    note: "Verhandelt, ~45–75 $/Nutzer/Mon., 150-Plätze-Minimum, Jahresvertrag.",
  },
  {
    id: "business",
    label: "ChatGPT Business / Team",
    defaultPricePerUser: 22,
    minSeats: 2,
    note: "~20–25 $/Nutzer/Mon. (jährliche Abrechnung günstiger).",
  },
];

export interface AmortInput {
  users: number;
  plan: PlanId;
  /** € / Nutzer / Monat. */
  pricePerUserMonth: number;
  /** Enterprise-Mindestabnahme von 150 Plätzen einrechnen? */
  applyMinSeats: boolean;
  /** Einmalige Hardware-Investition (€). */
  hardwareInvest: number;
  /** Einmalige Einrichtung / Implementierung (€). */
  setupCost: number;
  /** Dauerleistung der Hardware unter Last (Watt). */
  powerDrawW: number;
  /** Betriebsstunden pro Tag. */
  hoursPerDay: number;
  /** Betriebstage pro Jahr. */
  daysPerYear: number;
  /** Strompreis (€ / kWh). */
  electricityPricePerKwh: number;
  /** Optionale laufende Wartung / Support (€ / Jahr). */
  annualMaintenance: number;
  /** Betrachtungszeitraum in Jahren. */
  horizonYears: number;
}

export const AMORT_DEFAULTS: Omit<
  AmortInput,
  "users" | "plan" | "pricePerUserMonth" | "hardwareInvest" | "setupCost" | "powerDrawW"
> = {
  applyMinSeats: true,
  hoursPerDay: 8,
  daysPerYear: 250,
  electricityPricePerKwh: 0.3,
  annualMaintenance: 0,
  horizonYears: 3,
};

export interface AmortResult {
  /** Effektive Nutzerzahl fürs Cloud-Abo (ggf. auf Mindestabnahme angehoben). */
  effectiveCloudSeats: number;
  cloudMonthly: number;
  localOneTime: number;
  localMonthlyRunning: number;
  /** Break-even in Monaten (null, wenn innerhalb des Horizonts nicht erreicht). */
  breakEvenMonth: number | null;
  cloudTotalAtHorizon: number;
  localTotalAtHorizon: number;
  /** Ersparnis lokal ggü. Cloud am Ende des Horizonts (negativ = teurer). */
  savingsAtHorizon: number;
  /** Kumulative Reihen je Monat, für die Visualisierung. */
  series: { month: number; cloud: number; local: number }[];
  horizonMonths: number;
}

export function amortize(input: AmortInput): AmortResult {
  const planMeta = PLAN_OPTIONS.find((p) => p.id === input.plan)!;
  const effectiveCloudSeats =
    input.applyMinSeats && input.plan === "enterprise"
      ? Math.max(input.users, planMeta.minSeats)
      : input.users;

  const cloudMonthly = effectiveCloudSeats * input.pricePerUserMonth;

  const localOneTime = input.hardwareInvest + input.setupCost;
  const kwhPerMonth =
    (input.powerDrawW / 1000) *
    input.hoursPerDay *
    (input.daysPerYear / 12);
  const electricityMonthly = kwhPerMonth * input.electricityPricePerKwh;
  const localMonthlyRunning = electricityMonthly + input.annualMaintenance / 12;

  const horizonMonths = Math.round(input.horizonYears * 12);

  const series: { month: number; cloud: number; local: number }[] = [];
  let breakEvenMonth: number | null = null;
  for (let m = 0; m <= horizonMonths; m++) {
    const cloud = cloudMonthly * m;
    const local = localOneTime + localMonthlyRunning * m;
    series.push({ month: m, cloud, local });
    if (breakEvenMonth === null && m > 0 && local <= cloud) {
      breakEvenMonth = m;
    }
  }

  const cloudTotalAtHorizon = cloudMonthly * horizonMonths;
  const localTotalAtHorizon = localOneTime + localMonthlyRunning * horizonMonths;

  return {
    effectiveCloudSeats,
    cloudMonthly,
    localOneTime,
    localMonthlyRunning,
    breakEvenMonth,
    cloudTotalAtHorizon,
    localTotalAtHorizon,
    savingsAtHorizon: cloudTotalAtHorizon - localTotalAtHorizon,
    series,
    horizonMonths,
  };
}

// --- Anzeige-Helfer ---

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMonths(months: number): string {
  if (months < 12) return `${months} Monat${months === 1 ? "" : "e"}`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yPart = `${years} Jahr${years === 1 ? "" : "e"}`;
  return rest === 0 ? yPart : `${yPart}, ${rest} Mon.`;
}
