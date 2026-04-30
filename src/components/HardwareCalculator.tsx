"use client";

import { useMemo, useState } from "react";
import {
  CalcInput,
  ContextLength,
  ModelClass,
  Platform,
  Quantization,
  UseCase,
  UserCount,
  calculate,
  formatGb,
} from "@/lib/hardware-calculator";

interface HardwareCalculatorProps {
  /** Wird beim Klick auf den CTA aufgerufen — der Aufrufer kann z. B. zur Kontaktseite scrollen. */
  onRequestConsultation?: (summary: string) => void;
}

const USE_CASES: { value: UseCase; label: string }[] = [
  { value: "chatbot", label: "Einfacher Chatbot" },
  { value: "coding", label: "Coding-Assistent" },
  { value: "documents", label: "Dokumentenanalyse" },
  { value: "rag", label: "RAG mit Unternehmensdaten" },
  { value: "multi_user", label: "Mehrere Nutzer gleichzeitig" },
  { value: "company_server", label: "Lokaler KI-Server" },
];

const MODEL_CLASSES: { value: ModelClass; label: string }[] = [
  { value: "3B-4B", label: "3B–4B (klein, schnell)" },
  { value: "7B-8B", label: "7B–8B (Standard)" },
  { value: "13B-14B", label: "13B–14B (stark)" },
  { value: "30B-34B", label: "30B–34B (sehr stark)" },
  { value: "70B", label: "70B (Premium)" },
];

const QUANTIZATIONS: { value: Quantization; label: string; hint: string }[] = [
  { value: "Q4", label: "Q4", hint: "wenig Speicher, gute Qualität" },
  { value: "Q5", label: "Q5", hint: "Kompromiss" },
  { value: "Q8", label: "Q8", hint: "mehr Speicher, bessere Qualität" },
  { value: "FP16", label: "FP16", hint: "voll, beste Qualität" },
];

const CONTEXT_LENGTHS: { value: ContextLength; label: string }[] = [
  { value: "4k", label: "4 k Tokens" },
  { value: "8k", label: "8 k Tokens" },
  { value: "16k", label: "16 k Tokens" },
  { value: "32k", label: "32 k Tokens" },
];

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "apple_silicon", label: "Apple Silicon (Mac)" },
  { value: "nvidia_gpu", label: "NVIDIA GPU (PC/Workstation)" },
  { value: "cpu_only", label: "CPU-only PC" },
  { value: "mini_pc", label: "Mini-PC" },
  { value: "server", label: "Firmenserver" },
  { value: "unknown", label: "Weiß ich nicht" },
];

const USER_COUNTS: { value: UserCount; label: string }[] = [
  { value: "1", label: "1 Nutzer" },
  { value: "2-3", label: "2–3 Nutzer" },
  { value: "4-10", label: "4–10 Nutzer" },
  { value: "10+", label: "Mehr als 10" },
];

const INITIAL: CalcInput = {
  useCase: "chatbot",
  modelClass: "7B-8B",
  quantization: "Q4",
  contextLength: "8k",
  platform: "apple_silicon",
  ramGb: 32,
  vramGb: 0,
  users: "1",
};

export function HardwareCalculator({
  onRequestConsultation,
}: HardwareCalculatorProps) {
  const [input, setInput] = useState<CalcInput>(INITIAL);

  const result = useMemo(() => calculate(input), [input]);

  const showVram = input.platform === "nvidia_gpu";
  const isApple = input.platform === "apple_silicon";

  function update<K extends keyof CalcInput>(key: K, value: CalcInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function handleConsultation() {
    const summary = [
      "Hardware-Check Anfrage",
      "",
      `Anwendungsfall: ${USE_CASES.find((u) => u.value === input.useCase)?.label}`,
      `Modellklasse: ${input.modelClass} ${input.quantization}`,
      `Kontextlänge: ${input.contextLength}`,
      `Plattform: ${PLATFORMS.find((p) => p.value === input.platform)?.label}`,
      `RAM: ${input.ramGb} GB${showVram && input.vramGb ? ` · VRAM: ${input.vramGb} GB` : ""}`,
      `Gleichzeitige Nutzer: ${input.users}`,
      "",
      `Geschätzter Bedarf: ${formatGb(result.requiredGb)}`,
      `Verfügbar: ${formatGb(result.availableGb)}`,
      `Bewertung: ${result.status.toUpperCase()}`,
      "",
      "Bitte um Hardware-Check und Beratung.",
    ].join("\n");

    onRequestConsultation?.(summary);
  }

  const statusColor = {
    green: {
      ring: "ring-signal-green",
      bg: "bg-signal-green-bg",
      text: "text-signal-green",
      dot: "bg-signal-green",
      label: "Geeignet",
    },
    yellow: {
      ring: "ring-signal-yellow",
      bg: "bg-signal-yellow-bg",
      text: "text-signal-yellow",
      dot: "bg-signal-yellow",
      label: "Knapp",
    },
    red: {
      ring: "ring-signal-red",
      bg: "bg-signal-red-bg",
      text: "text-signal-red",
      dot: "bg-signal-red",
      label: "Nicht ausreichend",
    },
  }[result.status];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      {/* Eingaben */}
      <div className="card">
        <h3 className="text-lg font-semibold text-brand">
          Ihre Konfiguration
        </h3>
        <p className="mt-1 text-sm text-brand-muted">
          Alle Felder bleiben in Ihrem Browser. Es werden keine Daten an AFS oder
          Dritte gesendet, solange Sie nicht aktiv eine Beratung anfragen.
        </p>

        <div className="mt-6 space-y-5">
          <SelectField
            label="Anwendungsfall"
            value={input.useCase}
            options={USE_CASES}
            onChange={(v) => update("useCase", v)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Modellklasse"
              value={input.modelClass}
              options={MODEL_CLASSES}
              onChange={(v) => update("modelClass", v)}
            />
            <SelectField
              label="Quantisierung"
              value={input.quantization}
              options={QUANTIZATIONS}
              onChange={(v) => update("quantization", v)}
              hint="Q4 = wenig Speicher, FP16 = voll"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Kontextlänge"
              value={input.contextLength}
              options={CONTEXT_LENGTHS}
              onChange={(v) => update("contextLength", v)}
              hint="Lange Dokumente brauchen mehr Speicher"
            />
            <SelectField
              label="Plattform"
              value={input.platform}
              options={PLATFORMS}
              onChange={(v) => update("platform", v)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label={isApple ? "Unified Memory (GB)" : "RAM (GB)"}
              value={input.ramGb}
              min={4}
              max={2048}
              onChange={(v) => update("ramGb", v)}
            />
            {showVram && (
              <NumberField
                label="VRAM (GB)"
                value={input.vramGb ?? 0}
                min={0}
                max={192}
                onChange={(v) => update("vramGb", v)}
                hint="Bei NVIDIA der entscheidende Wert"
              />
            )}
            {!showVram && (
              <SelectField
                label="Gleichzeitige Nutzer"
                value={input.users}
                options={USER_COUNTS}
                onChange={(v) => update("users", v)}
              />
            )}
          </div>

          {showVram && (
            <SelectField
              label="Gleichzeitige Nutzer"
              value={input.users}
              options={USER_COUNTS}
              onChange={(v) => update("users", v)}
            />
          )}
        </div>
      </div>

      {/* Ergebnis */}
      <div className="space-y-4">
        <div className={`card ring-2 ${statusColor.ring}`}>
          <div className="flex items-center gap-3">
            <span className={`inline-block h-4 w-4 rounded-full ${statusColor.dot}`} />
            <p className={`text-sm font-semibold uppercase tracking-wider ${statusColor.text}`}>
              {statusColor.label}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-brand-muted">
                Geschätzter Bedarf
              </p>
              <p className="mt-1 text-3xl font-bold text-brand">
                {formatGb(result.requiredGb)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-brand-muted">
                Verfügbar
              </p>
              <p className="mt-1 text-3xl font-bold text-brand">
                {formatGb(result.availableGb)}
              </p>
            </div>
          </div>

          <div className={`mt-6 rounded-md ${statusColor.bg} p-4 text-sm ${statusColor.text}`}>
            {result.statusText}
          </div>

          <div className="mt-4 text-sm">
            <p className="font-semibold text-brand-ink">Empfohlene Hardware</p>
            <p className="mt-1 text-brand-muted">{result.recommendation}</p>
          </div>

          {result.altModelHint && (
            <div className="mt-4 rounded-md bg-brand/5 p-3 text-sm text-brand">
              💡 {result.altModelHint}
            </div>
          )}

          <button
            type="button"
            onClick={handleConsultation}
            className="btn-primary mt-6 w-full"
          >
            Hardware-Check durch AFS anfragen
          </button>
        </div>

        <details className="card">
          <summary className="cursor-pointer text-sm font-semibold text-brand">
            Wie wird gerechnet?
          </summary>
          <div className="mt-4 space-y-2 text-sm text-brand-muted">
            <p>
              <code className="rounded bg-brand/5 px-1.5 py-0.5 text-brand">
                Bedarf = (Modellgewicht + Kontext + Plattformreserve) × Nutzer × 1.2
              </code>
            </p>
            <ul className="space-y-1 text-xs">
              <li>Modellgewicht: {formatGb(result.breakdown.modelWeightGb)}</li>
              <li>Kontextaufschlag: {formatGb(result.breakdown.contextOverheadGb)}</li>
              <li>Plattformreserve: {formatGb(result.breakdown.platformReserveGb)}</li>
              <li>Nutzer-Faktor: ×{result.breakdown.userMultiplier}</li>
              <li>Sicherheitsaufschlag: ×{result.breakdown.safetyFactor}</li>
            </ul>
            <p className="mt-3 text-xs">
              Die Berechnung ist eine technische Orientierung. Der tatsächliche Bedarf
              hängt von Modell, Software, Kontextlänge, Anzahl Nutzer und
              Performance-Anforderungen ab.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}

// ---- Hilfs-Komponenten ----

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="field-input"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-xs text-brand-muted">{hint}</p>}
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="field-input"
      />
      {hint && <p className="mt-1 text-xs text-brand-muted">{hint}</p>}
    </div>
  );
}
