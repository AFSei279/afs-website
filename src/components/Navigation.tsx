"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-brand"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="AFS Tech & Assets Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="hidden text-base font-semibold sm:inline">
            {SITE.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Hauptnavigation">
          {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-ink transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kontakt/" className="btn-primary">
            Beratung anfragen
          </Link>
        </nav>

        {/* Mobile-Toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-line text-brand md:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-line bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile Navigation">
            {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-ink hover:bg-brand/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt/"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Beratung anfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
