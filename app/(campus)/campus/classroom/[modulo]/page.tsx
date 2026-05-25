import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  canAccessCourse,
  getCourseBySlug,
  getCourseLevel,
  getLessonsByCourseId,
} from "@/lib/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Props = { params: Promise<{ modulo: string }> };

// Mapa de colores para badges
const accentColorMap: Record<string, string> = {
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

const accentBanner: Record<string, string> = {
  emerald: "from-emerald-900 via-emerald-800 to-emerald-950",
  sky: "from-sky-900 via-sky-800 to-sky-950",
  violet: "from-violet-900 via-violet-800 to-violet-950",
  amber: "from-amber-900 via-amber-800 to-amber-950",
};

const accentBadgeBg: Record<string, string> = {
  emerald: "bg-white/10",
  sky: "bg-white/10",
  violet: "bg-white/10",
  amber: "bg-white/10",
};

const accentTextLight: Record<string, string> = {
  emerald: "text-emerald-200",
  sky: "text-sky-200",
  violet: "text-violet-200",
  amber: "text-amber-200",
};

const accentBorderLight: Record<string, string> = {
  emerald: "border-emerald-300/30",
  sky: "border-sky-300/30",
  violet: "border-violet-300/30",
  amber: "border-amber-300/30",
};

const accentGlow: Record<string, string> = {
  emerald: "bg-emerald-500/20",
  sky: "bg-sky-500/20",
  violet: "bg-violet-500/20",
  amber: "bg-amber-500/20",
};

export default async function ModulePage({ params }: Props) {
  const { modulo } = await params;
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || "miembro";
  const isAdmin = role === "admin";
  const course = await getCourseBySlug(modulo);
  if (!course) notFound();
  if (!canAccessCourse(course, role)) redirect("/campus/classroom");

  const lessons = await getLessonsByCourseId(course.id, {
    includeUnpublished: isAdmin,
  });

  // Agrupar lecciones por módulo (3 lecciones por módulo)
  const grouped: Record<string, any[]> = {};
  lessons.forEach((lesson) => {
    const moduleNumber = Math.ceil(lesson.lesson_number / 3);
    const moduleTitle = `Módulo ${moduleNumber}`;
    if (!grouped[moduleTitle]) grouped[moduleTitle] = [];
    grouped[moduleTitle].push(lesson);
  });

  const totalLessons = lessons.length;
  const completedLessons = 0; // Luego se calculará con datos reales
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const accentColor = accentColorMap[course.title] || "emerald";
  const courseLevel = getCourseLevel(course);
  const courseDescription = course.description?.trim();

  // Obtener la primera lección para el estado vacío
  const firstLesson = lessons.length > 0 ? lessons[0] : null;

  // Obtener el número total de módulos
  const totalModules = Object.keys(grouped).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      {/* ─── BREADCRUMB ─── */}
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mb-6 flex-wrap">
        <Link
          href="/campus"
          className="hover:text-[#00498d] transition-colors duration-200"
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
          className="hover:text-[#00498d] transition-colors duration-200"
        >
          Aula
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
        <span className="text-gray-500 truncate max-w-[200px]">
          {course.title}
        </span>
      </nav>

      {/* ─── LAYOUT PRINCIPAL ─── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ─── SIDEBAR: Navegación del módulo ─── */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/30 border border-gray-100/80 p-5 sticky top-24 transition-all duration-300 hover:shadow-md hover:shadow-gray-200/40">
            {/* Encabezado del curso */}
            <div className="mb-5">
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.1em] border px-2.5 py-1 rounded-lg ${
                    accentStyles[accentColor]
                  }`}
                >
                  {courseLevel}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {totalModules} {totalModules === 1 ? "módulo" : "módulos"}
                </span>
              </div>
              <h2 className="text-[16px] font-bold text-gray-900 leading-tight">
                {course.title}
              </h2>
              {courseDescription && (
                <p className="text-[12px] text-gray-500/70 mt-1 font-normal leading-relaxed">
                  {courseDescription}
                </p>
              )}
            </div>

            {/* Barra de progreso */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  Progreso general
                </span>
                <span className="text-[11px] font-semibold text-gray-600">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    accentProgress[accentColor]
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
                {completedLessons} de {totalLessons} lecciones completadas
              </p>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-100/80 my-4" />

            {/* Lista de módulos y lecciones */}
            {Object.entries(grouped).length > 0 ? (
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 px-2 mb-2 block">
                  Contenido del curso
                </span>
                {Object.entries(grouped).map(
                  ([moduleTitle, moduleLessons]: [string, any[]], idx: number) => {
                    const moduleCompleted = moduleLessons.every(
                      (l: any) => l.completed
                    );
                    const moduleProgress = Math.round(
                      (moduleLessons.filter((l: any) => l.completed).length /
                        moduleLessons.length) *
                        100
                    );

                    return (
                      <details
                        key={moduleTitle}
                        className="group rounded-xl transition-all duration-200"
                        open
                      >
                        <summary className="flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-lg text-[13px] font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200">
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                                moduleCompleted
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-[#00498d]/[0.06] text-[#00498d]/60"
                              }`}
                            >
                              {moduleCompleted ? (
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                idx + 1
                              )}
                            </span>
                            <span className="truncate max-w-[160px]">
                              {moduleTitle}
                            </span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 font-medium">
                              {moduleLessons.length}
                            </span>
                            <svg
                              className="w-3.5 h-3.5 text-gray-400 group-open:rotate-90 transition-transform duration-300"
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
                          </div>
                        </summary>

                        {/* Mini barra de progreso del módulo */}
                        <div className="px-3 pb-2">
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                accentProgress[accentColor]
                              }`}
                              style={{ width: `${moduleProgress}%` }}
                            />
                          </div>
                        </div>

                        <ul className="ml-9 space-y-0.5 pr-1">
                          {moduleLessons.map((lesson: any) => {
                            const isCompleted = lesson.completed || false;
                            return (
                              <li key={lesson.id}>
                                <Link
                                  href={`/campus/classroom/${modulo}/${lesson.id}`}
                                  className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13px] transition-all duration-200 group/link ${
                                    isCompleted
                                      ? "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
                                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/80"
                                  }`}
                                >
                                  {/* Indicador de estado */}
                                  {isCompleted ? (
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-100">
                                      <svg
                                        className="w-2.5 h-2.5 text-emerald-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={3}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 group-hover/link:border-gray-400 transition-colors duration-200" />
                                  )}

                                  {/* Tipo de lección */}
                                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                    {lesson.video_url ? (
                                      <svg
                                        className="w-3.5 h-3.5 text-[#00498d]/60"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M8 5.14v14l11-7-11-7z" />
                                      </svg>
                                    ) : (
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={1.5}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                    )}
                                  </div>

                                  <span className="truncate flex-1">
                                    {lesson.title}
                                  </span>
                                  {lesson.duration && (
                                    <span className="text-[10px] text-gray-400 flex-shrink-0 font-medium">
                                      {lesson.duration}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </details>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-5 h-5 text-[#00498d]/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <p className="text-[13px] text-gray-500/70 font-normal">
                  No hay lecciones disponibles aún
                </p>
              </div>
            )}

            {/* Link para volver */}
            <div className="mt-5 pt-4 border-t border-gray-100/80">
              <Link
                href="/campus/classroom"
                className="flex items-center gap-2 text-[12px] font-medium text-[#00498d]/60 hover:text-[#00498d] transition-colors duration-200 group"
              >
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Volver al Aula
              </Link>
            </div>
          </div>
        </aside>

        {/* ─── CONTENIDO PRINCIPAL ─── */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/30 border border-gray-100/80 overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-gray-200/40">
            {/* Banner decorativo del curso */}
            <div
              className={`relative bg-gradient-to-br ${accentBanner[accentColor]} p-8 sm:p-10 overflow-hidden`}
            >
              {/* Círculos decorativos */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/[0.03] blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

              {/* Líneas decorativas */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-0 left-1/4 w-px h-full bg-white rotate-12" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-white rotate-12" />
                <div className="absolute top-0 left-3/4 w-px h-full bg-white rotate-12" />
              </div>

              <div className="relative">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.12em] border px-3 py-1.5 rounded-lg backdrop-blur-sm ${
                      accentBadgeBg[accentColor]
                    } ${accentTextLight[accentColor]} ${
                      accentBorderLight[accentColor]
                    }`}
                  >
                    {courseLevel}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/10 backdrop-blur-sm text-white/80 border border-white/10 px-3 py-1.5 rounded-lg">
                    {totalLessons} lecciones
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/10 backdrop-blur-sm text-white/80 border border-white/10 px-3 py-1.5 rounded-lg">
                    {totalModules} {totalModules === 1 ? "módulo" : "módulos"}
                  </span>
                </div>

                {/* Título */}
                <h1 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-bold text-white tracking-tight mb-3 leading-tight">
                  {course.title}
                </h1>

                {/* Subtítulo */}
                {courseDescription && (
                  <p className="text-white/55 text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-2xl">
                    {courseDescription}
                  </p>
                )}

              </div>
            </div>

            {/* Contenido principal */}
            <div className="p-8 sm:p-10">
              {firstLesson ? (
                <div className="text-center py-8">
                  {/* Icono decorativo */}
                  <div
                    className={`w-20 h-20 rounded-2xl ${accentGlow[accentColor]} flex items-center justify-center mx-auto mb-6 shadow-sm`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-[#00498d]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-[1.25rem] font-bold text-gray-800 mb-3 tracking-tight">
                    Comienza tu aprendizaje
                  </h3>
                  <p className="text-[14px] text-gray-500/70 mb-8 max-w-md mx-auto leading-relaxed font-normal">
                    Selecciona una lección de la barra lateral para comenzar tu
                    estudio. Cada lección incluye videos, lecturas y recursos
                    descargables para tu crecimiento espiritual.
                  </p>

                  {/* Botones de acción */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`/campus/classroom/${modulo}/${firstLesson.id}`}
                      className="inline-flex items-center gap-2.5 bg-[#00498d] text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl hover:bg-[#003d7a] transition-all duration-300 shadow-md shadow-[#00498d]/20 hover:shadow-lg hover:shadow-[#00498d]/30 hover:-translate-y-0.5 active:translate-y-0 group"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                      Ir a la primera lección
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0-4 4m4-4H3"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/campus/classroom"
                      className="inline-flex items-center gap-2 bg-white text-[#00498d] border-2 border-[#00498d]/20 text-[14px] font-semibold px-6 py-3.5 rounded-xl hover:border-[#00498d]/40 hover:bg-[#00498d]/[0.02] transition-all duration-300 group"
                    >
                      Explorar más cursos
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Estadísticas rápidas */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {totalLessons}
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                        Lecciones
                      </div>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {totalModules}
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                        Módulos
                      </div>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {course.is_free ? "Gratis" : course.price || "—"}
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                        Acceso
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-9 h-9 text-[#00498d]/25"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-[1.25rem] font-bold text-gray-800 mb-3 tracking-tight">
                    Próximamente
                  </h3>
                  <p className="text-[14px] text-gray-500/70 max-w-md mx-auto leading-relaxed font-normal mb-8">
                    Las lecciones de este curso estarán disponibles pronto.
                    ¡Vuelve a revisar más tarde!
                  </p>
                  <Link
                    href="/campus/classroom"
                    className="inline-flex items-center gap-2 bg-white text-[#00498d] border-2 border-[#00498d]/20 text-[14px] font-semibold px-6 py-3.5 rounded-xl hover:border-[#00498d]/40 hover:bg-[#00498d]/[0.02] transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Volver al Aula
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
