"use client";

import { useState, useEffect } from "react";

export default function CampusVSL() {
  const [isOpen, setIsOpen] = useState(false);
  // Reemplaza este ID con el video VSL real de tu iglesia
  const videoId = "dQw4w9WgXcQ";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-24 overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3 block">
            Campus Virtual
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

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 group shadow-lg shadow-black/10"
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            Ver video (2 min)
          </button>
        </div>
      </section>

      {/* Modal del video */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Cerrar video"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Video VSL Campus"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}