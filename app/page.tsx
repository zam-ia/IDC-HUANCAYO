import PublicLayout from "@/components/layouts/PublicLayout";
import HeroSlider from "@/components/sections/HeroSlider";
import NewsCarousel from "@/components/sections/NewsCarousel";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import VideoGrid from "@/components/sections/VideoGrid";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/db";

export default async function HomePage() {
  const news = await getPublishedPosts("noticia");

  return (
    <PublicLayout>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO SLIDER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSlider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. NOTICIAS DINÁMICAS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <NewsCarousel news={news} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. VIDEOS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VideoGrid />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. CAMPUS (protagonista)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
        {/* Decoración de fondo con blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00498d]/[0.015] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">
              Formación
            </span>
            <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight mb-3">
              Crece. Aprende. Transforma tu vida.
            </h2>
            <p className="text-gray-500/80 text-[15px] max-w-md mx-auto leading-relaxed font-normal">
              No solo escuches… fórmate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Mockup con sombras y blur */}
            <div className="relative">
              <div className="relative aspect-[4/3] bg-white border border-gray-100/80 rounded-2xl overflow-hidden p-6 flex items-center justify-center shadow-md shadow-gray-200/40 group hover:shadow-lg hover:shadow-gray-200/50 transition-shadow duration-500">
                {/* Fondo con blur */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00498d]/[0.03] via-transparent to-[#00498d]/[0.01]" />
                <div className="relative w-full max-w-sm space-y-4">
                  {/* Barras simuladas de UI */}
                  <div className="h-2.5 bg-[#00498d]/[0.08] rounded-full w-3/4 backdrop-blur-sm" />
                  <div className="h-2.5 bg-[#00498d]/[0.08] rounded-full w-full backdrop-blur-sm" />
                  <div className="h-2.5 bg-[#00498d]/[0.08] rounded-full w-5/6 backdrop-blur-sm" />
                  <div className="h-2.5 bg-[#00498d]/[0.08] rounded-full w-2/3 backdrop-blur-sm" />
                  <div className="h-2.5 bg-[#00498d]/[0.06] rounded-full w-1/2 backdrop-blur-sm" />
                  <div className="flex gap-3 pt-6">
                    <div className="h-3 bg-[#00498d]/[0.15] rounded-full w-20" />
                    <div className="h-3 bg-[#00498d]/[0.08] rounded-full w-16" />
                  </div>
                </div>
              </div>

              {/* Badge flotante con blur */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md border border-gray-100/80 rounded-xl px-4 py-2.5 shadow-lg shadow-gray-200/50 flex items-center gap-2 group-hover:shadow-xl group-hover:shadow-gray-200/60 transition-shadow duration-500">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-30" />
                </div>
                <span className="text-[11px] font-semibold text-gray-600 tracking-wide">
                  En vivo
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div>
              <ul className="space-y-6">
                {[
                  {
                    title: "Cursos bíblicos prácticos",
                    desc: "De la teoría a la vida diaria.",
                  },
                  {
                    title: "Formación espiritual paso a paso",
                    desc: "Un camino claro de crecimiento.",
                  },
                  {
                    title: "Acceso desde cualquier lugar",
                    desc: "Disponible 24/7 en todos tus dispositivos.",
                  },
                  {
                    title: "Comunidad activa",
                    desc: "Aprende y crece con otros.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 group/item">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50/80 backdrop-blur-sm border border-emerald-100/50 flex items-center justify-center mt-0.5 group-hover/item:bg-emerald-50 group-hover/item:border-emerald-200/80 transition-all duration-300 shadow-sm shadow-emerald-100/30">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-gray-800 mb-1 group-hover/item:text-gray-900 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-gray-500/80 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/campus"
                className="mt-9 inline-flex items-center gap-2.5 bg-[#00498d] text-white text-[14px] font-medium px-6 py-3.5 rounded-xl hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group"
              >
                Acceder al Campus
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. TESTIMONIOS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <TestimonialsCarousel />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. DEVOCIONALES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
        {/* Línea decorativa superior con blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00498d]/[0.08] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-2 block">
                Lectura diaria
              </span>
              <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight">
                Alimenta tu espíritu cada día
              </h2>
            </div>
            <Link
              href="/devocionales"
              className="group hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00498d]/70 hover:text-[#00498d] transition-colors duration-300"
            >
              Ver todos
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="group bg-white border border-gray-100/80 rounded-2xl overflow-hidden hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500 cursor-pointer"
              >
                {/* Imagen placeholder con blur */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-[#00498d]/[0.05] via-[#00498d]/[0.02] to-transparent flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-[2px]" />
                  <svg
                    className="relative w-8 h-8 text-[#00498d]/15"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                <div className="p-6">
                  <span className="text-[10px] font-semibold text-[#00498d]/45 uppercase tracking-[0.15em]">
                    Devocional
                  </span>
                  <h3 className="text-[17px] font-semibold text-gray-800 mt-2 mb-2.5 leading-snug group-hover:text-[#00498d] transition-colors duration-300">
                    Título devocional {i}
                  </h3>
                  <p className="text-[13px] text-gray-500/70 leading-relaxed mb-5 line-clamp-2 font-normal">
                    Extracto breve del contenido del devocional que invita a la
                    reflexión diaria...
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#00498d]/60 group-hover:text-[#00498d] group-hover:gap-2 transition-all duration-300">
                    Leer más
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Link móvil */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/devocionales"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00498d]/70 hover:text-[#00498d] transition-colors duration-300"
            >
              Ver todos los devocionales
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. NOSOTROS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 lg:py-24 bg-[#fafbfc] overflow-hidden">
        {/* Círculos decorativos con blur */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00498d]/[0.015] blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00498d]/[0.01] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#00498d]/[0.06] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">
            Quiénes somos
          </span>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold text-gray-900 tracking-tight mb-4">
            Más que una iglesia, una gran familia
          </h2>
          <p className="text-[16px] text-gray-500/70 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            Personas reales, con procesos reales, siguiendo a un Dios real.
          </p>
          <Link
            href="/nosotros"
            className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-[#00498d] border border-gray-200/60 px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-white hover:border-[#00498d]/30 hover:shadow-md hover:shadow-gray-200/40 transition-all duration-300 group"
          >
            Conócenos
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. CTA FINAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#00498d] py-20 lg:py-24 overflow-hidden">
        {/* Patrón decorativo con blur */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 left-10 w-80 h-80 border border-white rounded-full blur-sm" />
          <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] border border-white rounded-full blur-sm" />
          <div className="absolute top-1/2 left-1/3 w-56 h-56 border border-white rounded-full blur-sm" />
        </div>

        {/* Overlay gradiente para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.08] to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3 block">
            Comienza hoy
          </span>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold text-white mb-4 tracking-tight">
            Tu vida puede cambiar hoy
          </h2>
          <p className="text-white/50 text-[16px] mb-10 max-w-md mx-auto leading-relaxed font-normal">
            No necesitas tener todo claro… solo dar el primer paso.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2.5 bg-white text-[#00498d] px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg shadow-black/[0.06] hover:shadow-xl hover:shadow-black/[0.1] hover:-translate-y-0.5 active:translate-y-0 group backdrop-blur-sm"
            >
              Quiero comenzar
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="https://wa.me/+51964909877"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-transparent border border-white/20 text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:border-white/40 hover:bg-white/[0.04] backdrop-blur-sm transition-all duration-300 group"
            >
              Hablar con alguien
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}