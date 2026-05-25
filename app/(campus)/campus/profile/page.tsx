import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCampusUserById } from "@/lib/db";
import ProfileAvatarUploader from "@/components/campus/ProfileAvatarUploader";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CampusProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const profile = await getCampusUserById(session.user.id);
  const displayName =
    profile?.name || session.user.name || session.user.email?.split("@")[0] || "Usuario";
  const avatarUrl = profile?.avatar_url || session.user.image || null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex items-center gap-2 text-[11px] font-medium text-gray-400">
        <Link href="/campus/classroom" className="hover:text-[#00498d]">
          Campus
        </Link>
        <span>/</span>
        <span className="text-gray-500">Mi perfil</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>
        <p className="mt-1 text-sm text-gray-500">
          Administra tu identidad visible dentro del campus virtual.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <ProfileAvatarUploader
          initialAvatarUrl={avatarUrl}
          displayName={displayName}
        />

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-[17px] font-semibold text-gray-900">
            Informacion de cuenta
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                Nombre
              </dt>
              <dd className="mt-1 font-medium text-gray-900">{displayName}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                Correo
              </dt>
              <dd className="mt-1 font-medium text-gray-900">
                {session.user.email}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                Rol
              </dt>
              <dd className="mt-1">
                <span className="rounded-full bg-[#00498d]/[0.08] px-2.5 py-1 text-[11px] font-semibold text-[#00498d]">
                  {session.user.role === "admin" ? "Administrador" : "Estudiante"}
                </span>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
