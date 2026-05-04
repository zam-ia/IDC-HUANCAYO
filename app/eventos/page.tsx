import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Próximos Eventos",
  description: "Próximos eventos de la Iglesia Discípulos de Cristo, sede Huancayo.",
};

export default async function EventosPage() {
  const eventos = await getPublishedPosts("noticia");

  // Filtrar eventos (los que tienen categoría "Evento")
  const soloEventos = eventos.filter((e: any) => e.category === "Evento");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Extraer fecha y hora del contenido o usar valores por defecto
  const extractEventInfo = (evento: any) => {
    const date = evento.published_at ? formatDate(evento.published_at) : "Fecha por confirmar";
    const time = evento.published_at ? formatTime(evento.published_at) : "Hora por confirmar";
    const location = evento.metadata?.location || "IDC Huancayo";
    return { date, time, location };
  };

  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section className="relative bg-white border-b border-gray-100/80 overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00498d]/[0.03] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00498d]/[0.02] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.06] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00498d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/60">
                Agenda
              </span>
            </div>
            <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-gray-900 tracking-tight mb-3">
              Próximos Eventos
            </h1>
            <p className="text-[16px] text-gray-500/70 leading-relaxed font-normal">
              No te pierdas lo que Dios está haciendo en nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* ── Grid de eventos ── */}
      <section className="py-16 lg:py-20 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {soloEventos.length > 0 ? (
            <>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-2 block">
                    Próximamente
                  </span>
                  <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight">
                    No te los pierdas
                  </h2>
                </div>
                <span className="text-[12px] text-gray-400 font-medium">
                  {soloEventos.length} evento{soloEventos.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {soloEventos.map((evento: any) => {
                  const { date, time, location } = extractEventInfo(evento);
                  return (
                    <article
                      key={evento.id}
                      className="group bg-white border border-gray-100/80 rounded-2xl overflow-hidden hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-500 flex flex-col"
                    >
                      {/* Imagen del evento */}
                      {evento.featured_image ? (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={evento.featured_image}
                            alt={evento.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                          {evento.is_featured && (
                            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-[0.1em] bg-amber-50/90 backdrop-blur-sm text-amber-700 px-2.5 py-1 rounded-lg border border-amber-200/60 shadow-sm">
                              ★ Destacado
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="relative aspect-[16/10] bg-gradient-to-br from-[#f0f4f8] via-[#fafbfc] to-[#f0f4f8] flex items-center justify-center overflow-hidden border-b border-gray-100/60">
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-3">
                              <svg className="w-8 h-8 text-[#00498d]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#00498d]/30">
                              {evento.category || "Evento"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Información del evento */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Badge de categoría */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] bg-[#00498d]/[0.05] text-[#00498d] px-2.5 py-1 rounded-md border border-[#00498d]/[0.08]">
                            {evento.category || "Evento"}
                          </span>
                        </div>

                        {/* Título */}
                        <h3 className="text-[17px] font-semibold text-gray-800 mb-3 leading-snug group-hover:text-[#00498d] transition-colors duration-300">
                          {evento.title}
                        </h3>

                        {/* Descripción */}
                        <p className="text-[13px] text-gray-500/70 leading-relaxed mb-5 line-clamp-3 font-normal flex-1">
                          {evento.excerpt || "Más información próximamente..."}
                        </p>

                        {/* Detalles del evento */}
                        <div className="space-y-3 mb-5 pt-4 border-t border-gray-100/80">
                          {/* Fecha */}
                          <div className="flex items-center gap-3 text-[12px] text-gray-600">
                            <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.05] flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-[#00498d]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="font-medium capitalize">{date}</span>
                          </div>

                          {/* Hora */}
                          <div className="flex items-center gap-3 text-[12px] text-gray-600">
                            <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.05] flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-[#00498d]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="font-medium">{time}</span>
                          </div>

                          {/* Ubicación */}
                          <div className="flex items-center gap-3 text-[12px] text-gray-600">
                            <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.05] flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-[#00498d]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <span className="font-medium">{location}</span>
                          </div>
                        </div>

                        {/* Botón de acción */}
                        <Link
                          href={`/noticias/${evento.slug}`}
                          className="inline-flex items-center justify-center gap-2 w-full bg-[#00498d] text-white text-[13px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group"
                        >
                          Ver evento
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-[#00498d]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[1.1rem] font-bold text-gray-700 mb-2">
                No hay eventos programados aún
              </h3>
              <p className="text-[14px] text-gray-500/70 max-w-md mx-auto leading-relaxed font-normal">
                Estamos preparando nuevas actividades para la comunidad. ¡Vuelve pronto para conocerlas!
              </p>
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 mt-6 text-[14px] font-medium text-[#00498d] hover:text-[#003d7a] transition-colors"
              >
                Ver noticias
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}