"use client";

import { useRadio } from "@/components/media/RadioProvider";
import type { RadioNowPlaying, RadioScheduleItem } from "@/types/media";

const weekdays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export default function RadioPageContent({
  initialNowPlaying,
  schedule,
}: {
  initialNowPlaying: RadioNowPlaying;
  schedule: RadioScheduleItem[];
}) {
  const radio = useRadio();
  const data = radio.nowPlaying.updatedAt ? radio.nowPlaying : initialNowPlaying;

  return (
    <>
      <section className="overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_right,#1d6595,#07233d_62%)] px-6 py-10 text-white shadow-2xl shadow-slate-950/20 sm:px-10 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
              <span className={`h-2.5 w-2.5 rounded-full ${data.isOnline ? "animate-pulse bg-emerald-400" : "bg-amber-300"}`} />
              {data.isOnline ? "Señal disponible 24/7" : "Señal en configuración"}
            </div>
            <p className="mt-5 text-sm text-white/55">Ahora suena</p>
            <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              {data.current?.title || data.stationName}
            </h1>
            <p className="mt-3 text-lg text-white/65">
              {data.liveHost
                ? `En vivo con ${data.liveHost}`
                : data.current?.artist || "Música, prédicas y devocionales para acompañarte"}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={radio.togglePlayback}
                disabled={!data.streamUrl}
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#00498d] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {radio.isPlaying ? "Pausar radio" : "Escuchar ahora"}
              </button>
              {data.isOnline && (
                <span className="text-sm text-white/55">
                  {data.listeners} {data.listeners === 1 ? "oyente" : "oyentes"} ahora
                </span>
              )}
            </div>
          </div>
          <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner sm:h-56 sm:w-56">
            <svg className="h-24 w-24 text-sky-300/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
              <path strokeLinecap="round" strokeWidth="1.25" d="M9.5 9.5a3.5 3.5 0 0 1 5 5M7 7a7 7 0 0 1 10 10M12 12h.01" />
            </svg>
          </div>
        </div>
      </section>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00498d]">Programación</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950">Parrilla semanal</h2>
          {schedule.length ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              {schedule.map((item) => (
                <article key={item.id} className="grid grid-cols-[92px_1fr] gap-4 border-b border-gray-100 px-5 py-4 last:border-0">
                  <div className="text-sm font-semibold text-[#00498d]">
                    <p>{weekdays[item.weekday]}</p>
                    <p className="mt-1 text-xs text-gray-400">{item.startTime.slice(0, 5)}–{item.endTime.slice(0, 5)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.program.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.program.host || item.program.description || "Programación de IDC Radio"}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm leading-6 text-gray-500">
              La parrilla se publicará desde el panel de radio cuando los programas estén configurados.
            </p>
          )}
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00498d]">Historial</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950">Recién sonó</h2>
          {data.history.length ? (
            <ol className="mt-6 space-y-3">
              {data.history.map((track, index) => (
                <li key={`${track.title}-${track.playedAt || index}`} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-[#00498d]">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">{track.title}</p>
                    <p className="truncate text-sm text-gray-500">{track.artist || data.stationName}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm leading-6 text-gray-500">
              El historial aparecerá automáticamente al conectar la API pública de AzuraCast.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
