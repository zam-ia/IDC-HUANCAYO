"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-20 h-9 rounded-xl bg-gray-100 animate-pulse" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-[14px] text-gray-600 hover:text-[#00498d] transition-colors font-medium"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/signup"
          className="text-[14px] bg-[#00498d] text-white px-5 py-2.5 rounded-xl hover:bg-[#003d7a] transition-all duration-200 font-medium shadow-sm shadow-[#00498d]/15"
        >
          Comenzar ahora
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/campus/classroom"
        className="text-[14px] bg-[#00498d] text-white px-5 py-2.5 rounded-xl hover:bg-[#003d7a] transition-all duration-200 font-medium shadow-sm"
      >
        Aula Virtual
      </Link>
      <button
        onClick={() => signOut()}
        className="text-[14px] text-gray-400 hover:text-gray-600 transition-colors font-medium"
      >
        Salir
      </button>
    </div>
  );
}