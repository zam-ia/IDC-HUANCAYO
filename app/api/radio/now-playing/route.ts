import { getRadioNowPlaying } from "@/lib/media";

export async function GET() {
  const radio = await getRadioNowPlaying();

  return Response.json(radio, {
    headers: {
      "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
    },
  });
}
