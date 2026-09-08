import type { Metadata } from "next";
import PublicLayout from "@/components/layouts/PublicLayout";
import RadioPageContent from "@/components/media/RadioPageContent";
import { getRadioNowPlaying, getRadioSchedule } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IDC Radio",
  description:
    "Escucha IDC Radio Huancayo 24/7 y consulta la programación semanal.",
  openGraph: {
    title: "IDC Radio Huancayo",
    description: "Música, prédicas, programas y devocionales las 24 horas.",
    type: "website",
  },
};

export default async function RadioPage() {
  const [nowPlaying, schedule] = await Promise.all([
    getRadioNowPlaying(),
    getRadioSchedule(),
  ]);

  return (
    <PublicLayout>
      <main className="bg-[#f4f7fa] pb-36 pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <RadioPageContent initialNowPlaying={nowPlaying} schedule={schedule} />
        </div>
      </main>
    </PublicLayout>
  );
}
