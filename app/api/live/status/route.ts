import { getPublicLiveEvent } from "@/lib/media";

export async function GET() {
  const event = await getPublicLiveEvent();

  return Response.json(event, {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
    },
  });
}
