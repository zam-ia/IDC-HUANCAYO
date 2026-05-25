"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    title: "Un lugar para crecer en fe y comunidad",
    subtitle:
      "Acompañamos a personas y familias con enseñanza bíblica, oración y cuidado pastoral.",
    cta: "Conocer la iglesia",
    href: "/nosotros",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1800&q=80",
    position: "center",
  },
  {
    title: "Formación bíblica para la vida diaria",
    subtitle:
      "Cursos, devocionales y recursos pensados para aprender con claridad y aplicar con propósito.",
    cta: "Ver enseñanza",
    href: "/cursos",
    image:
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1800&q=80",
    position: "center",
  },
  {
    title: "No camines solo",
    subtitle:
      "Conecta con una comunidad cercana en Huancayo y encuentra un espacio para empezar de nuevo.",
    cta: "Conectar",
    href: "/testimonios",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80",
    position: "center",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative min-h-[640px] h-[86vh] max-h-[820px] overflow-hidden bg-gray-950">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        loop
        speed={900}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !w-2 !h-2 !bg-white/45 !opacity-100",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-white !w-7 !rounded-full",
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className="relative h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(7, 16, 30, 0.82), rgba(7, 16, 30, 0.56) 44%, rgba(7, 16, 30, 0.22)), url(${slide.image})`,
                backgroundPosition: slide.position,
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
                <div className="max-w-2xl pt-16 text-white">
                  <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    Iglesia Discípulos de Cristo · Huancayo
                  </span>
                  <h1 className="text-[2.6rem] font-bold leading-[1.07] tracking-tight sm:text-5xl lg:text-[4rem]">
                    {slide.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-[17px] leading-8 text-white/78 sm:text-[19px]">
                    {slide.subtitle}
                  </p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[14px] font-semibold text-[#00498d] shadow-sm transition hover:bg-gray-100"
                    >
                      {slide.cta}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
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
                      href="/campus"
                      className="inline-flex items-center rounded-lg border border-white/35 px-6 py-3 text-[14px] font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
                    >
                      Ir al campus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
