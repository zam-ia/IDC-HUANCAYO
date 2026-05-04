"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface LessonProgressState {
  completed: boolean;
  loading: boolean;
  error: string | null;
}

interface LessonProgressActions {
  toggleCompleted: () => Promise<void>;
  markCompleted: () => Promise<void>;
  markIncomplete: () => Promise<void>;
  retry: () => Promise<void>;
}

type UseLessonProgressReturn = LessonProgressState & LessonProgressActions;

export function useLessonProgress(lessonId: string): UseLessonProgressReturn {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Referencias para evitar race conditions
  const abortControllerRef = useRef<AbortController | null>(null);
  const pendingUpdateRef = useRef<boolean | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Cargar estado inicial
  const fetchProgress = useCallback(async () => {
    // Cancelar cualquier request anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/lessons/${lessonId}/progress`, {
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (!controller.signal.aborted) {
        setCompleted(data.completed ?? false);
        retryCountRef.current = 0;
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return; // Request cancelado intencionalmente
      }

      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";

      if (!controller.signal.aborted) {
        console.error("Error fetching lesson progress:", errorMessage);
        setError("No se pudo cargar el progreso");

        // Retry automático con backoff
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current += 1;
          const delay = Math.pow(2, retryCountRef.current) * 1000;
          setTimeout(() => {
            fetchProgress();
          }, delay);
        }
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [lessonId]);

  // Cargar al montar y cuando cambia el lessonId
  useEffect(() => {
    fetchProgress();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchProgress]);

  // Actualizar progreso en el servidor
  const updateProgress = useCallback(
    async (newCompleted: boolean): Promise<boolean> => {
      setIsUpdating(true);
      setError(null);

      // Guardar el valor pendiente
      pendingUpdateRef.current = newCompleted;

      try {
        const res = await fetch(`/api/lessons/${lessonId}/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: newCompleted,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        // Verificar que esta actualización sigue siendo la última
        if (pendingUpdateRef.current === newCompleted) {
          if (data.success) {
            setCompleted(newCompleted);
            // Disparar evento global para que la barra lateral se actualice
            window.dispatchEvent(new Event("lesson-progress-changed"));
            return true;
          } else {
            throw new Error(data.error || "Error al actualizar el progreso");
          }
        }

        return false;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";

        console.error("Error updating lesson progress:", errorMessage);

        // Solo mostrar error si esta actualización sigue siendo la pendiente
        if (pendingUpdateRef.current === newCompleted) {
          setError("No se pudo guardar el progreso");
          setCompleted(!newCompleted); // Revertir al estado anterior
        }

        return false;
      } finally {
        // Solo limpiar si esta actualización sigue siendo la pendiente
        if (pendingUpdateRef.current === newCompleted) {
          pendingUpdateRef.current = null;
          setIsUpdating(false);
        }
      }
    },
    [lessonId]
  );

  // Toggle completado (optimistic update)
  const toggleCompleted = useCallback(async () => {
    const newCompleted = !completed;
    setCompleted(newCompleted); // Optimistic update
    await updateProgress(newCompleted);
  }, [completed, updateProgress]);

  // Marcar como completado
  const markCompleted = useCallback(async () => {
    if (!completed) {
      setCompleted(true); // Optimistic update
      await updateProgress(true);
    }
  }, [completed, updateProgress]);

  // Marcar como incompleto
  const markIncomplete = useCallback(async () => {
    if (completed) {
      setCompleted(false); // Optimistic update
      await updateProgress(false);
    }
  }, [completed, updateProgress]);

  // Reintentar carga
  const retry = useCallback(async () => {
    retryCountRef.current = 0;
    await fetchProgress();
  }, [fetchProgress]);

  return {
    completed,
    loading,
    error,
    toggleCompleted,
    markCompleted,
    markIncomplete,
    retry,
  };
}