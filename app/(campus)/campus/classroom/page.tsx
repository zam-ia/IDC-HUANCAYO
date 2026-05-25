import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCoursesForRole } from "@/lib/db";
import ClassroomGrid from "@/components/admin/ClassroomGrid";
import Link from "next/link";

type ClassroomPageProps = {
  searchParams?: Promise<{ view?: string }>;
};

export default async function ClassroomPage({
  searchParams,
}: ClassroomPageProps) {
  const session = await getServerSession(authOptions);
  const params = searchParams ? await searchParams : {};
  const role = session?.user?.role || "miembro";
  const isAdmin = role === "admin";
  const isStudentPreview = isAdmin && params.view === "student";
  const effectiveRole = isStudentPreview ? "miembro" : role;
  const courses = await getCoursesForRole(effectiveRole);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aula</h2>
          <p className="mt-1 text-sm text-gray-500">
            {isAdmin
              ? isStudentPreview
                ? "Estas viendo el aula como estudiante. Los controles administrativos se ocultan en esta vista."
                : "Administra cursos, modulos y lecciones del campus."
              : "Continua con los cursos disponibles para tu formacion."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <>
              <Link
                href={
                  isStudentPreview
                    ? "/campus/classroom"
                    : "/campus/classroom?view=student"
                }
                className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-[13px] font-semibold transition ${
                  isStudentPreview
                    ? "bg-[#00498d] text-white hover:bg-[#003d7a]"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {isStudentPreview ? "Volver a administrador" : "Ver como estudiante"}
              </Link>
              <Link
                href="/admin/alumnos"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Revisar accesos
              </Link>
            </>
          )}
        </div>
      </div>
      <ClassroomGrid
        courses={courses}
        isAdminView={isAdmin && !isStudentPreview}
      />
    </div>
  );
}
