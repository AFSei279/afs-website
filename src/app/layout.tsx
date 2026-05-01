import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.shortName} — ${SITE.tagline}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.tagline,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.shortName,
    url: SITE.url,
    images: ["/og/default.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: SITE.founder.name }],
};

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const UMAMI_SRC =
  process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-brand-paper font-sans text-brand-ink antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />

        {UMAMI_WEBSITE_ID && (
          <Script
            defer
            data-website-id={UMAMI_WEBSITE_ID}
            src={UMAMI_SRC}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
