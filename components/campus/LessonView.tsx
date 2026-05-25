"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { useLessonProgress } from "@/hooks/useLessonProgress";

interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url: string | null;
  is_published: boolean;
  completed?: boolean;
}

type PanelType = "info" | "video" | "resources" | "settings" | null;

export default function LessonView({ lesson }: { lesson: Lesson }) {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";
  const { completed, loading: progressLoading, toggleCompleted } = useLessonProgress(lesson.id);

  // Modo edición (barra de herramientas visible solo si admin activa el lápiz)
  const [isEditMode, setIsEditMode] = useState(false);

  // Estado principal de edición (panel lateral)
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Estados de los campos
  const [title, setTitle] = useState(lesson.title);
  const [content, setContent] = useState(lesson.content || "");
  const [videoUrl, setVideoUrl] = useState(lesson.video_url || "");
  const [published, setPublished] = useState(lesson.is_published);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Estados para recursos simulados
  const [resources, setResources] = useState<string[]>([]);
  const [newResource, setNewResource] = useState("");

  // Referencia para cerrar panel al hacer clic fuera
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClosePanel = useCallback(() => {
    if (isDirty) {
      const confirmClose = window.confirm(
        "Tienes cambios sin guardar. ¿Estás seguro de cerrar?"
      );
      if (!confirmClose) return;
    }

    setTitle(lesson.title);
    setContent(lesson.content || "");
    setVideoUrl(lesson.video_url || "");
    setPublished(lesson.is_published);
    setActivePanel(null);
    setIsDirty(false);
  }, [
    isDirty,
    lesson.content,
    lesson.is_published,
    lesson.title,
    lesson.video_url,
  ]);

  // Cerrar panel con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClosePanel();
      }
    };
    if (activePanel) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePanel, handleClosePanel]);

  // Resetear estados cuando cambia la lección
  useEffect(() => {
    setTitle(lesson.title);
    setContent(lesson.content || "");
    setVideoUrl(lesson.video_url || "");
    setPublished(lesson.is_published);
    setIsDirty(false);
    setActivePanel(null);
    setIsEditMode(false);
    setResources([]);
    setNewResource("");
  }, [lesson.content, lesson.id, lesson.is_published, lesson.title, lesson.video_url]);

  const handleOpenPanel = (panel: PanelType) => {
    setActivePanel(panel);
    setIsDirty(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    const { error } = await supabase
      .from("lessons")
      .update({
        title,
        content,
        video_url: videoUrl || null,
        is_published: published,
      })
      .eq("id", lesson.id);

    if (!error) {
      setSaveSuccess(true);
      setIsDirty(false);
      setTimeout(() => {
        setActivePanel(null);
        setSaveSuccess(false);
      }, 1000);
    }
    setSaving(false);
  };

  const handleAddResource = () => {
    if (newResource.trim()) {
      setResources([...resources, newResource.trim()]);
      setNewResource("");
      setIsDirty(true);
    }
  };

  const handleRemoveResource = (index: number) => {
    const updated = resources.filter((_, i) => i !== index);
    setResources(updated);
    setIsDirty(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/30 border border-gray-100/80 overflow-hidden">
      {/* ── Cabecera con barra de herramientas ── */}
      <div className="border-b border-gray-100/80 bg-white sticky top-0 z-20">
        {/* Fila superior: título + acciones principales */}
        <div className="p-6 sm:p-8 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {activePanel === "info" ? (
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  className="text-[1.5rem] font-bold text-gray-900 w-full border-b-2 border-[#00498d]/40 pb-1.5 outline-none focus:border-[#00498d] transition-colors placeholder:text-gray-400 bg-transparent"
                  placeholder="Título de la lección"
                  autoFocus
                />
              ) : (
                <h1 className="text-[1.35rem] sm:text-[1.5rem] font-bold text-gray-900 tracking-tight">
                  {lesson.title}
                </h1>
              )}
            </div>

            {/* Acciones principales: checkpoint siempre visible + lápiz para admin */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Checkpoint (completar) – visible para todos los usuarios con sesión */}
              {session && (
                <button
                  onClick={toggleCompleted}
                  disabled={progressLoading}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 group ${
                    completed
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-gray-200/80 hover:bg-[#fafbfc] hover:border-gray-300"
                  }`}
                  title={completed ? "Lección completada" : "Marcar como completada"}
                >
                  {progressLoading ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                  ) : completed ? (
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-[#00498d] transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* Botón de editar (admin) – muestra/oculta la barra de herramientas */}
              {isAdmin && (
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                    isEditMode
                      ? "bg-[#00498d] text-white border-[#00498d] shadow-sm"
                      : "border-gray-200/80 hover:bg-[#fafbfc] hover:border-gray-300 text-gray-500"
                  }`}
                  title={isEditMode ? "Cerrar edición" : "Editar lección"}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Badge de estado + indicador de cambios */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {isAdmin && (
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md border ${
                  lesson.is_published
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                    : "bg-amber-50 text-amber-700 border-amber-200/60"
                }`}
              >
                {lesson.is_published ? "Publicado" : "Borrador"}
              </span>
            )}
            {session && !isAdmin && (
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md border ${
                  completed
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                    : "bg-gray-50 text-gray-500 border-gray-200/60"
                }`}
              >
                {completed ? "Completado" : "Pendiente"}
              </span>
            )}
            {activePanel && (
              <span className="text-[10px] font-medium text-[#00498d] bg-[#00498d]/[0.05] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00498d] animate-pulse" />
                Modo edición
              </span>
            )}
            {isDirty && (
              <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                Cambios sin guardar
              </span>
            )}
          </div>
        </div>

        {/* ── Barra de herramientas (admin) – SOLO visible si isEditMode es true ── */}
        {isAdmin && isEditMode && (
          <div className="px-6 sm:px-8 pb-4 flex items-center gap-1.5 overflow-x-auto border-b border-gray-100/80 -mb-px">
            {[
              {
                id: "info" as PanelType,
                label: "Información",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
                description: "Editar título y contenido",
              },
              {
                id: "video" as PanelType,
                label: "Video",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                description: "Configurar URL del video",
              },
              {
                id: "resources" as PanelType,
                label: "Recursos",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                ),
                description: "Administrar archivos descargables",
              },
              {
                id: "settings" as PanelType,
                label: "Ajustes",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                description: "Visibilidad y publicación",
              },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() =>
                  activePanel === tool.id
                    ? handleClosePanel()
                    : handleOpenPanel(tool.id)
                }
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all duration-200 border ${
                  activePanel === tool.id
                    ? "bg-[#00498d] text-white border-[#00498d] shadow-sm shadow-[#00498d]/20"
                    : "text-gray-600 border-gray-200/60 hover:bg-[#fafbfc] hover:border-gray-300 hover:text-gray-800"
                }`}
                title={tool.description}
              >
                {tool.icon}
                {tool.label}
                {activePanel === tool.id && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Contenido principal (vista previa) ── */}
      <div className="relative">
        {/* Overlay sutil cuando hay panel abierto */}
        {activePanel && (
          <div
            className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center"
            onClick={handleClosePanel}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#00498d]/[0.06] flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 text-[#00498d]/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <p className="text-[14px] font-medium text-gray-500">
                Editando en el panel lateral
              </p>
              <p className="text-[12px] text-gray-400 mt-1">
                Haz clic fuera o presiona Esc para cerrar
              </p>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Video */}
          {lesson.video_url ? (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-8 shadow-sm">
              <iframe
                src={lesson.video_url}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : lesson.content ? (
            /* Contenido de lectura */
            <div className="p-6 bg-[#fafbfc] border border-gray-100/80 rounded-xl mb-8">
              <div className="text-[14px] text-gray-600/90 leading-relaxed font-normal whitespace-pre-line">
                {lesson.content}
              </div>
            </div>
          ) : (
            /* Estado sin contenido */
            <div className="text-center py-12 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#00498d]/[0.04] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-[#00498d]/25"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-[14px] text-gray-500/70 font-normal">
                {isAdmin
                  ? "Usa el lápiz para agregar contenido"
                  : "Sin contenido aún"}
              </p>
            </div>
          )}

          {/* Recursos */}
          <div>
            <h3 className="text-[13px] font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              Recursos
            </h3>
            {resources.length > 0 ? (
              <ul className="space-y-1.5">
                {resources.map((resource, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-[13px] text-[#00498d] font-medium hover:bg-[#00498d]/[0.03] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.05] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-[#00498d]/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="flex-1">{resource}</span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-[#00498d] group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-gray-400 font-medium">
                Recursos disponibles próximamente
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Panel lateral de edición ── */}
      {activePanel && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClosePanel();
          }}
        >
          {/* Fondo oscuro con blur */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300" />

          {/* Panel deslizante */}
          <div
            ref={panelRef}
            className="relative w-full max-w-lg bg-white shadow-2xl shadow-black/10 h-full overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del panel */}
            <div className="sticky top-0 bg-white border-b border-gray-100/80 p-6 flex items-center justify-between z-10">
              <div>
                <h3 className="text-[16px] font-bold text-gray-900">
                  {activePanel === "info" && "Editar información"}
                  {activePanel === "video" && "Configurar video"}
                  {activePanel === "resources" && "Administrar recursos"}
                  {activePanel === "settings" && "Ajustes de publicación"}
                </h3>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  {activePanel === "info" && "Modifica el título y contenido de la lección"}
                  {activePanel === "video" && "Agrega o cambia la URL del video de YouTube"}
                  {activePanel === "resources" && "Sube y organiza archivos descargables"}
                  {activePanel === "settings" && "Controla la visibilidad de esta lección"}
                </p>
              </div>
              <button
                onClick={handleClosePanel}
                className="w-10 h-10 rounded-xl border border-gray-200/80 flex items-center justify-center hover:bg-[#fafbfc] hover:border-gray-300 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del panel según tipo */}
            <div className="p-6 space-y-5">
              {/* ── Panel: Información ── */}
              {activePanel === "info" && (
                <>
                  <div>
                    <label className="text-[13px] font-semibold text-gray-700 mb-2 block">
                      Título de la lección
                    </label>
                    <input
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#00498d]/40 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300"
                      placeholder="Ej: ¿Qué es la oración?"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-gray-700 mb-2 block">
                      Contenido de la lección
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full border border-gray-200/80 rounded-xl p-4 text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#00498d]/40 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300 min-h-[200px] resize-y"
                      placeholder="Escribe el contenido completo de la lección aquí..."
                    />
                  </div>
                </>
              )}

              {/* ── Panel: Video ── */}
              {activePanel === "video" && (
                <div>
                  <label className="text-[13px] font-semibold text-gray-700 mb-2 block">
                    URL del video (YouTube)
                  </label>
                  <div className="relative mb-3">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      value={videoUrl}
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-xl text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#00498d]/40 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300"
                      placeholder="https://www.youtube.com/embed/..."
                    />
                  </div>
                  {videoUrl && (
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                      <iframe
                        src={videoUrl}
                        title="Vista previa"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ── Panel: Recursos ── */}
              {activePanel === "resources" && (
                <>
                  <div>
                    <label className="text-[13px] font-semibold text-gray-700 mb-2 block">
                      Agregar recurso
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={newResource}
                        onChange={(e) => setNewResource(e.target.value)}
                        className="flex-1 border border-gray-200/80 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#00498d]/40 focus:ring-2 focus:ring-[#00498d]/[0.08] transition-all duration-300"
                        placeholder="Nombre del archivo (ej: guia-oracion.pdf)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddResource();
                        }}
                      />
                      <button
                        onClick={handleAddResource}
                        className="px-4 py-2.5 bg-[#00498d] text-white text-[13px] font-medium rounded-xl hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar
                      </button>
                    </div>
                  </div>

                  {resources.length > 0 && (
                    <div>
                      <label className="text-[13px] font-semibold text-gray-700 mb-2 block">
                        Recursos actuales ({resources.length})
                      </label>
                      <ul className="space-y-1.5">
                        {resources.map((resource, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-[#fafbfc] border border-gray-100/80"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#00498d]/[0.05] flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-[#00498d]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="flex-1 text-[13px] text-gray-700 font-medium">
                              {resource}
                            </span>
                            <button
                              onClick={() => handleRemoveResource(idx)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {/* ── Panel: Ajustes ── */}
              {activePanel === "settings" && (
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200/80 rounded-xl cursor-pointer hover:bg-[#fafbfc] transition-colors">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => {
                        setPublished(e.target.checked);
                        setIsDirty(true);
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-[#00498d] focus:ring-[#00498d]/20 transition-colors cursor-pointer"
                    />
                    <div>
                      <span className="text-[14px] font-semibold text-gray-800 block">
                        Lección publicada
                      </span>
                      <span className="text-[12px] text-gray-500">
                        Visible para todos los estudiantes del curso
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {/* ── Botones de acción ── */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100/80">
                <button
                  onClick={handleClosePanel}
                  className="px-5 py-2.5 text-[13px] font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !isDirty}
                  className="px-5 py-2.5 bg-[#00498d] text-white text-[13px] font-medium rounded-xl hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Guardando...
                    </>
                  ) : saveSuccess ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Guardado!
                    </>
                  ) : (
                    "Guardar cambios"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
