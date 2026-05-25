"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSiteConfig } from "@/components/SiteConfigProvider";

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const siteConfig = useSiteConfig();
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const role = session?.user?.role || "miembro";
  const isAdmin = role === "admin";
  const displayName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Usuario";
  const avatarUrl = session?.user?.image || null;

  const tabs = [
    { label: "Aula", href: "/campus/classroom" },
    { label: "Calendario", href: "/campus/calendar" },
    { label: "Acerca de", href: "/campus" },
    ...(isAdmin ? [{ label: "Panel admin", href: "/admin" }] : []),
  ];

  const isActive = (href: string) => {
    if (href === "/campus") return pathname === "/campus";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <Link
              href="/campus/classroom"
              className="flex min-w-0 items-center gap-3"
            >
              {siteConfig.logoUrl ? (
                <img
                  src={siteConfig.logoUrl}
                  alt={siteConfig.siteName}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00498d] text-white shadow-sm shadow-[#00498d]/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M10 5h4v4h4v4h-4v4h-4v-4H6v-4h4z" />
                  </svg>
                </div>
              )}
              <div className="min-w-0">
                <span className="block truncate text-[15px] font-bold tracking-tight text-gray-900">
                  {siteConfig.siteName || "IDC Huancayo"}
                </span>
                <span className="hidden text-[11px] font-medium text-gray-400 sm:block">
                  Campus virtual
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNotificationsOpen((value) => !value)}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50"
                aria-label="Ver notificaciones"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.7}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white py-1.5 pl-1.5 pr-3 text-left transition hover:border-gray-300 hover:bg-gray-50"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-8 w-8 rounded-md object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#00498d] text-[13px] font-semibold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden min-w-0 sm:block">
                    <span className="block max-w-36 truncate text-[13px] font-semibold text-gray-800">
                      {displayName}
                    </span>
                    <span className="block text-[11px] capitalize text-gray-400">
                      {isAdmin ? "Administrador" : "Estudiante"}
                    </span>
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-20 cursor-default"
                      onClick={() => setUserMenuOpen(false)}
                      aria-label="Cerrar menú"
                    />
                    <div className="absolute right-0 top-12 z-30 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
                      <div className="border-b border-gray-100 p-4">
                        <p className="truncate text-[13px] font-semibold text-gray-900">
                          {displayName}
                        </p>
                        <p className="truncate text-[12px] text-gray-500">
                          {session?.user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/campus/classroom"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Aula virtual
                        </Link>
                        <Link
                          href="/campus/calendar"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Calendario
                        </Link>
                        <Link
                          href="/campus/profile"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Mi perfil
                        </Link>
                        {isAdmin && (
                          <>
                            <Link
                              href="/campus/classroom?view=student"
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Vista estudiante
                            </Link>
                            <Link
                              href="/admin"
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Panel de administración
                            </Link>
                            <Link
                              href="/admin/alumnos"
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Usuarios y accesos
                            </Link>
                          </>
                        )}
                        <Link
                          href="/"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Sitio web
                        </Link>
                        <button
                          type="button"
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-red-600 hover:bg-red-50"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative rounded-t-lg px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition ${
                  isActive(tab.href)
                    ? "bg-[#00498d]/[0.05] text-[#00498d]"
                    : "text-gray-500 hover:bg-gray-100/70 hover:text-gray-800"
                }`}
              >
                {tab.label}
                {isActive(tab.href) && (
                  <span className="absolute bottom-0 left-1/2 h-[2.5px] w-3/4 -translate-x-1/2 rounded-full bg-[#00498d]" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {notificationsOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-20 cursor-default"
              onClick={() => setNotificationsOpen(false)}
              aria-label="Cerrar notificaciones"
            />
            <div className="absolute right-4 top-[4.75rem] z-30 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-gray-200 bg-white p-4 shadow-xl shadow-gray-900/10 sm:right-6 lg:right-[calc((100vw-80rem)/2+2rem)]">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] font-semibold text-gray-900">
                  Notificaciones
                </p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                  0 nuevas
                </span>
              </div>
              <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-4 text-center text-[13px] text-gray-500">
                No tienes notificaciones pendientes.
              </p>
            </div>
          </>
        )}
      </header>

      <main className="relative">{children}</main>
    </div>
  );
}
