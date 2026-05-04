"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Link from "next/link";

// Estilos de Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    title: "No viniste aquí por casualidad",
    subtitle:
      "Dios ya está haciendo algo en tu vida… esto es solo el inicio.",
    cta: "Quiero comenzar",
    href: "/signup",
    gradient: "from-[#001f3f] via-[#00498d] to-[#003366]",
  },
  {
    title: "Un lugar donde tu vida cambia",
    subtitle: "No es religión. Es transformación real.",
    cta: "Ver reunión",
    href: "/nosotros",
    gradient: "from-gray-900 via-gray-800 to-gray-900",
  },
  {
    title: "No estás solo",
    subtitle: "Aquí caminamos juntos, crecemos juntos.",
    cta: "Conectar",
    href: "/testimonios",
    gradient: "from-[#002b5e] via-[#00498d] to-[#003d7a]",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative h-[90vh] min-h-[620px] max-h-[820px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !w-2 !h-2 !bg-white/40 !opacity-100",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-white !w-6 !rounded-full",
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`h-full flex items-center justify-center bg-gradient-to-br ${slide.gradient} relative overflow-hidden`}
            >
              {/* ── Formas geométricas decorativas ── */}
              {/* Círculo superior derecho */}
              <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
              {/* Círculo inferior izquierdo */}
              <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
              {/* Líneas finas diagonales (patrón sutil) */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-0 left-1/4 w-px h-full bg-white rotate-12" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-white rotate-12" />
                <div className="absolute top-0 left-3/4 w-px h-full bg-white rotate-12" />
              </div>

              {/* ── Contenido ── */}
              <div className="relative z-10 text-center text-white max-w-3xl px-6 sm:px-8">
                {/* Etiqueta superior */}
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-6">
                  Iglesia Discípulos de Cristo · Huancayo
                </span>

                <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.75rem] font-bold mb-5 leading-[1.08] tracking-tight">
                  {slide.title}
                </h1>

                <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-lg mx-auto leading-relaxed font-light">
                  {slide.subtitle}
                </p>

                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-white text-[#00498d] font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg shadow-black/[0.08] hover:shadow-xl hover:shadow-black/[0.12] hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  {slide.cta}
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Indicador de scroll ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
          Desliza
        </span>
        <svg
          className="w-4 h-4 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}