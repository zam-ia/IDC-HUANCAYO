import { getCourseBySlug, getLessonsByCourseId } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import LessonView from "@/components/campus/LessonView";
import ModuleSidebar from "@/components/campus/ModuleSidebar";

type Props = { params: Promise<{ modulo: string; leccion: string }> };

// Mapa de colores por curso
const courseAccentMap: Record<string, string> = {
  "Discipulado Nivel 1": "emerald",
  "Discipulado Nivel 2": "sky",
  "Liderazgo con Propósito": "violet",
  "Escuela de Oración": "amber",
};

const accentStyles: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  sky: "bg-sky-50 text-sky-700 border-sky-200/60",
  violet: "bg-violet-50 text-violet-700 border-violet-200/60",
  amber: "bg-amber-50 text-amber-700 border-amber-200/60",
};

const accentProgress: Record<string, string> = {
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
};

export default async function LessonPage({ params }: Props) {
  const { modulo, leccion } = await params;
  const course = await getCourseBySlug(modulo);
  if (!course) notFound();

  const lessons = await getLessonsByCourseId(course.id);
  const currentLesson = lessons.find((l: any) => l.id === leccion);
  if (!currentLesson) notFound();

  // Agrupar lecciones por módulo para la barra lateral
  const grouped: Record<string, any[]> = {};
  lessons.forEach((lesson: any) => {
    const moduleNumber = Math.ceil(lesson.lesson_number / 3);
    const moduleTitle = `Módulo ${moduleNumber}`;
    if (!grouped[moduleTitle]) grouped[moduleTitle] = [];
    grouped[moduleTitle].push(lesson);
  });

  // Calcular progreso
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l: any) => l.completed).length;
  const progress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const accentColor = courseAccentMap[course.title] || "emerald";

  // Encontrar lección anterior y siguiente
  const currentIndex = lessons.findIndex((l: any) => l.id === leccion);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  // Encontrar el título del módulo actual
  let currentModuleTitle = "";
  for (const [moduleTitle, moduleLessons] of Object.entries(grouped)) {
    if (moduleLessons.some((l: any) => l.id === leccion)) {
      currentModuleTitle = moduleTitle;
      break;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mb-6 flex-wrap">
        <Link
          href="/campus"
          className="hover:text-[#00498d] transition-colors"
        >
          Campus
        </Link>
        <svg
          className="w-3 h-3 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <Link
          href="/campus/classroom"
          className="hover:text-[#00498d] transition-colors"
        >
          Classroom
        </Link>
        <svg
          className="w-3 h-3 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <Link
          href={`/campus/classroom/${modulo}`}
          className="hover:text-[#00498d] transition-colors truncate max-w-[120px]"
        >
          {course.title}
        </Link>
        <svg
          className="w-3 h-3 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-500 truncate max-w-[160px]">
          {currentLesson.title}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ─── SIDEBAR: Navegación del módulo ─── */}
        <aside className="lg:w-80 flex-shrink-0">
          <ModuleSidebar
            courseTitle={course.title}
            courseLevel={course.level || "Básico"}
            accentColor={accentColor}
            grouped={grouped}
            progress={progress}
            totalLessons={totalLessons}
            modulo={modulo}
            currentLessonId={leccion}
          />
        </aside>

        {/* ─── CONTENIDO PRINCIPAL ─── */}
        <main className="flex-1 min-w-0">
          <LessonView lesson={currentLesson} />

          {/* Navegación anterior/siguiente */}
          <div className="flex items-center justify-between mt-4 p-4 bg-white rounded-2xl shadow-sm shadow-gray-200/30 border border-gray-100/80">
            {prevLesson ? (
              <Link
                href={`/campus/classroom/${modulo}/${prevLesson.id}`}
                className="flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-[#00498d] transition-colors group min-w-0"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7 7-7 7"
                  />
                </svg>
                <span className="truncate">
                  <span className="hidden sm:inline">Anterior:</span>{" "}
                  {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/campus/classroom/${modulo}/${nextLesson.id}`}
                className="flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-[#00498d] transition-colors group min-w-0 ml-auto text-right"
              >
                <span className="truncate">
                  <span className="hidden sm:inline">Siguiente:</span>{" "}
                  {nextLesson.title}
                </span>
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}