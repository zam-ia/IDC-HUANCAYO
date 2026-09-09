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
    <section
      data-motion="static"
      className="relative h-[calc(100svh-4.25rem)] min-h-[560px] max-h-[760px] overflow-hidden bg-gray-950 sm:min-h-[620px] lg:h-[86vh] lg:max-h-[820px]"
    >
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
              className="hero-slide relative h-full bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(7, 16, 30, 0.82), rgba(7, 16, 30, 0.56) 44%, rgba(7, 16, 30, 0.22)), url(${slide.image})`,
                backgroundPosition: slide.position,
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
                <div className="max-w-2xl pt-10 text-white sm:pt-16">
                  <span className="hero-slide__eyebrow mb-4 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:mb-5 sm:text-[11px] sm:tracking-[0.18em]">
                    Iglesia Discípulos de Cristo · Huancayo
                  </span>
                  <h1 className="hero-slide__title text-[clamp(2.25rem,10vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
                    {slide.title}
                  </h1>
                  <p className="hero-slide__copy mt-5 max-w-xl text-[16px] leading-7 text-white/78 sm:mt-6 sm:text-[19px] sm:leading-8">
                    {slide.subtitle}
                  </p>
                  <div className="hero-slide__actions mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap">
                    <Link
                      href={slide.href}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[14px] font-semibold text-[#00498d] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
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
                      className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/35 px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
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
