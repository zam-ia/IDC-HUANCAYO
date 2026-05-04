"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin = (session?.user as any)?.role === "admin";

  const tabs = [
    { label: "Aula", href: "/campus/classroom" },
    { label: "Calendario", href: "/campus/calendar" },
    { label: "Miembros", href: "/campus/members" },
    { label: "Tabla", href: "/campus/leaderboard" },
    { label: "Acerca de", href: "/campus" },
    ...(isAdmin ? [{ label: "Admin", href: "/admin" }] : []),
  ];

  const isActive = (href: string) => {
    if (href === "/campus") return pathname === "/campus";
    return pathname.startsWith(href);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* ── Top Bar fija ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fila superior: logo, búsqueda, acciones */}
          <div className="h-[4.25rem] flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/campus"
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="w-9 h-9 bg-[#00498d] rounded-xl flex items-center justify-center shadow-sm shadow-[#00498d]/20 transition-shadow group-hover:shadow-md group-hover:shadow-[#00498d]/25">
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
              <span className="text-[15px] font-bold text-gray-900 tracking-tight group-hover:text-[#00498d] transition-colors duration-200">
                IDC Huancayo
              </span>
            </Link>

            {/* Buscador (escritorio) */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="w-full relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar cursos, lecciones..."
                  className="w-full bg-gray-100/80 border border-gray-200/60 rounded-xl py-2 pl-10 pr-4 text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#00498d]/30 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300"
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Chat */}
              <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>

              {/* Notificaciones */}
              <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm shadow-red-500/30">
                  8
                </span>
              </button>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-[#00498d] flex items-center justify-center text-white text-[13px] font-semibold shadow-sm shadow-[#00498d]/25 ml-1">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Botón Sitio web */}
              <Link
                href="/"
                className="ml-1 px-3 py-2 text-[13px] font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-100/80 rounded-xl transition-all duration-200 flex items-center gap-1.5"
                title="Ir al sitio web principal"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Sitio web
              </Link>

              {/* Botón Salir */}
              <button
                onClick={handleSignOut}
                className="px-3 py-2 text-[13px] font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-100/80 rounded-xl transition-all duration-200 flex items-center gap-1.5"
                title="Cerrar sesión"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Salir
              </button>
            </div>
          </div>

          {/* ── Navegación por tabs ── */}
          <nav className="flex items-center gap-0.5 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative px-4 py-2.5 text-[13px] font-medium whitespace-nowrap rounded-t-lg transition-all duration-300 ${
                  isActive(tab.href)
                    ? "text-[#00498d] bg-[#00498d]/[0.04]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                }`}
              >
                {tab.label}
                {/* Indicador activo */}
                {isActive(tab.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2.5px] bg-[#00498d] rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Contenido principal ── */}
      <main className="relative">
        {/* Fondo decorativo sutil */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00498d]/[0.015] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />

        <div className="relative">{children}</div>
      </main>
    </div>
  );
}