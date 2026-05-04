"use client";

import { useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSiteConfig } from "@/components/SiteConfigProvider";

const navLinks = [
  { href: "/noticias", label: "Noticias" },
  { href: "/devocionales", label: "Devocionales" },
  { href: "/testimonios", label: "Testimonios" },
  { href: "/cursos", label: "Enseñanza Bíblica" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const siteConfig = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 supports-[backdrop-filter]:bg-white/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.25rem] flex items-center justify-between">
        {/* ── Logo (izquierda) ── */}
        <div className="flex-shrink-0">
          <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 group">
            {siteConfig.logoUrl ? (
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.siteName}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#00498d] rounded-xl flex items-center justify-center shadow-sm shadow-[#00498d]/15 transition-shadow group-hover:shadow-md group-hover:shadow-[#00498d]/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path d="M10 5h4v4h4v4h-4v4h-4v-4H6v-4h4z" />
                </svg>
              </div>
            )}
            <span className="text-[14px] sm:text-[15px] font-semibold text-gray-900 tracking-tight group-hover:text-[#00498d] transition-colors duration-200 truncate">
              {siteConfig.siteName}
            </span>
          </Link>
        </div>

        {/* ── Menú central (escritorio) ── */}
        <ul className="hidden lg:flex items-center justify-center gap-0.5 flex-1 mx-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-3 py-2 text-[14px] text-gray-600 rounded-lg hover:text-[#00498d] hover:bg-[#00498d]/[0.04] transition-colors duration-200 font-medium group/link whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#00498d] rounded-full transition-all duration-300 group-hover/link:w-3/4 group-hover/link:left-1/2 group-hover/link:-translate-x-1/2" />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Sección derecha (UserMenu + hamburguesa móvil) ── */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Menú hamburguesa (solo móvil) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <UserMenu />
        </div>
      </nav>

      {/* ── Menú móvil desplegable ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 right-0 shadow-lg animate-in slide-in-from-top duration-200">
          <ul className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-[15px] text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-[#00498d] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}