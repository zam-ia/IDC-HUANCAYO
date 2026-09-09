"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  completed?: boolean;
  duration?: string;
  video_duration_sec?: number | null;
}

interface ModuleSidebarProps {
  courseTitle: string;
  courseLevel: string;
  accentColor: string;
  grouped: Record<string, Lesson[]>;
  progress: number;
  totalLessons: number;
  modulo: string;
  currentLessonId: string;
  initialProgress: Record<string, boolean>;
}

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

export default function ModuleSidebar({
  courseTitle,
  courseLevel,
  accentColor,
  grouped,
  progress,
  totalLessons,
  modulo,
  currentLessonId,
  initialProgress,
}: ModuleSidebarProps) {
  const [lessonProgress, setLessonProgress] =
    useState<Record<string, boolean>>(initialProgress);

  useEffect(() => {
    const handleProgressChange = (event: Event) => {
      const detail = (event as CustomEvent<{ lessonId: string; completed: boolean }>).detail;
      if (!detail?.lessonId) return;
      setLessonProgress((current) => ({
        ...current,
        [detail.lessonId]: detail.completed,
      }));
    };

    window.addEventListener("lesson-progress-changed", handleProgressChange);
    return () => {
      window.removeEventListener("lesson-progress-changed", handleProgressChange);
    };
  }, []);

  const completedCount = useMemo(
    () => Object.values(lessonProgress).filter(Boolean).length,
    [lessonProgress]
  );
  const displayProgress = totalLessons
    ? Math.round((completedCount / totalLessons) * 100)
    : progress;

  return (
    <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/30 border border-gray-100/80 p-5 sticky top-24">
      {/* ── Encabezado del curso ── */}
      <div className="mb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.1em] border px-2.5 py-1 rounded-md ${
              accentStyles[accentColor] || accentStyles.emerald
            }`}
          >
            {courseLevel || "Básico"}
          </span>
        </div>
        <h2 className="text-[16px] font-bold text-gray-900 leading-tight">
          {courseTitle}
        </h2>
      </div>

      {/* ── Barra de progreso ── */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-gray-400 font-medium">
            Progreso
          </span>
          <span className="text-[11px] font-semibold text-gray-600">{displayProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${accentProgress[accentColor] || "bg-emerald-500"}`}
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
          {completedCount} de {totalLessons} lecciones completadas
        </p>
      </div>

      {/* ── Lista de módulos y lecciones ── */}
      {Object.keys(grouped).length === 0 ? (
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
          <p className="text-[12px] text-gray-400 font-medium">
            No hay lecciones disponibles
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {Object.entries(grouped).map(
            ([moduleTitle, moduleLessons], idx) => {
              const hasActiveLesson = moduleLessons.some(
                (lesson) => lesson.id === currentLessonId
              );
              const allCompleted = moduleLessons.every(
                (lesson) => lessonProgress[lesson.id] === true
              );

              return (
                <details
                  key={moduleTitle}
                  className="group"
                  open={hasActiveLesson || idx === 0}
                >
                  <summary className="flex items-center justify-between cursor-pointer py-2.5 px-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 transition-colors">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#00498d]/[0.05] flex items-center justify-center text-[10px] font-bold text-[#00498d]/60">
                        {idx + 1}
                      </span>
                      <span className="flex items-center gap-1.5">
                        {moduleTitle}
                        {allCompleted && moduleLessons.length > 0 && (
                          <svg
                            className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-medium">
                        {moduleLessons.filter(
                          (lesson) => lessonProgress[lesson.id]
                        ).length}
                        /{moduleLessons.length}
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-gray-400 group-open:rotate-90 transition-transform duration-200"
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
                  <ul className="mt-1 ml-7 space-y-0.5">
                    {moduleLessons.map((lesson) => {
                      const isActive = lesson.id === currentLessonId;
                      const isCompleted = lessonProgress[lesson.id] || false;
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/campus/classroom/${modulo}/${lesson.id}`}
                            prefetch={false}
                            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13px] transition-all duration-200 ${
                              isActive
                                ? "bg-[#00498d]/[0.05] text-[#00498d] font-medium shadow-sm shadow-[#00498d]/[0.04]"
                                : isCompleted
                                ? "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/80"
                            }`}
                          >
                            {/* Indicador de estado */}
                            {isCompleted ? (
                              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
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
                            ) : isActive ? (
                              <div className="w-4 h-4 rounded-full border-2 border-[#00498d] flex-shrink-0 relative">
                                <span className="absolute inset-0 rounded-full bg-[#00498d]/[0.08] animate-ping" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                            )}
                            <span className="truncate flex-1">
                              {lesson.title}
                            </span>
                            {lesson.video_duration_sec ? (
                              <span className="text-[10px] text-gray-400 flex-shrink-0 font-medium">
                                {Math.ceil(lesson.video_duration_sec / 60)} min
                              </span>
                            ) : null}
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
      )}

      {/* ── Footer: Volver al Classroom ── */}
      <div className="mt-5 pt-4 border-t border-gray-100/80">
        <Link
          href="/campus/classroom"
          className="flex items-center gap-2 text-[12px] font-medium text-[#00498d]/60 hover:text-[#00498d] transition-colors group"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
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
          Volver al Classroom
        </Link>
      </div>
    </div>
  );
}
