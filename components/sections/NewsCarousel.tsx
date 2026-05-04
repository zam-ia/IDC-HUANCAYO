"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/css";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  published_at: string;
  slug: string;
  featured_image?: string | null;
}

export default function NewsCarousel({ news }: { news: Post[] }) {
  if (!news || news.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/60 mb-2 block">
              Mantente al día
            </span>
            <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight">
              Lo que está pasando ahora
            </h2>
          </div>
          <Link
            href="/noticias"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#00498d] hover:text-[#003d7a] transition-colors shrink-0"
          >
            Ver todas
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1.1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          speed={600}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 28 },
          }}
        >
          {news.map((item) => {
            const slug = item.slug;
            const href = slug ? `/noticias/${slug}` : "/noticias";
            return (
              <SwiperSlide key={item.id}>
                <Link
                  href={href}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 h-full block"
                >
                  {item.featured_image ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.featured_image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-[#00498d]/[0.06] to-[#00498d]/[0.02] overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#00498d]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <time className="text-[11px] text-gray-600 font-medium">
                      {formatDate(item.published_at)}
                    </time>
                    <h3 className="text-[17px] font-semibold text-gray-900 mt-2 mb-2.5 leading-snug group-hover:text-[#00498d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00498d] group-hover:underline">
                      Leer historia
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00498d]"
          >
            Ver todas las noticias
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}