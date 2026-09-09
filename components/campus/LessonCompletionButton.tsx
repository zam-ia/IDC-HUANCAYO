"use client";

import { useLessonProgress } from "@/hooks/useLessonProgress";

export default function LessonCompletionButton({
  lessonId,
  initialCompleted,
}: {
  lessonId: string;
  initialCompleted: boolean;
}) {
  const { completed, loading, error, toggleCompleted } = useLessonProgress(
    lessonId,
    initialCompleted
  );

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => void toggleCompleted()}
        disabled={loading}
        className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition disabled:cursor-wait disabled:opacity-65 ${
          completed
            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            : "border border-gray-200 bg-white text-gray-600 hover:border-[#00498d]/30 hover:text-[#00498d]"
        }`}
      >
        <span aria-hidden="true">{completed ? "✓" : "○"}</span>
        {loading ? "Guardando…" : completed ? "Completada" : "Marcar completada"}
      </button>
      {error && <span className="max-w-52 text-right text-[10px] text-red-600">{error}</span>}
    </div>
  );
}
