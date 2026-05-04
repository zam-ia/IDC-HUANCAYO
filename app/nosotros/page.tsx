import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";

export const metadata = {
  title: "Nosotros",
  description:
    "Conoce más sobre la Iglesia Discípulos de Cristo, sede Huancayo. Una familia de fe, amor y transformación.",
};

export default function NosotrosPage() {
  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-24 overflow-hidden">
        {/* Círculos decorativos con blur */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3 block">
            Quiénes somos
          </span>
          <h1 className="text-[2rem] sm:text-[3rem] font-bold text-white tracking-tight mb-4">
            Más que una iglesia, una gran familia
          </h1>
          <p className="text-white/40 text-[17px] max-w-xl mx-auto leading-relaxed font-normal">
            Personas reales, con procesos reales, siguiendo a un Dios real.
          </p>
        </div>
      </section>

      {/* ── Misión y Visión ── */}
      <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00498d]/[0.012] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            {/* Misión */}
            <div className="group bg-white border border-gray-100/80 rounded-2xl p-8 lg:p-10 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/30 hover:-translate-y-1 transition-all duration-500">
              <div className="w-11 h-11 rounded-xl bg-[#00498d]/[0.05] backdrop-blur-sm border border-[#00498d]/[0.06] flex items-center justify-center mb-6 shadow-sm shadow-[#00498d]/[0.03] group-hover:shadow-md group-hover:shadow-[#00498d]/[0.05] group-hover:scale-105 transition-all duration-500">
                <svg
                  className="w-5 h-5 text-[#00498d]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-[1.25rem] font-bold text-gray-800 mb-3 group-hover:text-[#00498d] transition-colors duration-300">
                Nuestra Misión
              </h2>
              <p className="text-[14px] text-gray-500/70 leading-relaxed font-normal">
                Formar discípulos de Cristo comprometidos con su Palabra, que
                vivan en comunidad, sirvan con amor y transformen su entorno con
                el mensaje del Evangelio.
              </p>
            </div>

            {/* Visión */}
            <div className="group bg-white border border-gray-100/80 rounded-2xl p-8 lg:p-10 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/30 hover:-translate-y-1 transition-all duration-500">
              <div className="w-11 h-11 rounded-xl bg-[#00498d]/[0.05] backdrop-blur-sm border border-[#00498d]/[0.06] flex items-center justify-center mb-6 shadow-sm shadow-[#00498d]/[0.03] group-hover:shadow-md group-hover:shadow-[#00498d]/[0.05] group-hover:scale-105 transition-all duration-500">
                <svg
                  className="w-5 h-5 text-[#00498d]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-[1.25rem] font-bold text-gray-800 mb-3 group-hover:text-[#00498d] transition-colors duration-300">
                Nuestra Visión
              </h2>
              <p className="text-[14px] text-gray-500/70 leading-relaxed font-normal">
                Ser una iglesia que impacte Huancayo y Perú con el amor de
                Cristo, formando líderes capacitados que multipliquen el
                discipulado en cada hogar, trabajo y comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="relative py-16 lg:py-20 bg-[#fafbfc] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00498d]/[0.012] blur-3xl translate-y-1/4 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">
              Lo que nos mueve
            </span>
            <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Amor",
                desc: "Todo lo que hacemos está motivado por el amor de Dios, que nos transforma y nos impulsa a amar a otros.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
              {
                title: "Verdad",
                desc: "Creemos en la Biblia como la Palabra inspirada de Dios. Es nuestra guía, nuestra fuente y nuestra autoridad.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                title: "Comunidad",
                desc: "No caminamos solos. Somos una familia donde cada persona es valorada, apoyada y animada a crecer.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: "Servicio",
                desc: "Seguimos el ejemplo de Jesús sirviendo a nuestra ciudad con humildad y entrega.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.701 2.701 0 013 15.546M21 12v.01M3 12v.01M12 3v5m0 4v.01" />
                  </svg>
                ),
              },
            ].map((valor, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-100/80 rounded-2xl p-7 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/30 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00498d]/[0.05] backdrop-blur-sm border border-[#00498d]/[0.06] flex items-center justify-center mb-5 shadow-sm shadow-[#00498d]/[0.03] group-hover:shadow-md group-hover:shadow-[#00498d]/[0.05] group-hover:scale-105 transition-all duration-500 text-[#00498d]/70 group-hover:text-[#00498d]">
                  {valor.icon}
                </div>
                <h3 className="text-[16px] font-semibold text-gray-800 mb-2 group-hover:text-[#00498d] transition-colors duration-300">
                  {valor.title}
                </h3>
                <p className="text-[13px] text-gray-500/70 leading-relaxed font-normal">
                  {valor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-[#00498d]/[0.08] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">
            Da el paso
          </span>
          <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight mb-4">
            ¿Quieres ser parte de esta familia?
          </h2>
          <p className="text-gray-500/70 text-[15px] mb-9 max-w-md mx-auto leading-relaxed font-normal">
            No importa tu historia, tu pasado o tus dudas. Aquí hay un lugar para ti.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2.5 bg-[#00498d] text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group"
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
              className="inline-flex items-center gap-2.5 bg-white border border-gray-200/80 text-[#00498d] px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:border-[#00498d]/30 hover:bg-[#00498d]/[0.02] hover:shadow-md hover:shadow-gray-200/30 transition-all duration-300 group"
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