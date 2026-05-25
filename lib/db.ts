import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error("Missing Supabase server environment variables");
  }

  return supabaseAdmin;
}

const defaultSiteConfig = {
  siteName: "IDC Huancayo",
  siteDescription: "Iglesia Discípulos de Cristo, sede Huancayo",
  primaryColor: "#00498d",
  logoUrl: null,
  faviconUrl: null,
  email: "contacto@idchuancayo.org",
  phone: "+51 964 909 877",
  address: "Huancayo, Perú",
  facebookUrl: "https://facebook.com/idchuancayo",
  instagramUrl: "https://instagram.com/idchuancayo",
  youtubeUrl: "https://youtube.com/@idchuancayo",
  whatsappNumber: "+51964909877",
};

export async function getCourses() {
  const db = supabaseAdmin;
  if (!db) return [];

  const { data, error } = await db
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getCourseBySlug(slug: string) {
  const db = supabaseAdmin;
  if (!db) return null;

  const { data, error } = await db
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getLessonsByCourseId(courseId: string) {
  const db = supabaseAdmin;
  if (!db) return [];

  const { data, error } = await db
    .from("lessons")
    .select("id, title, content, video_url, is_published, lesson_number")
    .eq("course_id", courseId)
    .order("lesson_number", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getPublishedPosts(type?: string) {
  const db = supabaseAdmin;
  if (!db) return [];

  let query = db
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (type) {
    query = query.eq("post_type", type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getPostBySlug(slug: string) {
  const db = supabaseAdmin;
  if (!db) return null;

  const { data, error } = await db
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getAllPosts(type?: string) {
  const db = supabaseAdmin;
  if (!db) return [];

  let query = db.from("posts").select("*").order("created_at", {
    ascending: false,
  });

  if (type) {
    query = query.eq("post_type", type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getLessonProgressForUser(
  userId: string,
  courseId: string
) {
  const db = supabaseAdmin;
  if (!db) return 0;

  const { data: lessons } = await db
    .from("lessons")
    .select("id")
    .eq("course_id", courseId)
    .eq("is_published", true);

  if (!lessons || lessons.length === 0) return 0;

  const lessonIds = lessons.map((lesson) => lesson.id);

  const { data: progress, error } = await db
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds)
    .eq("is_completed", true);

  if (error || !progress) return 0;

  return Math.round((progress.length / lessons.length) * 100);
}

export async function getSiteConfig() {
  const db = supabaseAdmin;
  if (!db) return defaultSiteConfig;

  const { data, error } = await db
    .from("site_config")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) return defaultSiteConfig;
  return data;
}
