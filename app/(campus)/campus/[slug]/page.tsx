import PublicLayout from "@/components/layouts/PublicLayout";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseDemoVideo from "@/components/campus/CourseDemoVideo";

// Datos de ejemplo (luego se conectarán a Supabase)
const cursos = {
  "discipulado-1": {
    title: "Discipulado Nivel 1",
    subtitle: "Fundamentos de la vida cristiana",
    description:
      "Un recorrido transformador de 8 semanas por los fundamentos de la fe cristiana. Aprenderás sobre la oración, el estudio de la Palabra, el bautismo, la importancia de la iglesia local y la misión que Dios tiene para tu vida.",
    longDescription:
      "Este curso está diseñado para nuevos creyentes y para aquellos que desean reforzar las bases de su fe. Cada semana incluye videos, lecturas, cuestionarios y actividades prácticas que te ayudarán a crecer espiritualmente. No importa cuánto tiempo lleves en la iglesia, siempre es buen momento para volver a lo esencial.",
    duration: "8 semanas",
    lessons: 16,
    level: "Básico",
    isFree: true,
    accentColor: "emerald",
    instructor: "Pastor Rodríguez",
    instructorBio: "Pastor principal de IDC Huancayo. 20 años de ministerio.",
    demoVideoId: "dQw4w9WgXcQ", // Reemplaza con el ID real
    modules: [
      {
        title: "Módulo 1: La Oración",
        lessons: [
          { title: "¿Qué es la oración?", duration: "15 min", isVideo: true },
          { title: "Cómo orar según la Biblia", duration: "20 min", isVideo: true },
          { title: "Lectura: El Padre Nuestro", duration: "10 min", isVideo: false },
          { title: "Cuestionario del módulo", duration: "5 min", isVideo: false },
        ],
      },
      {
        title: "Módulo 2: La Palabra",
        lessons: [
          { title: "La Biblia como autoridad", duration: "18 min", isVideo: true },
          { title: "Cómo estudiar la Biblia", duration: "22 min", isVideo: true },
          { title: "Lectura: 2 Timoteo 3:16", duration: "8 min", isVideo: false },
          { title: "Cuestionario del módulo", duration: "5 min", isVideo: false },
        ],
      },
      {
        title: "Módulo 3: El Bautismo",
        lessons: [
          { title: "Significado del bautismo", duration: "16 min", isVideo: true },
          { title: "Mi testimonio público", duration: "12 min", isVideo: false },
          { title: "Cuestionario del módulo", duration: "5 min", isVideo: false },
        ],
      },
      {
        title: "Módulo 4: La Iglesia",
        lessons: [
          { title: "¿Qué es la iglesia?", duration: "20 min", isVideo: true },
          { title: "Mi rol en el cuerpo de Cristo", duration: "15 min", isVideo: true },
          { title: "Lectura: Hechos 2:42-47", duration: "10 min", isVideo: false },
          { title: "Cuestionario del módulo", duration: "5 min", isVideo: false },
        ],
      },
    ],
    whatYouWillLearn: [
      "Establecer una vida de oración constante",
      "Leer y entender la Biblia por ti mismo",
      "Comprender el significado del bautismo",
      "Encontrar tu lugar en la iglesia local",
      "Descubrir tu propósito en el Reino de Dios",
      "Crear hábitos espirituales duraderos",
    ],
  },
  "discipulado-2": {
    title: "Discipulado Nivel 2",
    subtitle: "Profundiza tu relación con Dios",
    description:
      "12 semanas de crecimiento intensivo para llevar tu fe al siguiente nivel. Desarrolla una vida de oración profunda, descubre tus dones espirituales y fortalece tu carácter cristiano.",
    longDescription:
      "Este curso es la continuación natural del Nivel 1. Aquí profundizarás en tu intimidad con Dios, aprenderás a escuchar Su voz, descubrirás los dones que Él te ha dado y comenzarás a usarlos para servir a otros. Incluye mentoría personalizada y proyectos prácticos.",
    duration: "12 semanas",
    lessons: 24,
    level: "Intermedio",
    isFree: false,
    price: "$9.99/mes",
    accentColor: "sky",
    instructor: "Pastora Elena",
    instructorBio: "Pastora de discipulado. Especialista en formación espiritual.",
    demoVideoId: "dQw4w9WgXcQ", // Reemplaza con el ID real
    modules: [
      {
        title: "Módulo 1: Intimidad con Dios",
        lessons: [
          { title: "Más allá de la oración básica", duration: "20 min", isVideo: true },
          { title: "Escuchando la voz de Dios", duration: "25 min", isVideo: true },
          { title: "Lectura: Salmo 63", duration: "10 min", isVideo: false },
          { title: "Ejercicio de journaling", duration: "15 min", isVideo: false },
        ],
      },
      {
        title: "Módulo 2: Dones Espirituales",
        lessons: [
          { title: "¿Qué son los dones?", duration: "18 min", isVideo: true },
          { title: "Descubre tus dones", duration: "30 min", isVideo: false },
          { title: "Test de dones espirituales", duration: "20 min", isVideo: false },
        ],
      },
      {
        title: "Módulo 3: Carácter Cristiano",
        lessons: [
          { title: "El fruto del Espíritu", duration: "22 min", isVideo: true },
          { title: "Formando hábitos santos", duration: "18 min", isVideo: true },
          { title: "Proyecto práctico", duration: "45 min", isVideo: false },
        ],
      },
    ],
    whatYouWillLearn: [
      "Desarrollar una vida de oración profunda",
      "Escuchar y discernir la voz de Dios",
      "Identificar y usar tus dones espirituales",
      "Cultivar el fruto del Espíritu",
      "Vencer patrones de pecado",
      "Servir efectivamente en tu iglesia",
    ],
  },
  liderazgo: {
    title: "Liderazgo con Propósito",
    subtitle: "Formación de líderes capacitados",
    description:
      "10 semanas de formación intensiva para quienes sienten el llamado al liderazgo. Aprende a liderar con integridad, sabiduría y un corazón conforme al de Dios.",
    longDescription:
      "Este curso está diseñado para aquellos que ya completaron los niveles de discipulado y sienten el llamado de Dios para liderar. Cubre principios bíblicos de liderazgo, manejo de conflictos, formación de equipos, visión estratégica y mentoría. Al completarlo, recibirás una certificación oficial de IDC Huancayo.",
    duration: "10 semanas",
    lessons: 20,
    level: "Avanzado",
    isFree: false,
    price: "$197 pago único",
    accentColor: "violet",
    instructor: "Pastor Rodríguez y equipo pastoral",
    instructorBio: "Equipo pastoral de IDC Huancayo con más de 40 años combinados de experiencia.",
    demoVideoId: "dQw4w9WgXcQ", // Reemplaza con el ID real
    modules: [
      {
        title: "Módulo 1: Fundamentos del Liderazgo",
        lessons: [
          { title: "Liderazgo según Jesús", duration: "25 min", isVideo: true },
          { title: "Carácter antes que habilidad", duration: "20 min", isVideo: true },
          { title: "Lectura: 1 Timoteo 3", duration: "12 min", isVideo: false },
        ],
      },
      {
        title: "Módulo 2: Visión y Estrategia",
        lessons: [
          { title: "Cómo recibir visión de Dios", duration: "22 min", isVideo: true },
          { title: "Planificación estratégica", duration: "30 min", isVideo: true },
          { title: "Ejercicio práctico de visión", duration: "40 min", isVideo: false },
        ],
      },
      {
        title: "Módulo 3: Mentoría y Multiplicación",
        lessons: [
          { title: "El arte de mentorizar", duration: "20 min", isVideo: true },
          { title: "Multiplicando líderes", duration: "18 min", isVideo: true },
          { title: "Proyecto final de liderazgo", duration: "60 min", isVideo: false },
        ],
      },
    ],
    whatYouWillLearn: [
      "Principios bíblicos de liderazgo",
      "Manejo de conflictos en la iglesia",
      "Formación y desarrollo de equipos",
      "Visión estratégica y planificación",
      "Mentoría efectiva",
      "Multiplicación de discípulos y líderes",
    ],
  },
};

const accentColorMap: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  sky: "bg-sky-50 text-sky-700 border-sky-200/60",
  violet: "bg-violet-50 text-violet-700 border-violet-200/60",
};

// Tipo para los parámetros
type Props = {
  params: Promise<{ slug: string }>;
};

// Generar metadata dinámica
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const curso = cursos[slug as keyof typeof cursos];
  if (!curso) return { title: "Curso no encontrado" };
  return {
    title: curso.title,
    description: curso.description,
  };
}

export default async function CursoPage({ params }: Props) {
  const { slug } = await params;
  const curso = cursos[slug as keyof typeof cursos];

  if (!curso) {
    notFound();
  }

  return (
    <PublicLayout>
      {/* ── Hero del curso ── */}
      <section className="relative bg-gradient-to-br from-[#001f3f] via-[#00498d] to-[#003366] py-16 lg:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link
            href="/campus"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-[13px] mb-6 transition-colors duration-300 group font-medium"
          >
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Campus
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2.5 mb-5">
              <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] border px-3 py-1.5 rounded-lg backdrop-blur-sm ${accentColorMap[curso.accentColor]}`}>
                {curso.level}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/15 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-lg">
                {curso.isFree ? "Gratuito" : curso.price}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/15 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-lg">
                {curso.duration}
              </span>
            </div>
            <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-white mb-3 tracking-tight leading-tight">
              {curso.title}
            </h1>
            <p className="text-white/50 text-[17px] font-normal leading-relaxed">
              {curso.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── VIDEO DEMO ── */}
      <CourseDemoVideo videoId={curso.demoVideoId} title={curso.title} />

      {/* ── Contenido principal ── */}
      <section className="relative py-12 lg:py-16 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00498d]/[0.01] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Columna principal */}
            <div className="lg:col-span-2">
              <h2 className="text-[1.25rem] font-bold text-gray-900 mb-4 tracking-tight">
                Sobre este curso
              </h2>
              <p className="text-[14px] text-gray-500/70 leading-relaxed mb-8 font-normal">
                {curso.longDescription}
              </p>

              {/* Lo que aprenderás */}
              <div className="bg-[#fafbfc] border border-gray-100/80 rounded-2xl p-7 mb-8">
                <h3 className="text-[16px] font-semibold text-gray-900 mb-5">
                  Lo que aprenderás
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {curso.whatYouWillLearn.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200/60 flex items-center justify-center flex-shrink-0 mt-px">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[13px] text-gray-600/80 leading-relaxed font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Módulos */}
              <h3 className="text-[16px] font-semibold text-gray-900 mb-4">Contenido del curso</h3>
              <div className="space-y-3">
                {curso.modules.map((modulo, i: number) => (
                  <details key={i} className="group border border-gray-100/80 rounded-xl overflow-hidden hover:border-gray-200/80 transition-colors duration-300">
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#fafbfc] transition-colors duration-200">
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.1em]">Módulo {i + 1}</span>
                        <h4 className="text-[15px] font-semibold text-gray-800 mt-1 group-hover:text-gray-900 transition-colors">{modulo.title}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-gray-400 font-medium">{modulo.lessons.length} lecciones</span>
                        <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="border-t border-gray-100/80">
                      {modulo.lessons.map((leccion, j: number) => (
                        <div key={j} className="flex items-center justify-between px-5 py-3 hover:bg-[#fafbfc] transition-colors duration-200">
                          <div className="flex items-center gap-3">
                            {leccion.isVideo ? (
                              <div className="w-6 h-6 rounded-md bg-[#00498d]/[0.06] flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-[#00498d] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5.14v14l11-7-11-7z" />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-md bg-gray-100/80 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                            )}
                            <span className="text-[13px] text-gray-700 font-normal">{leccion.title}</span>
                          </div>
                          <span className="text-[11px] text-gray-400 font-medium">{leccion.duration}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-gray-100/80 rounded-2xl p-7 shadow-sm shadow-gray-200/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-full bg-[#00498d]/[0.05] border border-[#00498d]/[0.08] flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#00498d]/[0.04]">
                    <span className="text-[13px] font-semibold text-[#00498d]/70">
                      {curso.instructor.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800 leading-tight">{curso.instructor}</p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium leading-relaxed">{curso.instructorBio}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100/80 my-5" />

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-[13px] text-gray-600">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {curso.duration}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-gray-600">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {curso.lessons} lecciones
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-gray-600">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {curso.level}
                  </div>
                </div>

                {curso.isFree ? (
                  <Link
                    href="/signup"
                    className="flex items-center justify-center gap-2.5 w-full bg-[#00498d] text-white text-[14px] font-semibold py-3.5 rounded-xl hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group"
                  >
                    Inscribirse gratis
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <div>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center gap-2.5 w-full bg-[#00498d] text-white text-[14px] font-semibold py-3.5 rounded-xl hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group"
                    >
                      {curso.price?.split(" ")[0] === "$9.99" ? "Suscribirse" : "Comprar curso"}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <p className="text-[11px] text-gray-400 text-center mt-3 font-medium">{curso.price}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="relative py-16 lg:py-20 bg-[#fafbfc] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#00498d]/[0.06] to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00498d]/50 mb-3 block">Da el paso</span>
          <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 tracking-tight mb-4">¿Listo para comenzar?</h2>
          <p className="text-gray-500/70 text-[15px] mb-9 max-w-md mx-auto leading-relaxed font-normal">
            El primer paso es inscribirte. Luego podrás acceder a todas las lecciones desde tu dashboard.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2.5 bg-[#00498d] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group text-[15px]"
          >
            {curso.isFree ? "Inscribirse gratis" : "Comenzar ahora"}
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}