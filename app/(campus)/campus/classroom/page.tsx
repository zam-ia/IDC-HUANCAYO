import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCoursesForRole } from "@/lib/db";
import ClassroomGrid from "@/components/admin/ClassroomGrid";

export default async function ClassroomPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || "miembro";
  const isAdmin = role === "admin";
  const courses = await getCoursesForRole(role);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aula</h2>
          <p className="mt-1 text-sm text-gray-500">
            {isAdmin
              ? "Administra cursos, módulos y lecciones del campus."
              : "Continúa con los cursos disponibles para tu formación."}
          </p>
        </div>
        {isAdmin && (
          <a
            href="/admin/alumnos"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
          >
            Revisar accesos
          </a>
        )}
      </div>
      <ClassroomGrid courses={courses} isAdminView={isAdmin} />
    </div>
  );
}
