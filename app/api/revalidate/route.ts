import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { path } = await request.json();
  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }
  return NextResponse.json({ error: "No path provided" }, { status: 400 });
}