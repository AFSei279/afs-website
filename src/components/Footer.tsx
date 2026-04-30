import Link from "next/link";
import { FOOTER_LEGAL_LINKS, NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-line bg-white">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-brand">
              {SITE.name}
            </p>
            <p className="mt-2 max-w-sm text-sm text-brand-muted">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-sm text-brand-muted">
              <a href={`mailto:${SITE.contactEmail}`} className="hover:text-brand">
                {SITE.contactEmail}
              </a>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-brand-ink">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-brand-ink">Rechtliches</p>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-brand-line pt-6 text-xs text-brand-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.
          </p>
          <p>
            Made in Germany · Hosted on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
