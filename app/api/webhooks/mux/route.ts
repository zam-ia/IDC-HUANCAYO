import { createHmac, timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/db";

export const runtime = "nodejs";

const signatureMaxAgeSeconds = 300;

function verifyMuxSignature(rawBody: string, signatureHeader: string) {
  const secret = process.env.MUX_WEBHOOK_SECRET;
  if (!secret) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, ...value] = part.trim().split("=");
      return [key, value.join("=")];
    })
  );
  const timestamp = Number(parts.t);
  const received = parts.v1;

  if (!timestamp || !received) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > signatureMaxAgeSeconds)
    return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("mux-signature") || "";

  if (!verifyMuxSignature(rawBody, signature)) {
    return Response.json({ error: "Firma no válida" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as {
    type?: string;
    data?: { id?: string };
  };
  const liveStreamId = event.data?.id;

  if (!supabaseAdmin || !liveStreamId) {
    return Response.json({ received: true });
  }

  const changes: Record<string, string | null> = {};
  if (event.type === "video.live_stream.active") {
    changes.status = "live";
    changes.actual_start_at = new Date().toISOString();
    changes.actual_end_at = null;
  } else if (event.type === "video.live_stream.idle") {
    changes.status = "finished";
    changes.actual_end_at = new Date().toISOString();
  }

  if (Object.keys(changes).length) {
    const { error } = await supabaseAdmin
      .from("live_events")
      .update(changes)
      .eq("mux_live_stream_id", liveStreamId);

    if (error) {
      console.error("No se pudo actualizar el evento Mux", error);
      return Response.json({ error: "Error de persistencia" }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
