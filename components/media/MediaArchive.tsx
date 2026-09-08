import Link from "next/link";
import type { PublicMediaAsset } from "@/lib/media";

export default function MediaArchive({
  assets,
  title,
  description,
  kind,
}: {
  assets: PublicMediaAsset[];
  title: string;
  description: string;
  kind: string;
}) {
  return (
    <section className="bg-[#f4f7fa] pb-32 pt-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00498d]">Biblioteca de medios</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">{description}</p>
        {assets.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => (
              <article key={asset.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00498d]">{kind}</p>
                <h2 className="mt-3 text-xl font-bold text-gray-900">{asset.title}</h2>
                <p className="mt-2 text-sm text-gray-500">{asset.speaker || asset.description || "IDC Huancayo"}</p>
                {asset.playbackUrl && <Link href={asset.playbackUrl} className="mt-6 inline-flex text-sm font-bold text-[#00498d]">Reproducir →</Link>}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm leading-6 text-gray-500">El contenido aparecerá aquí cuando sea publicado desde la biblioteca de medios.</p>
        )}
      </div>
    </section>
  );
}
