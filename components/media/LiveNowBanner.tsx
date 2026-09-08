"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PublicLiveEvent } from "@/types/media";

export default function LiveNowBanner() {
  const [event, setEvent] = useState<PublicLiveEvent | null>(null);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch("/api/live/status", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as PublicLiveEvent;
        if (active) setEvent(payload.status === "live" ? payload : null);
      } catch {
        if (active) setEvent(null);
      }
    };
    void refresh();
    const interval = window.setInterval(() => void refresh(), 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  if (!event) return null;

  return (
    <section className="bg-red-600 text-white" aria-label="Transmisión activa">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center lg:px-12">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Estamos en vivo</p>
            <p className="mt-0.5 text-sm text-white/80">{event.title}</p>
          </div>
        </div>
        <Link href="/en-vivo" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-700">
          Ver transmisión
        </Link>
      </div>
    </section>
  );
}
