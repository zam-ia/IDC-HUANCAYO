import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("avatar");

  if (!(file instanceof File)) {
    return Response.json({ error: "Archivo invalido" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "El archivo debe ser una imagen" }, { status: 400 });
  }

  if (file.size > 3 * 1024 * 1024) {
    return Response.json({ error: "La imagen no debe superar 3 MB" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  const path = `avatars/${userId}-${Date.now()}.jpg`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await db.storage
    .from("imagenes")
    .upload(path, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (uploadError) {
    return Response.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicData } = db.storage.from("imagenes").getPublicUrl(path);
  const avatarUrl = publicData.publicUrl;

  const { error: updateError } = await db
    .from("users")
    .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (updateError) {
    return Response.json({ error: updateError.message }, { status: 500 });
  }

  return Response.json({ avatarUrl });
}
