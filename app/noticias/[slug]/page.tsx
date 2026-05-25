import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";
import { getPostBySlug, getPublishedPosts } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Noticia no encontrada" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.featured_image ? [post.featured_image] : [],
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

export default async function NoticiaDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getPublishedPosts("noticia");
  const filteredRelated = relatedPosts
    .filter((p: any) => p.id !== post.id)
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const gallery = (post.gallery as string[]) || [];
  const shareEncodedUrl = encodeURIComponent(`https://idchhuancayo.org/noticias/${post.slug}`);
  const shareEncodedTitle = encodeURIComponent(post.title);

  return (
    <PublicLayout>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mb-8 flex-wrap">
          <Link href="/" className="hover:text-[#00498d] transition-colors duration-200">Inicio</Link>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/noticias" className="hover:text-[#00498d] transition-colors duration-200">Noticias</Link>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-500 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* ── Cabecera ── */}
        <header className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] bg-[#00498d]/[0.06] text-[#00498d] px-3 py-1.5 rounded-lg border border-[#00498d]/[0.08]">
              {post.category || "Noticia"}
            </span>
            {post.is_featured && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200/60">
                Destacada
              </span>
            )}
          </div>
          <h1 className="text-[2rem] sm:text-[2.75rem] font-bold text-gray-900 tracking-tight leading-[1.12] mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[14px] text-gray-500">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00498d]/[0.05] border border-[#00498d]/[0.08] flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#00498d]/[0.04]">
                <svg className="w-4 h-4 text-[#00498d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <time dateTime={post.published_at} className="font-medium text-gray-600">{formatDate(post.published_at)}</time>
            </div>
          </div>
        </header>

        {/* ── Imagen destacada ── */}
        {post.featured_image ? (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-lg shadow-gray-200/40 ring-1 ring-gray-100/80">
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-[#f0f4f8] via-[#fafbfc] to-[#f0f4f8] flex items-center justify-center border border-gray-100/80 shadow-sm shadow-gray-200/20">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#00498d]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-400 text-[13px] font-medium">{post.title}</p>
            </div>
          </div>
        )}

        {/* ── Contenido ── */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12
            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-[1.5rem] prose-h2:mt-10 prose-h2:mb-5
            prose-h3:text-[1.25rem] prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-[16px] prose-p:leading-[1.8]
            prose-a:text-[#00498d] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-img:rounded-xl prose-img:shadow-md
            prose-video:rounded-xl prose-video:shadow-md
            prose-iframe:rounded-xl prose-iframe:shadow-md prose-iframe:w-full prose-iframe:aspect-video
            prose-blockquote:border-l-[3px] prose-blockquote:border-[#00498d]/30 prose-blockquote:bg-[#fafbfc] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-600
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-code:bg-[#fafbfc] prose-code:text-[#00498d] prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-[13px] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── Galería de imágenes ── */}
        {gallery.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.06] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00498d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-[1.25rem] font-bold text-gray-900 tracking-tight">Así se vivió</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((url: string, i: number) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="group block aspect-[4/3] rounded-xl overflow-hidden border border-gray-100/80 shadow-sm shadow-gray-200/30 hover:shadow-lg hover:shadow-gray-200/40 hover:-translate-y-0.5 transition-all duration-300">
                  <img src={url} alt={`Galería ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Video ── */}
        {post.video_url && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.06] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00498d]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
              <h2 className="text-[1.25rem] font-bold text-gray-900 tracking-tight">Revive el momento</h2>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg shadow-gray-200/40 border border-gray-100/80">
              <iframe src={post.video_url} title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
            </div>
          </section>
        )}

        {/* ── Frase destacada ── */}
        <blockquote className="relative my-14 py-10 px-8 bg-[#fafbfc] border border-gray-100/80 rounded-2xl text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-[#00498d]/20 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-[#00498d]/20 to-transparent" />
          <svg className="w-8 h-8 text-[#00498d]/[0.06] mx-auto mb-4 rotate-180" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.224 11 15c0 1.933-1.567 3.5-3.5 3.5-1.239 0-2.259-.611-2.917-1.179z" />
          </svg>
          <p className="text-[1.25rem] sm:text-[1.5rem] font-bold text-gray-800 leading-snug italic">
            &ldquo;Dios sigue transformando vidas hoy&rdquo;
          </p>
          <p className="text-gray-400 mt-3 text-[13px] font-medium">— IDC Huancayo</p>
        </blockquote>

        {/* ── CTA interno ── */}
        <div className="bg-white border border-gray-100/80 rounded-2xl p-8 sm:p-10 text-center mb-12 shadow-sm shadow-gray-200/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#00498d]/[0.02] blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-[#00498d]/[0.06] flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-[#00498d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-[1.25rem] font-bold text-gray-900 mb-2">¿Quieres vivir esto?</h3>
            <p className="text-gray-500/70 text-[14px] mb-7 max-w-md mx-auto leading-relaxed">No te pierdas nuestros próximos eventos. Únete a nuestra comunidad.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/eventos" className="inline-flex items-center gap-2 bg-[#00498d] text-white px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group">
                Ver próximos eventos
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/nosotros" className="inline-flex items-center gap-2 bg-white text-[#00498d] border border-gray-200/80 px-6 py-3 rounded-xl text-[14px] font-semibold hover:border-[#00498d]/30 hover:bg-[#00498d]/[0.02] hover:shadow-sm transition-all duration-300 group">
                Visítanos
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Separador ── */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">IDC Huancayo</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* ── Compartir + Volver ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 mb-12">
          <Link href="/noticias" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#00498d] hover:text-[#003d7a] transition-colors group">
            <div className="w-9 h-9 rounded-lg bg-[#00498d]/[0.06] flex items-center justify-center group-hover:bg-[#00498d]/[0.1] transition-colors shadow-sm shadow-[#00498d]/[0.04]">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </div>
            Volver a noticias
          </Link>

          {/* Botones de compartir (versión servidor con <a>) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-400 font-medium mr-1">Compartir:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareEncodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-[#00498d] hover:border-[#00498d]/30 hover:bg-[#00498d]/[0.04] transition-all duration-200" title="Facebook">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href={`https://wa.me/?text=${shareEncodedTitle}%20${shareEncodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-[#00498d] hover:border-[#00498d]/30 hover:bg-[#00498d]/[0.04] transition-all duration-200" title="WhatsApp">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
          </div>
        </div>

        {/* ── Noticias relacionadas ── */}
        {filteredRelated.length > 0 && (
          <section className="border-t border-gray-100/80 pt-14">
            <div className="mb-8">
              <h2 className="text-[1.5rem] font-bold text-gray-900 tracking-tight mb-2">También te puede interesar</h2>
              <p className="text-[14px] text-gray-500/70 font-normal">Descubre más historias de nuestra comunidad</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredRelated.map((rel: any) => {
                const relSlug = rel.slug;
                const href = relSlug ? `/noticias/${relSlug}` : "/noticias";
                return (
                  <Link
                    key={rel.id}
                    href={href}
                    className="group bg-white border border-gray-100/80 rounded-2xl overflow-hidden hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-500 block"
                  >
                    {rel.featured_image ? (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img src={rel.featured_image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/90 backdrop-blur-sm text-[#00498d] px-2.5 py-1 rounded-lg shadow-sm shadow-gray-200/30">
                          {rel.category || "Noticia"}
                        </span>
                      </div>
                    ) : (
                      <div className="relative aspect-[16/9] bg-gradient-to-br from-[#00498d]/[0.04] to-[#00498d]/[0.01] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 backdrop-blur-[2px]" />
                        <svg className="relative w-12 h-12 text-[#00498d]/8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      </div>
                    )}
                    <div className="p-5">
                      <time className="text-[11px] text-gray-400 font-medium">{formatDate(rel.published_at)}</time>
                      <h3 className="text-[15px] font-semibold text-gray-800 mt-2 mb-2.5 leading-snug group-hover:text-[#00498d] transition-colors duration-300 line-clamp-2">{rel.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00498d]/60 group-hover:text-[#00498d] group-hover:gap-2 transition-all duration-300">
                        Leer historia
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── CTA final ── */}
        <div className="mt-16 bg-white border border-gray-100/80 rounded-2xl p-10 sm:p-12 text-center shadow-sm shadow-gray-200/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00498d]/[0.025] blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#00498d]/[0.015] blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-[#00498d] flex items-center justify-center mx-auto mb-6 shadow-md shadow-[#00498d]/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 5h4v4h4v4h-4v4h-4v-4H6v-4h4z" /></svg>
            </div>
            <h2 className="text-[1.5rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight mb-3">No te lo pierdas la próxima vez</h2>
            <p className="text-gray-500/70 text-[15px] mb-8 max-w-md mx-auto leading-relaxed">Sé parte de lo que Dios está haciendo en Huancayo. Te esperamos.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/eventos" className="inline-flex items-center gap-2 bg-[#00498d] text-white px-6 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group">
                Ver próximos eventos
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/nosotros" className="inline-flex items-center gap-2 bg-white text-[#00498d] border border-gray-200/80 px-6 py-3.5 rounded-xl text-[14px] font-semibold hover:border-[#00498d]/30 hover:bg-[#00498d]/[0.02] hover:shadow-sm transition-all duration-300 group">
                Visítanos
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}