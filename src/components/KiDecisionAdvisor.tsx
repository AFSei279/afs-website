"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AdvisorAnswers,
  AmortInput,
  AMORT_DEFAULTS,
  BUDGET_OPTIONS,
  BudgetBand,
  DataSensitivity,
  PLAN_OPTIONS,
  PlanId,
  SENSITIVITY_OPTIONS,
  USER_BAND_OPTIONS,
  USE_CASE_OPTIONS,
  UseCaseId,
  UserBand,
  amortize,
  formatEuro,
  formatMonths,
  recommend,
} from "@/lib/ki-advisor";

interface Props {
  /** Wird beim Klick auf den CTA aufgerufen — der Aufrufer kann z. B. zum Lead-Formular scrollen. */
  onRequestConsultation?: (summary: string) => void;
}

type Step = 0 | 1 | 2 | 3 | 4; // 0–3 Fragen, 4 = Ergebnis

export function KiDecisionAdvisor({ onRequestConsultation }: Props) {
  const [step, setStep] = useState<Step>(0);
  const [useCases, setUseCases] = useState<UseCaseId[]>([]);
  const [sensitivity, setSensitivity] = useState<DataSensitivity | null>(null);
  const [users, setUsers] = useState<UserBand | null>(null);
  const [budget, setBudget] = useState<BudgetBand | null>(null);

  const answers: AdvisorAnswers | null =
    sensitivity && users && budget
      ? { useCases, sensitivity, users, budget }
      : null;

  const stepValid =
    (step === 0 && useCases.length > 0) ||
    (step === 1 && sensitivity !== null) ||
    (step === 2 && users !== null) ||
    (step === 3 && budget !== null) ||
    step === 4;

  function toggleUseCase(id: UseCaseId) {
    setUseCases((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  }

  function reset() {
    setStep(0);
    setUseCases([]);
    setSensitivity(null);
    setUsers(null);
    setBudget(null);
  }

  const progress = ((step) / 4) * 100;

  return (
    <div className="card">
      {/* Fortschritt */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-brand-muted">
          <span>
            {step < 4 ? `Frage ${step + 1} von 4` : "Ihre Empfehlung"}
          </span>
          {step > 0 && (
            <button
              type="button"
              onClick={reset}
              className="underline transition hover:text-brand"
            >
              Neu starten
            </button>
          )}
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-line">
          <div
            className="h-full rounded-full bg-brand-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Frage 1 — Use Cases */}
      {step === 0 && (
        <QuestionShell
          title="Wofür möchten Sie KI im Unternehmen einsetzen?"
          subtitle="Mehrfachauswahl möglich. Wählen Sie alles, was zutrifft."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {USE_CASE_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.id}
                selected={useCases.includes(opt.id)}
                onClick={() => toggleUseCase(opt.id)}
                label={opt.label}
                desc={opt.desc}
                multi
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Frage 2 — Datenschutz */}
      {step === 1 && (
        <QuestionShell
          title="Wie sensibel sind die Daten, mit denen die KI arbeiten soll?"
          subtitle="Das ist die wichtigste Frage für die Entscheidung lokal vs. Cloud."
        >
          <div className="grid gap-3">
            {SENSITIVITY_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.id}
                selected={sensitivity === opt.id}
                onClick={() => setSensitivity(opt.id)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Frage 3 — Nutzerzahl */}
      {step === 2 && (
        <QuestionShell
          title="Wie viele Mitarbeiter sollen die KI nutzen?"
          subtitle="Bestimmt die Hardware-Klasse und ist die Basis der Amortisationsrechnung."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {USER_BAND_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.id}
                selected={users === opt.id}
                onClick={() => setUsers(opt.id)}
                label={opt.label}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Frage 4 — Budget */}
      {step === 3 && (
        <QuestionShell
          title="Welcher Investitionsrahmen ist realistisch?"
          subtitle="Hilft uns, die Empfehlung passend zu dimensionieren. Keine verbindliche Angabe."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {BUDGET_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.id}
                selected={budget === opt.id}
                onClick={() => setBudget(opt.id)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Ergebnis */}
      {step === 4 && answers && (
        <ResultPanel
          answers={answers}
          onRequestConsultation={onRequestConsultation}
        />
      )}

      {/* Navigation */}
      {step < 4 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
            disabled={step === 0}
            className="btn-ghost disabled:invisible"
          >
            ← Zurück
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) as Step)}
            disabled={!stepValid}
            className="btn-primary disabled:opacity-50"
          >
            {step === 3 ? "Empfehlung anzeigen" : "Weiter →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
//  ERGEBNIS-PANEL: Empfehlung + Amortisationsrechner
// ===========================================================================

function ResultPanel({
  answers,
  onRequestConsultation,
}: {
  answers: AdvisorAnswers;
  onRequestConsultation?: (summary: string) => void;
}) {
  const rec = useMemo(() => recommend(answers), [answers]);

  const hostingBadge = {
    local: { label: "Lokale KI", cls: "bg-signal-green-bg text-signal-green" },
    hybrid: { label: "Hybrid", cls: "bg-signal-yellow-bg text-signal-yellow" },
    cloud: { label: "Cloud", cls: "bg-brand/10 text-brand" },
  }[rec.hosting];

  return (
    <div className="space-y-6">
      {/* Empfehlung */}
      <div>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${hostingBadge.cls}`}
        >
          {hostingBadge.label}
        </span>
        <h3 className="mt-3 text-2xl font-bold text-brand">
          {rec.profileTitle}
        </h3>
        <p className="mt-2 text-base text-brand-muted">{rec.profileText}</p>
      </div>

      <div className="rounded-lg border border-brand-line bg-brand-paper p-5">
        <p className="font-semibold text-brand-ink">{rec.hostingTitle}</p>
        <p className="mt-2 text-sm text-brand-muted">{rec.hostingText}</p>
      </div>

      <div>
        <p className="font-semibold text-brand-ink">Das setzen wir für Sie um</p>
        <ul className="mt-3 space-y-2 text-sm text-brand-ink">
          {rec.buildingBlocks.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-brand-accent-dark">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-brand/5 p-4 text-sm text-brand">
        <span className="font-semibold">Hardware-Orientierung:</span>{" "}
        {rec.hardwareHint}{" "}
        <Link
          href="/tools/lokaler-ki-hardware-rechner/"
          className="font-semibold underline hover:text-brand-dark"
        >
          Zum Hardware-Rechner →
        </Link>
      </div>

      {/* Amortisationsrechner */}
      <div className="border-t border-brand-line pt-6">
        <h3 className="text-xl font-bold text-brand">
          Was rechnet sich? Lokale KI vs. ChatGPT-Abo
        </h3>
        <p className="mt-1 text-sm text-brand-muted">
          Vorbelegt mit Ihren Angaben. Alle Werte können Sie anpassen — die
          Rechnung aktualisiert sich sofort.
        </p>
        <AmortCalculator
          defaults={rec.amortDefaults}
          onRequestConsultation={onRequestConsultation}
          recommendationTitle={rec.profileTitle}
        />
      </div>
    </div>
  );
}

// ===========================================================================
//  AMORTISATIONSRECHNER
// ===========================================================================

function AmortCalculator({
  defaults,
  onRequestConsultation,
  recommendationTitle,
}: {
  defaults: {
    users: number;
    hardwareInvest: number;
    setupCost: number;
    powerDrawW: number;
    suggestedPlan: PlanId;
  };
  onRequestConsultation?: (summary: string) => void;
  recommendationTitle: string;
}) {
  const planMeta = PLAN_OPTIONS.find((p) => p.id === defaults.suggestedPlan)!;

  const [input, setInput] = useState<AmortInput>({
    users: defaults.users,
    plan: defaults.suggestedPlan,
    pricePerUserMonth: planMeta.defaultPricePerUser,
    hardwareInvest: defaults.hardwareInvest,
    setupCost: defaults.setupCost,
    powerDrawW: defaults.powerDrawW,
    ...AMORT_DEFAULTS,
  });

  const result = useMemo(() => amortize(input), [input]);

  function update<K extends keyof AmortInput>(key: K, value: AmortInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function changePlan(plan: PlanId) {
    const meta = PLAN_OPTIONS.find((p) => p.id === plan)!;
    setInput((prev) => ({
      ...prev,
      plan,
      pricePerUserMonth: meta.defaultPricePerUser,
    }));
  }

  function handleConsultation() {
    const summary = [
      "Anfrage über KI-Entscheidungsberater",
      "",
      `Empfohlenes Lösungsprofil: ${recommendationTitle}`,
      "",
      "Amortisationsrechnung:",
      `Nutzer: ${input.users}`,
      `Vergleich mit: ${planMeta.label} (${input.pricePerUserMonth} €/Nutzer/Monat)`,
      `Lokale Investition (einmalig): ${formatEuro(result.localOneTime)}`,
      `Cloud-Kosten pro Monat: ${formatEuro(result.cloudMonthly)}`,
      `Betrachtungszeitraum: ${input.horizonYears} Jahre`,
      result.breakEvenMonth
        ? `Break-even nach: ${formatMonths(result.breakEvenMonth)}`
        : "Break-even im Zeitraum nicht erreicht",
      `Ersparnis lokal nach ${input.horizonYears} Jahren: ${formatEuro(result.savingsAtHorizon)}`,
      "",
      "Bitte um Beratung und ein konkretes Angebot.",
    ].join("\n");
    onRequestConsultation?.(summary);
  }

  const localCheaper = result.savingsAtHorizon >= 0;

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* Eingaben */}
      <div className="space-y-5">
        {/* Plan-Auswahl */}
        <div>
          <label className="field-label">Vergleich mit</label>
          <div className="grid grid-cols-2 gap-2">
            {PLAN_OPTIONS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => changePlan(p.id)}
                className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                  input.plan === p.id
                    ? "border-brand bg-brand/5 font-semibold text-brand"
                    : "border-brand-line text-brand-ink hover:border-brand"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-brand-muted">{planMeta.note}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Nutzer"
            value={input.users}
            min={1}
            max={5000}
            onChange={(v) => update("users", v)}
          />
          <NumberField
            label="Preis je Nutzer / Monat (€)"
            value={input.pricePerUserMonth}
            min={1}
            max={500}
            onChange={(v) => update("pricePerUserMonth", v)}
          />
        </div>

        {input.plan === "enterprise" && (
          <label className="flex items-start gap-2 text-sm text-brand-ink">
            <input
              type="checkbox"
              checked={input.applyMinSeats}
              onChange={(e) => update("applyMinSeats", e.target.checked)}
              className="mt-0.5"
            />
            <span>
              150-Plätze-Mindestabnahme einrechnen
              <span className="block text-xs text-brand-muted">
                Enterprise verlangt min. 150 Plätze im Jahresvertrag — bei{" "}
                {input.users} Nutzern zahlen Sie real für{" "}
                {result.effectiveCloudSeats}.
              </span>
            </span>
          </label>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Hardware (einmalig, €)"
            value={input.hardwareInvest}
            min={0}
            max={500000}
            step={500}
            onChange={(v) => update("hardwareInvest", v)}
          />
          <NumberField
            label="Einrichtung (einmalig, €)"
            value={input.setupCost}
            min={0}
            max={200000}
            step={500}
            onChange={(v) => update("setupCost", v)}
          />
        </div>

        <details className="rounded-md border border-brand-line p-3">
          <summary className="cursor-pointer text-sm font-semibold text-brand">
            Laufende Kosten & Annahmen
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Leistung (Watt)"
              value={input.powerDrawW}
              min={50}
              max={5000}
              step={10}
              onChange={(v) => update("powerDrawW", v)}
            />
            <NumberField
              label="Strompreis (€/kWh)"
              value={input.electricityPricePerKwh}
              min={0}
              max={2}
              step={0.01}
              onChange={(v) => update("electricityPricePerKwh", v)}
            />
            <NumberField
              label="Stunden / Tag"
              value={input.hoursPerDay}
              min={1}
              max={24}
              onChange={(v) => update("hoursPerDay", v)}
            />
            <NumberField
              label="Tage / Jahr"
              value={input.daysPerYear}
              min={1}
              max={365}
              onChange={(v) => update("daysPerYear", v)}
            />
            <NumberField
              label="Wartung / Jahr (€)"
              value={input.annualMaintenance}
              min={0}
              max={100000}
              step={100}
              onChange={(v) => update("annualMaintenance", v)}
            />
          </div>
        </details>

        <div>
          <label className="field-label">Betrachtungszeitraum</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 5].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => update("horizonYears", y)}
                className={`rounded-md border px-3 py-2 text-sm transition ${
                  input.horizonYears === y
                    ? "border-brand bg-brand/5 font-semibold text-brand"
                    : "border-brand-line text-brand-ink hover:border-brand"
                }`}
              >
                {y} {y === 1 ? "Jahr" : "Jahre"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      <div className="space-y-4">
        <div
          className={`rounded-xl p-5 ${
            localCheaper ? "bg-signal-green-bg" : "bg-signal-yellow-bg"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              localCheaper ? "text-signal-green" : "text-signal-yellow"
            }`}
          >
            {localCheaper
              ? `Lokale KI günstiger über ${input.horizonYears} Jahre`
              : `ChatGPT günstiger über ${input.horizonYears} Jahre`}
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-ink">
            {formatEuro(Math.abs(result.savingsAtHorizon))}
          </p>
          <p className="mt-1 text-sm text-brand-muted">
            {localCheaper ? "Ersparnis" : "Mehrkosten"} gegenüber{" "}
            {planMeta.label}
          </p>
          <p className="mt-3 text-sm font-medium text-brand-ink">
            {result.breakEvenMonth
              ? `Break-even nach ${formatMonths(result.breakEvenMonth)}`
              : "Break-even erst nach dem gewählten Zeitraum"}
          </p>
        </div>

        <BreakEvenChart result={result} />

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border border-brand-line p-3">
            <p className="text-xs uppercase tracking-wider text-brand-muted">
              Lokal gesamt
            </p>
            <p className="mt-1 text-lg font-bold text-brand">
              {formatEuro(result.localTotalAtHorizon)}
            </p>
            <p className="text-xs text-brand-muted">
              {formatEuro(result.localOneTime)} einmalig +{" "}
              {formatEuro(result.localMonthlyRunning)}/Mon.
            </p>
          </div>
          <div className="rounded-md border border-brand-line p-3">
            <p className="text-xs uppercase tracking-wider text-brand-muted">
              {planMeta.label} gesamt
            </p>
            <p className="mt-1 text-lg font-bold text-brand">
              {formatEuro(result.cloudTotalAtHorizon)}
            </p>
            <p className="text-xs text-brand-muted">
              {formatEuro(result.cloudMonthly)}/Mon. ·{" "}
              {result.effectiveCloudSeats} Plätze
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConsultation}
          className="btn-primary w-full"
        >
          Angebot & Beratung anfragen
        </button>
      </div>
    </div>
  );
}

// ===========================================================================
//  BREAK-EVEN-GRAFIK (inline SVG, keine externe Lib)
// ===========================================================================

function BreakEvenChart({
  result,
}: {
  result: ReturnType<typeof amortize>;
}) {
  const W = 360;
  const H = 180;
  const pad = { top: 12, right: 12, bottom: 24, left: 44 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const maxVal = Math.max(
    result.cloudTotalAtHorizon,
    result.localTotalAtHorizon,
    1
  );
  const maxMonth = result.horizonMonths || 1;

  const x = (m: number) => pad.left + (m / maxMonth) * innerW;
  const y = (v: number) => pad.top + innerH - (v / maxVal) * innerH;

  const cloudPath = result.series
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.month)} ${y(p.cloud)}`)
    .join(" ");
  const localPath = result.series
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.month)} ${y(p.local)}`)
    .join(" ");

  const beX = result.breakEvenMonth !== null ? x(result.breakEvenMonth) : null;

  return (
    <div className="rounded-md border border-brand-line p-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Kostenverlauf lokal vs. Cloud"
      >
        {/* Achsen */}
        <line
          x1={pad.left}
          y1={pad.top}
          x2={pad.left}
          y2={pad.top + innerH}
          stroke="#E5E7EB"
        />
        <line
          x1={pad.left}
          y1={pad.top + innerH}
          x2={pad.left + innerW}
          y2={pad.top + innerH}
          stroke="#E5E7EB"
        />

        {/* Break-even-Linie */}
        {beX !== null && (
          <>
            <line
              x1={beX}
              y1={pad.top}
              x2={beX}
              y2={pad.top + innerH}
              stroke="#C8A24A"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={beX} cy={y(result.series[result.breakEvenMonth!].local)} r="3.5" fill="#C8A24A" />
          </>
        )}

        {/* Linien */}
        <path d={cloudPath} fill="none" stroke="#0F2A44" strokeWidth="2" />
        <path d={localPath} fill="none" stroke="#15803D" strokeWidth="2" />

        {/* Achsenbeschriftung */}
        <text x={pad.left} y={H - 6} fontSize="9" fill="#5A6573">
          0
        </text>
        <text
          x={pad.left + innerW}
          y={H - 6}
          fontSize="9"
          fill="#5A6573"
          textAnchor="end"
        >
          {Math.round(maxMonth / 12)} J.
        </text>
        <text x={4} y={pad.top + 8} fontSize="9" fill="#5A6573">
          {formatEuro(maxVal)}
        </text>
      </svg>
      <div className="mt-1 flex items-center justify-center gap-4 text-xs text-brand-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-3 rounded-sm bg-signal-green" />
          Lokale KI
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-3 rounded-sm bg-brand" />
          ChatGPT-Abo
        </span>
        {beX !== null && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-3 rounded-sm bg-brand-accent" />
            Break-even
          </span>
        )}
      </div>
    </div>
  );
}

// ===========================================================================
//  HILFS-KOMPONENTEN
// ===========================================================================

function QuestionShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-brand">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-brand-muted">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ChoiceCard({
  selected,
  onClick,
  label,
  desc,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition ${
        selected
          ? "border-brand bg-brand/5 ring-1 ring-brand"
          : "border-brand-line bg-white hover:border-brand"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center border ${
          multi ? "rounded" : "rounded-full"
        } ${
          selected
            ? "border-brand bg-brand text-white"
            : "border-brand-line bg-white"
        }`}
      >
        {selected && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.5l2.5 2.5 4.5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span>
        <span className="block text-sm font-semibold text-brand-ink">
          {label}
        </span>
        {desc && (
          <span className="mt-0.5 block text-xs text-brand-muted">{desc}</span>
        )}
      </span>
    </button>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="field-input"
      />
    </div>
  );
}
