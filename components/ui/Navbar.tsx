"use client";

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

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 supports-[backdrop-filter]:bg-white/60">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-[4.25rem] flex items-center">
        {/* Logo */}
        <div className="w-1/4 flex-shrink-0">
          <Link href="/" className="inline-flex items-center gap-3 group">
            {siteConfig.logoUrl ? (
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.siteName}
                className="w-9 h-9 rounded-xl object-cover"
              />
            ) : (
              <div className="w-9 h-9 bg-[#00498d] rounded-xl flex items-center justify-center shadow-sm shadow-[#00498d]/15">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M10 5h4v4h4v4h-4v4h-4v-4H6v-4h4z" />
                </svg>
              </div>
            )}
            <span className="text-[15px] font-semibold text-gray-900 tracking-tight group-hover:text-[#00498d] transition-colors duration-200">
              {siteConfig.siteName}
            </span>
          </Link>
        </div>

        {/* Menú central */}
        <ul className="hidden lg:flex items-center justify-center gap-0.5 w-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-3 py-2 text-[14px] text-gray-600 rounded-lg hover:text-[#00498d] hover:bg-[#00498d]/[0.04] transition-colors duration-200 font-medium group/link"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#00498d] rounded-full transition-all duration-300 group-hover/link:w-3/4 group-hover/link:left-1/2 group-hover/link:-translate-x-1/2" />
              </Link>
            </li>
          ))}
        </ul>

        {/* UserMenu */}
        <div className="w-1/4 flex justify-end flex-shrink-0">
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}