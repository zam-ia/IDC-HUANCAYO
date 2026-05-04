import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";

const cursosDestacados = [
  {
    id: 1,
    title: "Discipulado Nivel 1",
    subtitle: "Fundamentos de la vida cristiana",
    description:
      "8 semanas para establecer las bases de tu fe: oración, Palabra, bautismo y misión. Ideal para nuevos creyentes.",
    duration: "8 semanas",
    lessons: 16,
    level: "Básico · Gratuito",
    color: "from-emerald-500 to-teal-600",
    slug: "discipulado-1",
  },
  {
    id: 2,
    title: "Discipulado Nivel 2",
    subtitle: "Profundiza tu relación con Dios",
    description:
      "12 semanas de crecimiento intensivo: intimidad con Dios, desarrollo de dones espirituales y carácter cristiano.",
    duration: "12 semanas",
    lessons: 24,
    level: "Intermedio · $9.99/mes",
    color: "from-blue-500 to-indigo-600",
    slug: "discipulado-2",
  },
  {
    id: 3,
    title: "Liderazgo con Propósito",
    subtitle: "Formación de líderes",
    description:
      "10 semanas para aprender a liderar con integridad, sabiduría y un corazón conforme al de Dios. Certificación oficial.",
    duration: "10 semanas",
    lessons: 20,
    level: "Avanzado · $197",
    color: "from-purple-500 to-violet-600",
    slug: "liderazgo",
  },
];

export const metadata = {
  title: "Enseñanza Bíblica",
  description:
    "Descubre nuestro programa de formación espiritual. De estar perdido a tener propósito.",
};

export default function CursosPage() {
  return (
    <PublicLayout>
      {/* ── HERO VSL ── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3 block">
            Enseñanza Bíblica
          </span>
          <h1 className="text-[2rem] sm:text-[3rem] font-bold text-white mb-4 tracking-tight leading-tight">
            No necesitas más información…
            <br />
            <span className="text-white/80">necesitas transformación</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Muchos vienen a la iglesia pero siguen igual. No es falta de fe, es
            falta de proceso. Descubre el camino claro para crecer de verdad.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-[#00498d] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg group text-[15px]"
            >
              Comenzar ahora
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/[0.06] transition-all group text-[15px]"
            >
              Ya tengo cuenta
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── RUTA ── */}
      <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00498d]/[0.015] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">
              Tu camino
            </span>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold text-gray-900 tracking-tight mb-4">
              Tu crecimiento no es al azar… es un proceso
            </h2>
            <p className="text-gray-500/80 text-[16px] max-w-lg mx-auto leading-relaxed">
              Deja de dar vueltas. Sigue una ruta clara de transformación espiritual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Inicio", subtitle: "Discipulado Nivel 1", desc: "Fundamentos de la fe." },
              { step: "2", title: "Crecimiento", subtitle: "Discipulado Nivel 2", desc: "Intimidad con Dios." },
              { step: "3", title: "Propósito", subtitle: "Liderazgo", desc: "Lidera con integridad." },
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#00498d]/[0.06] border border-[#00498d]/10 flex items-center justify-center text-2xl font-bold text-[#00498d] mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  {item.step}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{item.title}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.subtitle}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURSOS DESTACADOS ── */}
      <section className="relative py-20 lg:py-24 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">
              Empieza aquí
            </span>
            <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight mb-3">
              Elige tu punto de partida
            </h2>
            <p className="text-gray-500/80 text-[15px] max-w-md mx-auto">
              Tres cursos esenciales para cada etapa de tu vida espiritual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cursosDestacados.map((curso) => (
              <article
                key={curso.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500 flex flex-col"
              >
                <div className={`bg-gradient-to-br ${curso.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {curso.level}
                    </span>
                    <h3 className="text-lg font-bold mt-3 mb-1">{curso.title}</h3>
                    <p className="text-white/70 text-sm">{curso.subtitle}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{curso.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                    <span>{curso.duration}</span>
                    <span>{curso.lessons} lecciones</span>
                  </div>
                  <Link
                    href={`/campus/classroom/${curso.slug}`}
                    className="mt-auto inline-flex items-center gap-2 bg-[#00498d] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#003d7a] transition-all group/btn"
                  >
                    Ver curso
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative bg-[#00498d] py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 left-10 w-80 h-80 border border-white rounded-full blur-sm" />
          <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] border border-white rounded-full blur-sm" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
          <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">El primer paso es inscribirte. Luego accederás a todas las lecciones desde tu aula virtual.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-[#00498d] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all group"
          >
            Crear cuenta gratuita
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}