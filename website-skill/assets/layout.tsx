import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://afs-ta.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AFS Tech & Assets",
    template: "%s | AFS Tech & Assets",
  },
  description:
    "AFS Tech & Assets — Replace this with the actual AFS value proposition.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "AFS Tech & Assets",
    images: ["/og/default.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-brand-paper font-sans text-brand-ink antialiased">
        {children}

        {/* Plausible analytics — cookie-free, GDPR-friendly. Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN to enable. */}
        {PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
