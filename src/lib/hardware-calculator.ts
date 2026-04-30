/**
 * Reine Rechenlogik für den lokalen KI-Hardware-Rechner.
 *
 * Diese Datei enthält keine UI — sie ist bewusst frei von React-Imports,
 * damit die Logik unabhängig getestet und später z. B. in einem PDF-Export
 * wiederverwendet werden kann.
 *
 * Quelle der Werte: AFS Tech & Assets — Briefing Lokaler KI-Hardware-Rechner.
 */

export type ModelClass = "3B-4B" | "7B-8B" | "13B-14B" | "30B-34B" | "70B";
export type Quantization = "Q4" | "Q5" | "Q8" | "FP16";
export type ContextLength = "4k" | "8k" | "16k" | "32k";
export type Platform =
  | "apple_silicon"
  | "nvidia_gpu"
  | "cpu_only"
  | "mini_pc"
  | "server"
  | "unknown";
export type UserCount = "1" | "2-3" | "4-10" | "10+";
export type UseCase =
  | "chatbot"
  | "coding"
  | "documents"
  | "rag"
  | "multi_user"
  | "company_server";

export type Status = "green" | "yellow" | "red";

export interface CalcInput {
  useCase: UseCase;
  modelClass: ModelClass;
  quantization: Quantization;
  contextLength: ContextLength;
  platform: Platform;
  ramGb: number;
  vramGb?: number;
  users: UserCount;
}

export interface CalcResult {
  requiredGb: number;
  availableGb: number;
  ratio: number;
  status: Status;
  statusText: string;
  recommendation: string;
  altModelHint?: string;
  breakdown: {
    modelWeightGb: number;
    contextOverheadGb: number;
    platformReserveGb: number;
    userMultiplier: number;
    safetyFactor: number;
  };
}

// --- Tabellen aus dem Briefing ---

const MODEL_WEIGHT_GB: Record<ModelClass, Record<Quantization, number>> = {
  "3B-4B": { Q4: 2.5, Q5: 3.5, Q8: 5, FP16: 8 },
  "7B-8B": { Q4: 5, Q5: 6.5, Q8: 9, FP16: 16 },
  "13B-14B": { Q4: 9, Q5: 11, Q8: 16, FP16: 28 },
  "30B-34B": { Q4: 22, Q5: 26, Q8: 38, FP16: 70 },
  "70B": { Q4: 45, Q5: 55, Q8: 80, FP16: 150 },
};

const CONTEXT_OVERHEAD_GB: Record<ContextLength, number> = {
  "4k": 1,
  "8k": 2,
  "16k": 4,
  "32k": 8,
};

const PLATFORM_RESERVE_GB: Record<Platform, number> = {
  apple_silicon: 4,
  nvidia_gpu: 2, // VRAM-Reserve; System-RAM-Hinweis kommt im Text
  cpu_only: 8,
  mini_pc: 8,
  server: 16,
  unknown: 8,
};

const USER_MULTIPLIER: Record<UserCount, number> = {
  "1": 1.0,
  "2-3": 1.25,
  "4-10": 1.75,
  "10+": 2.5,
};

const SAFETY_FACTOR = 1.2;

// --- Reihenfolgen für Vergleiche / Hinweise ---
export const MODEL_CLASS_ORDER: ModelClass[] = [
  "3B-4B",
  "7B-8B",
  "13B-14B",
  "30B-34B",
  "70B",
];

const QUANTIZATION_ORDER: Quantization[] = ["Q4", "Q5", "Q8", "FP16"];

// --- Hauptberechnung ---

export function calculate(input: CalcInput): CalcResult {
  const modelWeightGb = MODEL_WEIGHT_GB[input.modelClass][input.quantization];
  const contextOverheadGb = CONTEXT_OVERHEAD_GB[input.contextLength];
  const platformReserveGb = PLATFORM_RESERVE_GB[input.platform];
  const userMultiplier = USER_MULTIPLIER[input.users];

  const requiredGb =
    (modelWeightGb + contextOverheadGb + platformReserveGb) *
    userMultiplier *
    SAFETY_FACTOR;

  const availableGb = computeAvailableGb(input);
  const ratio = availableGb / requiredGb;

  let status: Status;
  if (ratio >= 1.25) status = "green";
  else if (ratio >= 0.9) status = "yellow";
  else status = "red";

  return {
    requiredGb,
    availableGb,
    ratio,
    status,
    statusText: getStatusText(status, input),
    recommendation: getHardwareRecommendation(requiredGb, input.platform),
    altModelHint: getAlternativeHint(status, input),
    breakdown: {
      modelWeightGb,
      contextOverheadGb,
      platformReserveGb,
      userMultiplier,
      safetyFactor: SAFETY_FACTOR,
    },
  };
}

function computeAvailableGb(input: CalcInput): number {
  // Apple Silicon nutzt Unified Memory — RAM und VRAM sind dasselbe.
  if (input.platform === "apple_silicon") {
    return input.ramGb;
  }

  // NVIDIA: VRAM ist der harte Engpass für Modellgewichte.
  // Wenn VRAM angegeben, das als Hauptbudget nehmen, sonst RAM.
  if (input.platform === "nvidia_gpu") {
    if (input.vramGb && input.vramGb > 0) {
      // VRAM + ein Anteil RAM für Overflow (sehr großzügig: 25 % des RAM dazu).
      return input.vramGb + Math.min(input.ramGb * 0.25, 8);
    }
    return input.ramGb;
  }

  // CPU-only / Mini-PC / Server / unknown: RAM ist das Budget.
  return input.ramGb + (input.vramGb ?? 0);
}

function getStatusText(status: Status, input: CalcInput): string {
  if (status === "green") {
    return "Ihre Hardware ist für diese Modellklasse gut geeignet — auch mit Spielraum für längere Kontexte oder mehrere Nutzer.";
  }
  if (status === "yellow") {
    return "Es kann funktionieren, aber bei langen Kontexten oder mehreren Nutzern wird es eng. Mit kleineren Quantisierungen (z. B. Q4) gewinnen Sie Spielraum.";
  }
  // red
  if (input.platform === "nvidia_gpu" && (!input.vramGb || input.vramGb === 0)) {
    return "Ohne Angabe zu Ihrem VRAM ist die Bewertung nur grob. Auf NVIDIA-GPUs ist VRAM der harte Engpass — bitte tragen Sie den VRAM ein, um eine belastbare Aussage zu erhalten.";
  }
  return "Diese Hardware ist für die gewählte Modellklasse zu schwach. Wählen Sie ein kleineres Modell, eine stärkere Quantisierung oder leistungsfähigere Hardware.";
}

function getHardwareRecommendation(
  requiredGb: number,
  platform: Platform
): string {
  const r = requiredGb;
  if (r <= 16) {
    return "Apple Silicon ab 16 GB Unified Memory · alternativ NVIDIA RTX 4060 Ti (16 GB VRAM)";
  }
  if (r <= 32) {
    return "Apple Silicon ab 32 GB · NVIDIA RTX 4070 Ti / 4080 (16 GB VRAM) · oder Workstation mit 32 GB RAM";
  }
  if (r <= 64) {
    return "MacBook Pro M3/M4 Max ab 64 GB · NVIDIA RTX 4090 (24 GB VRAM) · Workstation 64 GB RAM";
  }
  if (r <= 96) {
    return "Mac Studio M2/M3 Ultra ab 96 GB · NVIDIA RTX 6000 Ada (48 GB VRAM) · Server-GPU";
  }
  if (r <= 192) {
    return "Mac Studio M3 Ultra ab 192 GB · 2× NVIDIA RTX 6000 Ada · oder dedizierter KI-Server";
  }
  // > 192 GB
  return platform === "server"
    ? "Multi-GPU-Server mit ≥ 2× H100/H200 oder vergleichbarer Konfiguration"
    : "Bei diesem Bedarf führt kein Weg an einem dedizierten KI-Server (Multi-GPU) vorbei — das ist ein Beratungsfall, kein Konfigurator-Klick.";
}

function getAlternativeHint(
  status: Status,
  input: CalcInput
): string | undefined {
  if (status === "red") {
    // Vorschlag: kleinere Modellklasse oder stärkere Quantisierung.
    const idx = MODEL_CLASS_ORDER.indexOf(input.modelClass);
    if (idx > 0) {
      const smaller = MODEL_CLASS_ORDER[idx - 1];
      return `Alternativ passt die Modellklasse ${smaller} oder eine stärkere Quantisierung (z. B. Q4) — beides reduziert den Speicherbedarf deutlich.`;
    }
    if (input.quantization !== "Q4") {
      return "Alternativ Quantisierung Q4 wählen — das reduziert den Speicherbedarf um Faktor 2 bis 3.";
    }
    return "Auch mit der kleinsten Quantisierung reicht die Hardware nicht. Ein Hardware-Upgrade ist hier der ehrlichere Weg.";
  }
  if (status === "green") {
    const idx = MODEL_CLASS_ORDER.indexOf(input.modelClass);
    if (idx < MODEL_CLASS_ORDER.length - 1) {
      const bigger = MODEL_CLASS_ORDER[idx + 1];
      return `Mit dieser Hardware könnten Sie auch ${bigger} ausprobieren — wenn Qualität wichtiger ist als Geschwindigkeit.`;
    }
  }
  return undefined;
}

// --- Anzeige-Helfer ---

export function formatGb(gb: number): string {
  if (gb >= 100) return `${Math.round(gb)} GB`;
  return `${gb.toFixed(1)} GB`;
}
