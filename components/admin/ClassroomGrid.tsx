"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CourseEditModal from "./CourseEditModal";

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  is_free: boolean;
  price: number;
  is_published: boolean;
}

export default function ClassroomGrid({ courses }: { courses: Course[] }) {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleShareLink = (slug: string) => {
    const url = `${window.location.origin}/campus/classroom/${slug}`;
    navigator.clipboard.writeText(url);
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
    setOpenMenuId(null);
  };

  const handleDuplicate = async (course: Course) => {
    setEditingCourse(course);
    setOpenMenuId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="relative group/card">
            <Link
              href={`/campus/classroom/${course.slug}`}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 block ${
                !course.is_published ? "opacity-70" : ""
              }`}
            >
              {/* Portada */}
              <div className="relative h-44 bg-gradient-to-br from-[#00498d]/10 via-[#00498d]/5 to-gray-100 overflow-hidden">
                {!course.is_published && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-600 text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                    Borrador
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#00498d]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] bg-[#00498d]/[0.06] text-[#00498d] px-2.5 py-1 rounded-lg">
                    {course.is_free ? "Gratuito" : `$${course.price}`}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight leading-tight">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {course.description || "Sin descripción"}
                </p>
              </div>
            </Link>

            {/* Menú de tres puntos (admin) */}
            {isAdmin && (
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === course.id ? null : course.id);
                  }}
                  className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-200 opacity-0 group-hover/card:opacity-100"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </button>

                {/* Dropdown del menú contextual */}
                {openMenuId === course.id && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setOpenMenuId(null)}
                    />
                    <div className="absolute right-0 top-10 z-30 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 animate-in slide-in-from-top-2 duration-150">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditingCourse(course);
                          setOpenMenuId(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar curso
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenMenuId(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Mover
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDuplicate(course);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Duplicar curso
                      </button>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleShareLink(course.slug);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.368-2.684 3 3 0 00-5.368 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Compartir enlace
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {editingCourse && (
        <CourseEditModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
        />
      )}

      {/* Toast de enlace copiado */}
      {showCopyToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-200 z-50">
          Enlace copiado al portapapeles
        </div>
      )}
    </>
  );
}