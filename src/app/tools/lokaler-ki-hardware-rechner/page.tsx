import { HardwareRechnerView } from "./HardwareRechnerView";

export const metadata = {
  title: "Lokaler KI-Hardware-Rechner",
  description:
    "Berechnen Sie, ob Ihr Mac, PC oder Server für lokale KI-Modelle (Llama, Qwen, Mistral, DeepSeek) geeignet ist. RAM, VRAM, Modellgröße, Quantisierung und Hardware-Empfehlung in unter einer Minute.",
  alternates: { canonical: "/tools/lokaler-ki-hardware-rechner/" },
  keywords: [
    "lokaler KI Hardware Rechner",
    "LLM RAM Rechner",
    "VRAM Rechner KI",
    "lokale KI Hardware",
    "Ollama Hardware",
    "KI Server Rechner",
  ],
};

export default function HardwareRechnerPage() {
  return <HardwareRechnerView />;
}
