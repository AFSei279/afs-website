import { KiAdvisorView } from "./KiAdvisorView";

export const metadata = {
  title: "KI-Entscheidungsberater — Lokale KI vs. ChatGPT",
  description:
    "Vier einfache Fragen statt Technik-Details: Finden Sie heraus, welche KI-Lösung zu Ihrem Unternehmen passt — und ab wann sich lokale KI gegenüber einem ChatGPT-Abo (Enterprise/Business) rechnet. Mit Amortisationsrechner.",
  alternates: { canonical: "/tools/ki-entscheidungsberater/" },
  keywords: [
    "lokale KI vs ChatGPT",
    "KI Amortisationsrechner",
    "ChatGPT Enterprise Kosten",
    "lokale KI Unternehmen",
    "KI Entscheidung Mittelstand",
    "DSGVO KI",
    "ChatGPT Enterprise Alternative",
  ],
};

export default function KiAdvisorPage() {
  return <KiAdvisorView />;
}
