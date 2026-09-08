import Link from "next/link";
import type { PublicMediaAsset } from "@/lib/media";

export default function MediaLibraryPreview({ assets }: { assets: PublicMediaAsset[] }) {
  if (!assets.length) return null;
  return (
    <section className="bg-[#f4f7fa] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00498d]">Biblioteca</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">Mensajes recientes</h2></div>
          <Link href="/predicaciones" className="hidden text-sm font-semibold text-[#00498d] sm:block">Ver biblioteca →</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {assets.map((asset) => (
            <article key={asset.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_top,#e0f2fe,#dbeafe)]">
                <svg className="h-12 w-12 text-[#00498d]/45" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m10 8 6 4-6 4V8Z" /><circle cx="12" cy="12" r="9" strokeWidth="1.5" /></svg>
              </div>
              <div className="p-5"><p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00498d]">{asset.type}</p><h3 className="mt-2 text-lg font-bold text-gray-900">{asset.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">{asset.speaker || asset.description || "Contenido de IDC Huancayo"}</p>{asset.playbackUrl && <Link href={asset.playbackUrl} className="mt-5 inline-flex text-sm font-semibold text-[#00498d]">Reproducir →</Link>}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
