import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Panel de Administración",
  description: "Gestiona el contenido de IDC Huancayo y el Campus Virtual",
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "admin") redirect("/campus");

  const webSections = [
    {
      title: "Noticias",
      description: "Crea, edita o elimina noticias de la iglesia.",
      href: "/admin/noticias",
      badge: "Web",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      title: "Devocionales",
      description: "Administra los devocionales diarios.",
      href: "/admin/devocionales",
      badge: "Web",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Testimonios",
      description: "Gestiona los testimonios de la comunidad.",
      href: "/admin/testimonios",
      badge: "Web",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
    {
      title: "Enseñanza Bíblica",
      description: "Configura la landing de cursos y la VSL.",
      href: "/admin/ensenanza",
      badge: "Web",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Nosotros",
      description: "Edita la misión, visión y valores de la iglesia.",
      href: "/admin/nosotros",
      badge: "Web",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Configuración",
      description: "Cambia el logo, nombre, colores y más.",
      href: "/admin/configuracion",
      badge: "Sistema",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const campusSections = [
    {
      title: "Cursos (Classroom)",
      description: "Gestiona los módulos y lecciones del aula virtual.",
      href: "/campus/classroom",
      badge: "Campus",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      title: "Alumnos",
      description: "Administra usuarios, roles y accesos.",
      href: "/admin/alumnos",
      badge: "Campus",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Certificados",
      description: "Gestiona la emisión de certificados.",
      href: "/admin/certificados",
      badge: "Campus",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Configuración Campus",
      description: "Ajustes generales del aula virtual.",
      href: "/admin/configuracion-campus",
      badge: "Sistema",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const quickStats = [
    { label: "Noticias", value: "—", icon: "📰" },
    { label: "Devocionales", value: "—", icon: "📖" },
    { label: "Testimonios", value: "—", icon: "💬" },
    { label: "Cursos", value: "—", icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#00498d]/[0.025] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#00498d]/[0.015] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-emerald-500/[0.015] blur-3xl pointer-events-none" />
      {/* Textura sutil */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.012] mix-blend-soft-light pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mb-2">
          <Link href="/campus" className="hover:text-[#00498d] transition-colors">
            Campus
          </Link>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-500">Panel Admin</span>
        </div>

        {/* Cabecera principal */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00498d] flex items-center justify-center shadow-md shadow-[#00498d]/25">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-[1.75rem] sm:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight">
                  Panel de Administración
                </h1>
                <p className="text-[14px] text-gray-500/70 mt-1 font-normal">
                  Gestiona el contenido de tu sitio web y campus virtual
                </p>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 bg-white border border-gray-200/80 px-3.5 py-2 rounded-xl hover:bg-[#fafbfc] hover:border-gray-300 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ver sitio
              </Link>
              <Link
                href="/campus"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#00498d]/60 hover:text-[#00498d] transition-colors group"
              >
                <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver al campus
              </Link>
            </div>
          </div>
        </div>

        {/* ── Sección: Gestión del Sitio Web ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#00498d]/[0.08] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#00498d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h2 className="text-[1.1rem] font-bold text-gray-800 tracking-tight">
                Gestión del Sitio Web
              </h2>
              <p className="text-[12px] text-gray-500/70 font-normal">
                Contenido público de la iglesia
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {webSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-white border border-gray-100/80 rounded-2xl p-6 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#00498d]/[0.06] flex items-center justify-center text-[#00498d] group-hover:bg-[#00498d] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#00498d]/25 transition-all duration-300">
                    {section.icon}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.1em] border px-2.5 py-1 rounded-md ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-gray-800 mb-1.5 group-hover:text-[#00498d] transition-colors duration-300">
                  {section.title}
                </h3>
                <p className="text-[12px] text-gray-500/70 leading-relaxed font-normal">
                  {section.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#00498d]/50 group-hover:text-[#00498d] transition-colors duration-300">
                    Administrar
                  </span>
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00498d] group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Sección: Gestión del Campus Virtual ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h2 className="text-[1.1rem] font-bold text-gray-800 tracking-tight">
                Gestión del Campus Virtual
              </h2>
              <p className="text-[12px] text-gray-500/70 font-normal">
                Aula virtual y formación
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {campusSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-white border border-gray-100/80 rounded-2xl p-6 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-500/25 transition-all duration-300">
                    {section.icon}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.1em] border px-2.5 py-1 rounded-md ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-gray-800 mb-1.5 group-hover:text-emerald-600 transition-colors duration-300">
                  {section.title}
                </h3>
                <p className="text-[12px] text-gray-500/70 leading-relaxed font-normal">
                  {section.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-400 group-hover:text-emerald-600 transition-colors duration-300">
                    Administrar
                  </span>
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Resumen rápido ── */}
        <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-sm shadow-gray-200/20">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-[13px] font-semibold text-gray-700">
              Resumen rápido
            </span>
            <span className="text-[10px] text-gray-400 font-medium bg-gray-100/80 px-2 py-0.5 rounded-md">
              Próximamente
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-[#fafbfc] border border-gray-100/60">
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <span className="text-[1.25rem] font-bold text-gray-300 block">—</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}