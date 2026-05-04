"use client";

import { useState, useEffect } from "react";

// Datos de ejemplo (luego se conectarán a Supabase)
const videos = [
  {
    id: "video-1",
    title: "Predicación: ¿Qué significa seguir a Cristo?",
    description: "Pastor Rodríguez · 45 min",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "video-2",
    title: "Testimonio: De la adicción a la libertad",
    description: "Hermano Carlos · 12 min",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "video-3",
    title: "Alabanza: Espontáneo en el Espíritu",
    description: "Ministerio de Música · 22 min",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "video-4",
    title: "Reflexión: El propósito en medio del dolor",
    description: "Pastora Elena · 38 min",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
];

export default function VideoGrid() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  const closeModal = () => setActiveVideo(null);

  return (
    <>
      <section className="relative py-20 lg:py-24 bg-[#fafbfc] overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">
              Contenido
            </span>
            <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight">
              Mira lo que Dios está haciendo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video.youtubeId)}
                className="group relative aspect-video bg-white/80 backdrop-blur-sm border border-gray-100/80 rounded-2xl overflow-hidden hover:bg-white hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00498d]/30"
              >
                {/* Thumbnail de YouTube */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />

                {/* Overlay gradiente sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Efecto de brillo sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ícono de play con vidrio esmerilado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute w-16 h-16 rounded-full bg-white/40 backdrop-blur-md shadow-lg shadow-black/[0.04] group-hover:bg-white/60 group-hover:shadow-xl group-hover:shadow-black/[0.06] transition-all duration-500 -translate-x-1.5 -translate-y-1.5" />
                    <div className="relative w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-md shadow-black/[0.04] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-black/[0.06] transition-all duration-500">
                      <svg
                        className="w-5 h-5 text-[#00498d] ml-0.5 transition-transform duration-500 group-hover:scale-105"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Etiqueta de duración */}
                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-medium px-2.5 py-1 rounded-md">
                  {video.description.split("·")[1]?.trim()}
                </span>

                {/* Info en la parte inferior */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-[13px] font-semibold leading-tight mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-white/60 text-[11px] font-medium">
                    {video.description.split("·")[0]?.trim()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal del Video ── */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/25 hover:scale-105 active:scale-95 shadow-md"
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
              src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}