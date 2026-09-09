import type { Lesson } from "@/lib/db";
import LessonCompletionButton from "@/components/campus/LessonCompletionButton";
import LessonVideo from "@/components/campus/LessonVideo";

export default function LessonView({
  lesson,
  initialCompleted,
  canTrackProgress,
}: {
  lesson: Lesson;
  initialCompleted: boolean;
  canTrackProgress: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <header className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:py-6">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#00498d]/70">
            Lección {lesson.lesson_number}
          </p>
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              {lesson.description}
            </p>
          )}
        </div>
        {canTrackProgress && (
          <LessonCompletionButton
            lessonId={lesson.id}
            initialCompleted={initialCompleted}
          />
        )}
      </header>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        {lesson.video_url && <LessonVideo url={lesson.video_url} title={lesson.title} />}

        {lesson.content ? (
          <div className="whitespace-pre-line rounded-2xl border border-gray-100 bg-gray-50/70 p-5 text-sm leading-7 text-gray-700 sm:p-7">
            {lesson.content}
          </div>
        ) : !lesson.video_url ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
            El contenido de esta lección estará disponible pronto.
          </div>
        ) : null}

        {lesson.downloadable_pdf && (
          <section className="mt-7 border-t border-gray-100 pt-6">
            <h2 className="text-sm font-bold text-gray-900">Material de apoyo</h2>
            <a
              href={lesson.downloadable_pdf}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#00498d] transition hover:border-[#00498d]/30 hover:bg-[#00498d]/[0.03]"
            >
              Abrir PDF de la lección
            </a>
          </section>
        )}
      </div>
    </article>
  );
}
