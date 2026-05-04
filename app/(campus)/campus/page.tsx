"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const communityData = {
  name: "IDC Huancayo",
  description: "Comunidad de aprendizaje y crecimiento espiritual.",
  memberCount: 376,
  onlineCount: 10,
  adminCount: 8,
  price: "Acceso gratuito",
  instructor: "Pastor Rodríguez",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  benefits: [
    "Acceso a cursos de discipulado",
    "Sesiones en vivo semanales",
    "Comunidad privada de apoyo",
    "Recursos descargables",
    "Certificados de finalización",
  ],
};

export default function CampusAboutPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mb-6">
        <Link
          href="/campus"
          className="hover:text-[#00498d] transition-colors"
        >
          Campus
        </Link>
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-500">Acerca de</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ─── COLUMNA PRINCIPAL ─── */}
        <div className="lg:w-[65%]">
          <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/30 border border-gray-100/80 overflow-hidden">
            {/* Título */}
            <div className="p-6 pb-4">
              <h1 className="text-[1.5rem] font-bold text-gray-900 tracking-tight">
                {communityData.name}
              </h1>
            </div>

            {/* Video principal */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={communityData.videoUrl}
                title="Video de presentación"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Carrusel de miniaturas */}
            <div className="flex gap-2 p-4 overflow-x-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <button
                  key={i}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    i === 1
                      ? "border-[#00498d] shadow-sm shadow-[#00498d]/15"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  {i === 1 ? (
                    <div className="w-full h-full bg-[#00498d]/[0.06] flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-[#00498d]/[0.03]" />
                      <svg
                        className="w-5 h-5 text-[#00498d] relative"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#fafbfc] flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Metadatos */}
            <div className="flex flex-wrap items-center gap-5 px-6 pb-5 text-[12px] text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Privado
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {communityData.memberCount} miembros
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {communityData.price}
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#00498d]/[0.08] flex items-center justify-center text-[#00498d] text-[10px] font-semibold">
                  {communityData.instructor.charAt(0)}
                </div>
                Por {communityData.instructor}
              </span>
            </div>

            {/* Descripción y beneficios */}
            <div className="px-6 pb-6">
              <p className="text-[14px] text-gray-500/70 leading-relaxed mb-6 font-normal">
                Bienvenido a la comunidad de aprendizaje de IDC Huancayo. Aquí
                encontrarás cursos, recursos y una comunidad enfocada en tu
                crecimiento espiritual.
              </p>

              <h3 className="text-[16px] font-semibold text-gray-800 mb-4">
                Qué obtienes dentro
              </h3>
              <ul className="space-y-3">
                {communityData.benefits.map((benefit: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[13px] text-gray-600/80 group"
                  >
                    <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200/60 flex items-center justify-center flex-shrink-0 mt-px">
                      <svg
                        className="w-3 h-3 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── SIDEBAR ─── */}
        <div className="lg:w-[35%]">
          <div className="sticky top-24 bg-white rounded-2xl shadow-sm shadow-gray-200/30 border border-gray-100/80 overflow-hidden">
            {/* Banner decorativo */}
            <div className="h-32 bg-gradient-to-br from-[#001f3f] via-[#00498d] to-[#003366] relative overflow-hidden">
              {/* Círculos decorativos */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/[0.04] blur-md -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/[0.04] blur-md translate-y-1/2 -translate-x-1/2" />
              {/* Textura */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-soft-light" />
            </div>

            <div className="p-6">
              {/* Logo + Nombre */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#00498d] rounded-xl flex items-center justify-center shadow-sm shadow-[#00498d]/20 flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M10 5h4v4h4v4h-4v4h-4v-4H6v-4h4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-gray-900 leading-tight">
                    {communityData.name}
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {communityData.description}
                  </p>
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-3 my-5 py-5 border-y border-gray-100/80">
                <div className="text-center">
                  <span className="text-[1.25rem] font-bold text-gray-800 block">
                    {communityData.memberCount}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    Miembros
                  </span>
                </div>
                <div className="text-center border-x border-gray-100/80">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <span className="text-[1.25rem] font-bold text-gray-800">
                      {communityData.onlineCount}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    En línea
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[1.25rem] font-bold text-gray-800 block">
                    {communityData.adminCount}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    Admins
                  </span>
                </div>
              </div>

              {/* Avatares superpuestos */}
              <div className="flex -space-x-2 mb-5">
                {[...Array(8)].map((_, i: number) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00498d]/[0.08] to-[#00498d]/[0.04] border-2 border-white shadow-sm flex items-center justify-center"
                    style={{ zIndex: 8 - i }}
                  >
                    <span className="text-[10px] font-semibold text-[#00498d]/50">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-[#00498d]/[0.05] border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-semibold text-[#00498d]/50">
                  +{communityData.memberCount - 8}
                </div>
              </div>

              {/* Botón dinámico según sesión */}
              {session ? (
                <Link
                  href="/campus/configuracion"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-200/80 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-[#fafbfc] hover:border-gray-300 hover:text-gray-800 transition-all duration-300 group"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Configuración
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full bg-[#00498d] text-white py-2.5 px-4 rounded-xl text-[13px] font-semibold hover:bg-[#003d7a] transition-all duration-300 shadow-sm shadow-[#00498d]/15 hover:shadow-md hover:shadow-[#00498d]/20 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  Adquirir el programa
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}