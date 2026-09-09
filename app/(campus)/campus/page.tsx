import Link from "next/link";

const benefits = [
  "Cursos de discipulado organizados por módulos",
  "Lecciones en video, lectura y recursos descargables",
  "Progreso personal guardado automáticamente",
  "Calendario de clases y actividades de la comunidad",
];

export const metadata = {
  title: "Campus virtual",
  description: "Aula virtual de IDC Huancayo para formación y discipulado.",
};

export default function CampusAboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <nav className="mb-6 flex items-center gap-2 text-[11px] font-medium text-gray-400">
        <Link href="/campus/classroom" className="transition-colors hover:text-[#00498d]">
          Aula
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-gray-600">Acerca del campus</span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-[#003b72] px-6 py-10 text-white shadow-lg shadow-[#00498d]/10 sm:px-10 sm:py-14 lg:px-14">
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-100">
            Formación IDC Huancayo
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Aprende a tu ritmo, desde cualquier dispositivo
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            El campus reúne cursos, lecciones y actividades en un espacio claro y sencillo. Entra al aula y continúa exactamente donde te quedaste.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/campus/classroom" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#00498d] transition-transform duration-200 hover:-translate-y-0.5">
              Ir a mis cursos
            </Link>
            <Link href="/campus/calendar" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Ver calendario
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00498d]">Todo en un solo lugar</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">Un aula pensada para concentrarte en aprender</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">✓</span>
                <p className="text-sm leading-6 text-gray-600">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00498d]">Cómo empezar</p>
          <ol className="mt-5 space-y-5">
            {[
              ["1", "Abre el aula", "Revisa los cursos disponibles para tu cuenta."],
              ["2", "Elige una lección", "El contenido se abre sólo cuando lo necesitas."],
              ["3", "Marca tu avance", "Tu progreso queda guardado para la próxima visita."],
            ].map(([number, title, description]) => (
              <li key={number} className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#00498d]/[0.07] text-sm font-bold text-[#00498d]">{number}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
