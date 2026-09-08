import type { Metadata } from "next";
import PublicLayout from "@/components/layouts/PublicLayout";
import { getPublicLiveEvent, getRadioSchedule } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programación",
  description: "Agenda de transmisiones y programas de IDC Radio Huancayo.",
};

const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export default async function ProgramacionPage() {
  const [live, schedule] = await Promise.all([getPublicLiveEvent(), getRadioSchedule()]);
  return (
    <PublicLayout>
      <main className="bg-[#f4f7fa] pb-32 pt-14">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00498d]">Hora de Huancayo</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">Programación</h1>
          <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-wide text-[#00498d]">Próxima transmisión</p><h2 className="mt-3 text-2xl font-bold text-gray-900">{live.title}</h2><p className="mt-2 text-sm text-gray-500">{live.scheduledAt ? new Intl.DateTimeFormat("es-PE", { dateStyle: "full", timeStyle: "short", timeZone: "America/Lima" }).format(new Date(live.scheduledAt)) : "La próxima fecha se anunciará pronto."}</p></section>
          <section className="mt-10"><h2 className="text-2xl font-bold text-gray-950">IDC Radio</h2><div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white">{schedule.length ? schedule.map((item) => <article key={item.id} className="grid grid-cols-[110px_1fr] gap-4 border-b border-gray-100 px-5 py-4 last:border-0"><div><p className="text-sm font-bold text-[#00498d]">{weekdays[item.weekday]}</p><p className="mt-1 text-xs text-gray-400">{item.startTime.slice(0, 5)}–{item.endTime.slice(0, 5)}</p></div><div><h3 className="font-bold text-gray-900">{item.program.name}</h3><p className="mt-1 text-sm text-gray-500">{item.program.host || item.program.description}</p></div></article>) : <p className="p-8 text-center text-sm text-gray-500">La parrilla estará disponible cuando sea publicada desde el panel de radio.</p>}</div></section>
        </div>
      </main>
    </PublicLayout>
  );
}
