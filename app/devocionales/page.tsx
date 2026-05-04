import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";

const devocionales = [
  {
    id: 1,
    title: "El poder de la oración diaria",
    excerpt: "Descubre cómo la oración transforma nuestra relación con Dios y nos acerca a Su propósito cada día.",
    date: "15 Jun 2025",
    author: "Pastor Rodríguez",
    slug: "poder-oracion-diaria",
  },
  {
    id: 2,
    title: "Caminando en fe, no en vista",
    excerpt: "¿Qué significa realmente confiar en Dios cuando no podemos ver el camino? Una reflexión sobre 2 Corintios 5:7.",
    date: "14 Jun 2025",
    author: "Pastora Elena",
    slug: "caminando-en-fe",
  },
  {
    id: 3,
    title: "El fruto del Espíritu en tiempos difíciles",
    excerpt: "Cómo cultivar amor, gozo y paz incluso cuando las circunstancias son adversas.",
    date: "13 Jun 2025",
    author: "Hno. Carlos Mendoza",
    slug: "fruto-espiritu-tiempos-dificiles",
  },
  {
    id: 4,
    title: "Perdonar como fuimos perdonados",
    excerpt: "El perdón no es opcional para el cristiano. Una mirada profunda a Efesios 4:32.",
    date: "12 Jun 2025",
    author: "Pastor Rodríguez",
    slug: "perdonar-como-fuimos-perdonados",
  },
  {
    id: 5,
    title: "La gracia que transforma",
    excerpt: "No se trata de ser perfectos, sino de permitir que la gracia de Dios obre en nuestras debilidades.",
    date: "11 Jun 2025",
    author: "Pastora Elena",
    slug: "gracia-que-transforma",
  },
  {
    id: 6,
    title: "Sirviendo con humildad",
    excerpt: "Jesús nos mostró que el verdadero liderazgo se ejerce con una toalla en la mano. Reflexión sobre Juan 13.",
    date: "10 Jun 2025",
    author: "Hno. Carlos Mendoza",
    slug: "sirviendo-con-humildad",
  },
];

export const metadata = {
  title: "Devocionales",
  description: "Alimenta tu espíritu cada día con devocionales basados en la Palabra de Dios.",
};

export default function DevocionalesPage() {
  return (
    <PublicLayout>
      {/* Hero de la página */}
      <section className="relative bg-gradient-to-br from-[#001f3f] via-[#00498d] to-[#003366] py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-10 right-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border border-white rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 block">
            Lectura diaria
          </span>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-white tracking-tight">
            Devocionales
          </h1>
          <p className="text-white/60 text-[16px] mt-3 max-w-lg leading-relaxed">
            Alimenta tu espíritu cada día con reflexiones basadas en la Palabra de Dios.
          </p>
        </div>
      </section>

      {/* Grid de devocionales */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devocionales.map((devocional) => (
              <article
                key={devocional.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
              >
                {/* Imagen decorativa */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-[#00498d]/[0.06] via-[#00498d]/[0.03] to-transparent flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-[1px]" />
                  <svg className="relative w-10 h-10 text-[#00498d]/12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold text-[#00498d]/50 uppercase tracking-[0.15em]">
                      Devocional
                    </span>
                    <span className="text-[10px] text-gray-300">•</span>
                    <time className="text-[10px] text-gray-400">{devocional.date}</time>
                  </div>
                  <h3 className="text-[17px] font-semibold text-gray-900 mb-2.5 leading-snug group-hover:text-[#00498d] transition-colors">
                    {devocional.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {devocional.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">{devocional.author}</span>
                    <Link
                      href={`/devocionales/${devocional.slug}`}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#00498d] group/link"
                    >
                      Leer
                      <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}