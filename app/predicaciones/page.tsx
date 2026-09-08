import type { Metadata } from "next";
import PublicLayout from "@/components/layouts/PublicLayout";
import MediaArchive from "@/components/media/MediaArchive";
import { getPublicMediaAssets } from "@/lib/media";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Predicaciones", description: "Predicaciones y transmisiones archivadas de IDC Huancayo." };

export default async function PredicacionesPage() {
  const assets = await getPublicMediaAssets(30, "sermon");
  return <PublicLayout><MediaArchive assets={assets} kind="Predicación" title="Predicaciones" description="Revisa mensajes, series y transmisiones archivadas desde un solo lugar." /></PublicLayout>;
}
