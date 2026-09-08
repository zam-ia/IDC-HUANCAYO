import type { Metadata } from "next";
import PublicLayout from "@/components/layouts/PublicLayout";
import LiveExperience from "@/components/media/LiveExperience";
import { getPublicLiveEvent } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "En vivo",
  description:
    "Mira la señal oficial y las transmisiones de la Iglesia Discípulos de Cristo Huancayo.",
  openGraph: {
    title: "IDC Huancayo en vivo",
    description: "Acompáñanos en nuestra próxima transmisión.",
    type: "video.other",
  },
};

export default async function EnVivoPage() {
  const event = await getPublicLiveEvent();

  return (
    <PublicLayout>
      <section className="bg-[#f4f7fa] pb-28 pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00498d]">Centro de medios</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-5xl">Transmisión oficial</h1>
            <p className="mt-4 text-base leading-7 text-gray-500">Una señal independiente para seguir cada servicio desde cualquier dispositivo.</p>
          </div>
          <LiveExperience initialEvent={event} />
        </div>
      </section>
    </PublicLayout>
  );
}
