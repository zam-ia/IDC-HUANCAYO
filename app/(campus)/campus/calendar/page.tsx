import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCampusEvents, getCoursesForRole } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) return "Fecha por confirmar";

  return new Date(value).toLocaleDateString("es-PE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value: string | null) {
  if (!value) return "Hora por confirmar";

  return new Date(value).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getMonthDays(referenceDate: Date) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7));

  return Array.from({ length: 35 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

function dateKey(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toISOString().slice(0, 10);
}

export default async function CampusCalendarPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || "miembro";
  const isAdmin = role === "admin";
  const [events, courses] = await Promise.all([
    getCampusEvents(),
    getCoursesForRole(role),
  ]);

  const today = new Date();
  const days = getMonthDays(today);
  const eventsByDate = events.reduce<Record<string, typeof events>>(
    (acc, event) => {
      if (!event.published_at) return acc;
      const key = dateKey(event.published_at);
      acc[key] = [...(acc[key] || []), event];
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00498d]/70">
            Agenda del campus
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Organiza clases, reuniones y eventos de la comunidad en un solo
            lugar. Los estudiantes solo ven actividades publicadas.
          </p>
        </div>
        {isAdmin && (
          <Link
            href="/admin/noticias"
            className="inline-flex items-center justify-center rounded-lg bg-[#00498d] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#003d7a]"
          >
            Programar evento
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">
                {today.toLocaleDateString("es-PE", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <p className="mt-0.5 text-[12px] text-gray-500">
                Vista mensual de actividades publicadas.
              </p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-500">
              {events.length} eventos
            </span>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day) => (
              <div key={day} className="px-2 py-3">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((day) => {
              const key = dateKey(day);
              const dayEvents = eventsByDate[key] || [];
              const isCurrentMonth = day.getMonth() === today.getMonth();
              const isToday = key === dateKey(today);

              return (
                <div
                  key={key}
                  className={`min-h-28 border-b border-r border-gray-100 p-2 ${
                    isCurrentMonth ? "bg-white" : "bg-gray-50/60"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-semibold ${
                        isToday
                          ? "bg-[#00498d] text-white"
                          : isCurrentMonth
                            ? "text-gray-700"
                            : "text-gray-300"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <Link
                        key={event.id}
                        href={`/noticias/${event.slug}`}
                        className="block truncate rounded-md bg-[#00498d]/[0.06] px-2 py-1 text-[11px] font-medium text-[#00498d] hover:bg-[#00498d]/[0.1]"
                      >
                        {event.title}
                      </Link>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="block px-2 text-[10px] font-medium text-gray-400">
                        +{dayEvents.length - 2} mas
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-[15px] font-semibold text-gray-900">
              Proximas actividades
            </h2>
            <div className="mt-4 space-y-3">
              {events.length > 0 ? (
                events.slice(0, 5).map((event) => (
                  <Link
                    key={event.id}
                    href={`/noticias/${event.slug}`}
                    className="block rounded-xl border border-gray-100 p-4 transition hover:border-gray-200 hover:bg-gray-50"
                  >
                    <p className="text-[13px] font-semibold text-gray-900">
                      {event.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-medium text-gray-500">
                      <span>{formatDate(event.published_at)}</span>
                      <span>{formatTime(event.published_at)}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-[13px] text-gray-500">
                  No hay eventos publicados en el calendario.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-[15px] font-semibold text-gray-900">
              Cursos vinculados
            </h2>
            <p className="mt-1 text-[12px] leading-5 text-gray-500">
              Usa esta lista para enlazar clases presenciales o virtuales con
              el contenido del aula.
            </p>
            <div className="mt-4 space-y-2">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/campus/classroom/${course.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 text-[13px] font-medium text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                >
                  <span className="truncate">{course.title}</span>
                  <span className="ml-3 flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                    {course.is_published ? "Publicado" : "Borrador"}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
