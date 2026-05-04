"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Miembro desde 2018",
    text: "Llegué rota, sin propósito. Hoy soy líder de discipulado. Dios transformó mi vida por completo en esta casa.",
    initials: "MG",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Líder de jóvenes",
    text: "Encontré una familia que me ayudó a salir adelante. Aquí aprendí que la fe se vive en comunidad.",
    initials: "CM",
  },
  {
    id: 3,
    name: "Lucía Quispe",
    role: "Miembro desde 2020",
    text: "El campus virtual fue clave para mi crecimiento. Estudiaba desde casa y aplicaba cada lección.",
    initials: "LQ",
  },
  {
    id: 4,
    name: "Pedro Huamán",
    role: "Diácono",
    text: "Servir en esta iglesia me enseñó que liderar es amar. Cada día veo vidas siendo restauradas.",
    initials: "PH",
  },
  {
    id: 5,
    name: "Ana López",
    role: "Nueva creyente",
    text: "Mi primer día sentí paz. Hoy, dos años después, estoy bautizada y feliz de pertenecer aquí.",
    initials: "AL",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="py-20 lg:py-24 bg-[#fafbfc]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/60 mb-3 block">
            Impacto real
          </span>
          <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight">
            Historias reales, vidas transformadas
          </h2>
        </div>

        {/* Carrusel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          speed={700}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white border border-gray-100 rounded-2xl p-8 h-full hover:shadow-md hover:shadow-gray-100 transition-shadow duration-300">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#00498d]/[0.08] flex items-center justify-center mb-5">
                  <span className="text-sm font-semibold text-[#00498d]">
                    {t.initials}
                  </span>
                </div>

                {/* Texto */}
                <blockquote className="text-[15px] text-gray-600 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Autor */}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}