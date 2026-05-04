import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Noticias",
  description:
    "Mantente al día con las últimas noticias y eventos de la Iglesia Discípulos de Cristo, sede Huancayo.",
};

export default async function NoticiasPage() {
  const noticias = await getPublishedPosts("noticia");

  // Separar la noticia destacada del resto
  const featuredPost = noticias.find((p: any) => p.is_featured) || null;
  const remainingPosts = featuredPost
    ? noticias.filter((p: any) => p.id !== featuredPost.id)
    : noticias;

  const categories = ["Todos", "Evento", "Testimonio", "Servicio", "Comunidad", "Anuncio"];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section className="relative bg-white border-b border-gray-100/80 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00498d]/[0.03] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00498d]/[0.02] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.06] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00498d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/60">
                Actualidad
              </span>
            </div>
            <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-gray-900 tracking-tight mb-3">
              Noticias
            </h1>
            <p className="text-[16px] text-gray-500/70 leading-relaxed font-normal">
              Lo que está pasando en nuestra comunidad de fe.
            </p>
          </div>
        </div>
      </section>

      {/* ── Noticia destacada (si existe) ── */}
      {featuredPost && (
        <section className="relative bg-[#fafbfc] border-b border-gray-100/80 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Imagen */}
              <div className="relative">
                {featuredPost.featured_image ? (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-gray-200/40 border border-gray-100/80">
                    <img
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f0f4f8] via-[#fafbfc] to-[#f0f4f8] border border-gray-100/80 flex items-center justify-center shadow-sm shadow-gray-200/20">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-3">
                        <svg className="w-10 h-10 text-[#00498d]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-[13px] font-medium">{featuredPost.title}</p>
                    </div>
                  </div>
                )}
                <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.12em] bg-amber-50/90 backdrop-blur-sm text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200/60 shadow-sm">
                  ★ Destacada
                </span>
              </div>

              {/* Texto */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] bg-[#00498d]/[0.06] text-[#00498d] px-3 py-1.5 rounded-lg border border-[#00498d]/[0.08]">
                    {featuredPost.category || "Noticia"}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {formatDate(featuredPost.published_at)}
                  </span>
                </div>
                <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold text-gray-900 tracking-tight leading-[1.15] mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-[14px] text-gray-500/70 leading-relaxed mb-6 font-normal line-clamp-3">
                  {featuredPost.excerpt || "Descubre lo que está sucediendo en nuestra comunidad."}
                </p>
                <Link
                  href={featuredPost.slug ? `/noticias/${featuredPost.slug}` : "/noticias"}
                  className="inline-flex items-center gap-2.5 bg-[#00498d] text-white px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  Leer historia destacada
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Filtros ── */}
      <section className="py-6 bg-white border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`text-[12px] font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                  cat === "Todos"
                    ? "bg-[#00498d] text-white shadow-sm shadow-[#00498d]/15"
                    : "bg-white text-gray-500 border border-gray-200/80 hover:bg-[#fafbfc] hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid de noticias ── */}
      <section className="py-16 lg:py-20 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-2 block">
                Todas las noticias
              </span>
              <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight">
                Mantente informado
              </h2>
            </div>
            <span className="text-[12px] text-gray-400 font-medium">
              {remainingPosts.length} noticia{remainingPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {remainingPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {remainingPosts.map((noticia: any) => {
                const slug = noticia.slug;
                const href = slug ? `/noticias/${slug}` : "/noticias";
                return (
                  <Link
                    key={noticia.id}
                    href={href}
                    className="group bg-white border border-gray-100/80 rounded-2xl overflow-hidden hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-500 block"
                  >
                    {noticia.featured_image ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={noticia.featured_image}
                          alt={noticia.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/90 backdrop-blur-sm text-[#00498d] px-2.5 py-1 rounded-lg shadow-sm shadow-gray-200/30">
                          {noticia.category || "Noticia"}
                        </span>
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#f0f4f8] via-[#fafbfc] to-[#f0f4f8] flex items-center justify-center overflow-hidden border-b border-gray-100/60">
                        <svg className="w-12 h-12 text-[#00498d]/8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-6">
                      <time className="text-[11px] text-gray-400 font-medium">
                        {formatDate(noticia.published_at)}
                      </time>
                      <h3 className="text-[16px] font-semibold text-gray-800 mt-2 mb-2.5 leading-snug group-hover:text-[#00498d] transition-colors duration-300 line-clamp-2">
                        {noticia.title}
                      </h3>
                      <p className="text-[13px] text-gray-500/70 leading-relaxed mb-5 line-clamp-2 font-normal">
                        {noticia.excerpt || "Sin extracto disponible."}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00498d]/60 group-hover:text-[#00498d] group-hover:gap-2 transition-all duration-300">
                        Leer historia
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#00498d]/25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-700 mb-2">No hay noticias aún</h3>
              <p className="text-[13px] text-gray-500/70 font-normal">Las noticias publicadas aparecerán aquí.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}