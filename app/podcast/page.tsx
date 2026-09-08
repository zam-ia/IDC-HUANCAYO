import type { Metadata } from "next";
import PublicLayout from "@/components/layouts/PublicLayout";
import MediaArchive from "@/components/media/MediaArchive";
import { getPublicMediaAssets } from "@/lib/media";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Podcast", description: "Programas y audios bajo demanda de IDC Radio Huancayo." };

export default async function PodcastPage() {
  const assets = await getPublicMediaAssets(30, "podcast");
  return <PublicLayout><MediaArchive assets={assets} kind="Podcast" title="Podcast" description="Escucha programas, devocionales y conversaciones cuando quieras." /></PublicLayout>;
}
