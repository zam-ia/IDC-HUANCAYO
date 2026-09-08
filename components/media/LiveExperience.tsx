"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PublicLiveEvent } from "@/types/media";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-white/60">
      Preparando reproductor…
    </div>
  ),
});

const statusLabels = {
  draft: "Borrador",
  scheduled: "Próxima transmisión",
  rehearsal: "En ensayo",
  live: "En vivo",
  interrupted: "Reconectando",
  finished: "Finalizada",
  archived: "Sin transmisión",
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date(value));
}

function formatCountdown(milliseconds: number) {
  if (milliseconds <= 0) return "La señal comenzará pronto";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days ? `${days}d ` : ""}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function calendarUrl(event: PublicLiveEvent) {
  if (!event.scheduledAt) return null;
  const start = new Date(event.scheduledAt);
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const compact = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${compact(start)}/${compact(end)}`,
    details: event.description || "Transmisión en vivo de IDC Huancayo",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function LiveExperience({
  initialEvent,
}: {
  initialEvent: PublicLiveEvent;
}) {
  const [event, setEvent] = useState(initialEvent);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch("/api/live/status", { cache: "no-store" });
        if (response.ok) setEvent((await response.json()) as PublicLiveEvent);
      } catch {
        // Conserva el estado renderizado si la red está intermitente.
      }
    };
    const interval = window.setInterval(() => void refresh(), 15_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const update = () =>
      setCountdown(
        event.scheduledAt
          ? new Date(event.scheduledAt).getTime() - Date.now()
          : 0
      );
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [event.scheduledAt]);

  const playbackId =
    event.status === "live" ? event.playbackId : event.replayPlaybackId;
  const canPlay = Boolean(
    playbackId && (event.status === "live" || event.status === "finished")
  );
  const addToCalendar = useMemo(() => calendarUrl(event), [event]);

  const share = useCallback(async () => {
    const shareData = {
      title: event.title,
      text: event.description || "Acompáñanos en la transmisión de IDC Huancayo",
      url: window.location.href,
    };
    if (navigator.share) await navigator.share(shareData);
    else await navigator.clipboard.writeText(window.location.href);
  }, [event]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.7fr)]">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#071b2c] shadow-2xl shadow-slate-950/15">
        <div className="relative aspect-video">
          {canPlay ? (
            <MuxPlayer
              playbackId={playbackId || undefined}
              streamType={event.status === "live" ? "live" : "on-demand"}
              metadata={{ video_title: event.title }}
              accentColor="#29abe2"
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,#0d4a75,#071b2c_68%)] px-6 text-center text-white">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 18.5a4.5 4.5 0 0 1 0-9 6 6 0 0 1 11.3 2.7A3.5 3.5 0 0 1 18.5 19H8Z" />
                  <path strokeLinecap="round" strokeWidth="1.5" d="M9 14h6" />
                </svg>
              </div>
              <p className="text-lg font-semibold">
                {event.status === "interrupted"
                  ? "Estamos restableciendo la señal"
                  : event.status === "scheduled"
                    ? "La transmisión todavía no ha comenzado"
                    : "No hay una señal activa en este momento"}
              </p>
              {event.status === "scheduled" && event.scheduledAt && (
                <p className="mt-3 font-mono text-2xl font-semibold text-sky-300" aria-live="polite">
                  {formatCountdown(countdown)}
                </p>
              )}
              {event.socialFallbackUrl && event.status === "interrupted" && (
                <Link
                  href={event.socialFallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#00498d]"
                >
                  Abrir canal alternativo
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              event.status === "live" ? "animate-pulse bg-red-500" : "bg-sky-500"
            }`}
          />
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#00498d]">
            {statusLabels[event.status]}
          </span>
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-950">
          {event.title}
        </h1>
        {event.speaker && (
          <p className="mt-2 text-sm font-semibold text-gray-600">{event.speaker}</p>
        )}
        {event.description && (
          <p className="mt-4 text-sm leading-6 text-gray-500">{event.description}</p>
        )}
        {event.scheduledAt && (
          <p className="mt-5 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-900">
            {formatDate(event.scheduledAt)} · hora de Huancayo
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={share}
            className="rounded-lg bg-[#00498d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003d7a]"
          >
            Compartir
          </button>
          {addToCalendar && event.status === "scheduled" && (
            <Link
              href={addToCalendar}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Agregar al calendario
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
