"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RadioNowPlaying } from "@/types/media";

const initialRadio: RadioNowPlaying = {
  stationName: "IDC Radio Huancayo",
  isOnline: false,
  isLive: false,
  listeners: 0,
  streamUrl: null,
  current: null,
  history: [],
  liveHost: null,
  updatedAt: "",
};

const volumeStorageKey = "idc-radio-volume:v1";

interface RadioContextValue {
  nowPlaying: RadioNowPlaying;
  isPlaying: boolean;
  isMinimized: boolean;
  volume: number;
  togglePlayback: () => Promise<void>;
  setVolume: (volume: number) => void;
  setMinimized: (minimized: boolean) => void;
  refresh: () => Promise<void>;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export function useRadio() {
  const context = useContext(RadioContext);
  if (!context) throw new Error("useRadio debe usarse dentro de RadioProvider");
  return context;
}

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function RadioDock() {
  const {
    nowPlaying,
    isPlaying,
    isMinimized,
    volume,
    togglePlayback,
    setVolume,
    setMinimized,
  } = useRadio();
  const trackTitle = nowPlaying.current?.title || "Programación de IDC Radio";
  const trackArtist =
    nowPlaying.liveHost || nowPlaying.current?.artist || nowPlaying.stationName;

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#00498d] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-[#00498d]/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#003d7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00498d] focus-visible:ring-offset-2 sm:left-5"
        aria-label="Abrir reproductor de radio"
      >
        <span className="relative flex h-2.5 w-2.5">
          {nowPlaying.isOnline && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
          )}
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        Radio
      </button>
    );
  }

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-[#07233d]/95 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
      aria-label="Reproductor persistente de IDC Radio"
    >
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center gap-3 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={togglePlayback}
          disabled={!nowPlaying.streamUrl}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#00498d] shadow-lg shadow-black/10 transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={isPlaying ? "Pausar radio" : "Reproducir radio"}
        >
          <PlayIcon playing={isPlaying} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                nowPlaying.isOnline ? "bg-emerald-400" : "bg-amber-300"
              }`}
            />
            <p className="truncate text-sm font-semibold">{trackTitle}</p>
          </div>
          <p className="mt-0.5 truncate text-xs text-white/55">
            {nowPlaying.streamUrl
              ? trackArtist
              : "Configura AzuraCast para habilitar la señal"}
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <svg className="h-4 w-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5 6 9H3v6h3l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="w-24 accent-white"
            aria-label="Volumen de la radio"
          />
        </div>

        <Link
          href="/radio"
          className="hidden rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 sm:block"
        >
          Ver radio
        </Link>
        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Minimizar reproductor"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeWidth="2" d="M6 12h12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default function RadioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [nowPlaying, setNowPlaying] = useState(initialRadio);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setMinimized] = useState(false);
  const [volume, setVolumeState] = useState(0.8);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/radio/now-playing", {
        cache: "no-store",
      });
      if (!response.ok) return;
      setNowPlaying((await response.json()) as RadioNowPlaying);
    } catch {
      // El reproductor conserva el último estado conocido durante cortes breves.
    }
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(() => void refresh(), 0);
    const interval = window.setInterval(() => void refresh(), 30_000);
    return () => {
      window.clearTimeout(initialRefresh);
      window.clearInterval(interval);
    };
  }, [refresh]);

  useEffect(() => {
    const loadStoredVolume = window.setTimeout(() => {
      try {
        const storedVolume = window.localStorage.getItem(volumeStorageKey);
        if (storedVolume === null) return;
        const parsed = Number(storedVolume);
        if (Number.isFinite(parsed))
          setVolumeState(Math.min(1, Math.max(0, parsed)));
      } catch {
        // La radio sigue funcionando si el navegador bloquea localStorage.
      }
    }, 0);
    return () => window.clearTimeout(loadStoredVolume);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const setVolume = useCallback((nextVolume: number) => {
    const safeVolume = Math.min(1, Math.max(0, nextVolume));
    setVolumeState(safeVolume);
    try {
      window.localStorage.setItem(volumeStorageKey, String(safeVolume));
    } catch {
      // El volumen actual se mantiene en memoria.
    }
  }, []);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !nowPlaying.streamUrl) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [nowPlaying.streamUrl]);

  const value = useMemo(
    () => ({
      nowPlaying,
      isPlaying,
      isMinimized,
      volume,
      togglePlayback,
      setVolume,
      setMinimized,
      refresh,
    }),
    [
      nowPlaying,
      isPlaying,
      isMinimized,
      volume,
      togglePlayback,
      setVolume,
      refresh,
    ]
  );

  return (
    <RadioContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={nowPlaying.streamUrl || undefined}
        preload="none"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
      />
      <RadioDock />
    </RadioContext.Provider>
  );
}
