"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Navigation() {
  const [open, setOpen] = useState(false);
  // Welche Desktop-Dropdown-Gruppe ist aktuell offen? (Label oder null)
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Welche Mobile-Dropdown-Gruppe ist im mobilen Menü ausgeklappt?
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Schließt das Desktop-Dropdown bei Klick außerhalb.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Schließt das Desktop-Dropdown bei Escape.
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const desktopLinks = NAV_LINKS.filter((l) => l.href !== "/");

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

        <nav
          ref={navRef}
          className="hidden items-center gap-6 md:flex"
          aria-label="Hauptnavigation"
        >
          {desktopLinks.map((link) => {
            if (link.children && link.children.length > 0) {
              const isOpen = openMenu === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : link.label)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-ink transition hover:text-brand"
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className={`transition ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full min-w-[10rem] rounded-md border border-brand-line bg-white py-1 shadow-md"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          onClick={() => setOpenMenu(null)}
                          className="block px-3 py-2 text-sm text-brand-ink transition hover:bg-brand/5 hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href!}
                className="text-sm font-medium text-brand-ink transition hover:text-brand"
              >
                {link.label}
              </Link>
            );
          })}
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
          <nav
            className="container-page flex flex-col gap-1 py-3"
            aria-label="Mobile Navigation"
          >
            {desktopLinks.map((link) => {
              if (link.children && link.children.length > 0) {
                const isExpanded = mobileExpanded === link.label;
                return (
                  <div key={link.label} className="flex flex-col">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setMobileExpanded(isExpanded ? null : link.label)
                      }
                      className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-brand-ink hover:bg-brand/5"
                    >
                      <span>{link.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                        className={`transition ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M3 4.5l3 3 3-3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="ml-3 flex flex-col gap-1 border-l border-brand-line pl-3 py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setOpen(false);
                              setMobileExpanded(null);
                            }}
                            className="rounded-md px-3 py-2 text-sm text-brand-ink hover:bg-brand/5"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-brand-ink hover:bg-brand/5"
                >
                  {link.label}
                </Link>
              );
            })}
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
