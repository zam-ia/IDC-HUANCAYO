import { getCourses } from "@/lib/db";
import ClassroomGrid from "@/components/admin/ClassroomGrid";

export default async function ClassroomPage() {
  const courses = await getCourses();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aula</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona tus cursos y módulos de aprendizaje
          </p>
        </div>
      </div>
      <ClassroomGrid courses={courses} />
    </div>
  );
}