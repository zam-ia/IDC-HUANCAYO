"use client";

import { useCallback, useState } from "react";

export function useLessonProgress(lessonId: string, initialCompleted = false) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProgress = useCallback(
    async (nextCompleted: boolean) => {
      const previous = completed;
      setCompleted(nextCompleted);
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/lessons/${lessonId}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: nextCompleted }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        window.dispatchEvent(
          new CustomEvent("lesson-progress-changed", {
            detail: { lessonId, completed: nextCompleted },
          })
        );
        return true;
      } catch {
        setCompleted(previous);
        setError("No se pudo guardar el progreso. Inténtalo otra vez.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [completed, lessonId]
  );

  const toggleCompleted = useCallback(
    () => updateProgress(!completed).then(() => undefined),
    [completed, updateProgress]
  );

  return { completed, loading, error, toggleCompleted };
}
