import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id: lessonId } = await params;
  const body = await request.json();
  const { completed } = body;

  const { error } = await supabaseAdmin
    .from("lesson_progress")
    .upsert(
      {
        user_id: session.user.id,
        lesson_id: lessonId,
        is_completed: completed,
      },
      { onConflict: "user_id,lesson_id" }
    );

  if (error) {
    console.error("Error upserting progress:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, completed });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id: lessonId } = await params;

  const { data, error } = await supabaseAdmin
    .from("lesson_progress")
    .select("is_completed")
    .eq("user_id", session.user.id)
    .eq("lesson_id", lessonId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    completed: data?.is_completed || false,
  });
}