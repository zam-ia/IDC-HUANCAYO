"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

function getVideoDetails(value: string) {
  try {
    const url = new URL(value);
    let youtubeId: string | null = null;
    if (url.hostname === "youtu.be") youtubeId = url.pathname.slice(1).split("/")[0];
    if (url.hostname.includes("youtube.com")) {
      youtubeId = url.searchParams.get("v") || url.pathname.split("/embed/")[1]?.split("/")[0] || null;
    }
    if (youtubeId) {
      return {
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`,
        thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
      };
    }
    return url.protocol === "https:"
      ? { embedUrl: url.toString(), thumbnailUrl: null }
      : null;
  } catch {
    return null;
  }
}

export default function LessonVideo({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const video = useMemo(() => getVideoDetails(url), [url]);
  if (!video) return null;

  return (
    <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-[#082f53] shadow-sm">
      {playing ? (
        <iframe
          src={video.embedUrl}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex w-full items-center justify-center overflow-hidden"
          aria-label={`Reproducir ${title}`}
        >
          {video.thumbnailUrl ? (
            <Image
              src={video.thumbnailUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#00498d] to-[#001f3f]" />
          )}
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-[#00498d] shadow-xl transition-transform group-hover:scale-105" aria-hidden="true">
            ▶
          </span>
          <span className="sr-only">El video externo se cargará al reproducirlo</span>
        </button>
      )}
    </div>
  );
}
