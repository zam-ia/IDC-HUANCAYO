import { createClient } from "@supabase/supabase-js";

export type UserRole = "admin" | "miembro";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instructor_id: string | null;
  course_type: string | null;
  duration_weeks: number | null;
  is_free: boolean;
  price: number | null;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  lesson_number: number;
  video_url: string | null;
  video_duration_sec: number | null;
  content: string | null;
  downloadable_pdf: string | null;
  is_published: boolean;
  created_at: string;
}

export interface CampusUser {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_active: boolean;
  phone: string | null;
  church_member_since: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
}

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
  return data as Course[];
}

export async function getCoursesForRole(role?: string | null) {
  const db = supabaseAdmin;
  if (!db) return [];

  let query = db.from("courses").select("*").order("created_at", {
    ascending: true,
  });

  if (role !== "admin") {
    query = query.eq("is_published", true).eq("is_free", true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Course[];
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
  return data as Course;
}

export function canAccessCourse(course: Course, role?: string | null) {
  if (role === "admin") return true;
  return course.is_published && course.is_free;
}

export function getCourseLevel(course: Pick<Course, "course_type" | "title">) {
  const source = `${course.course_type || ""} ${course.title}`.toLowerCase();

  if (source.includes("liderazgo")) return "Avanzado";
  if (source.includes("2")) return "Intermedio";
  return "Básico";
}

export async function getLessonsByCourseId(
  courseId: string,
  options: { includeUnpublished?: boolean } = {}
) {
  const db = supabaseAdmin;
  if (!db) return [];

  let query = db
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("lesson_number", { ascending: true });

  if (!options.includeUnpublished) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Lesson[];
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

export async function getCampusUsers() {
  const db = supabaseAdmin;
  if (!db) return [];

  const { data, error } = await db
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as CampusUser[];
}

export async function getCampusUserById(userId: string) {
  const db = supabaseAdmin;
  if (!db) return null;

  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data as CampusUser;
}

export async function getCampusEvents() {
  const db = supabaseAdmin;
  if (!db) return [];

  const { data, error } = await db
    .from("posts")
    .select(
      "id,title,slug,excerpt,content,category,featured_image,published_at,created_at"
    )
    .eq("is_published", true)
    .eq("category", "Evento")
    .order("published_at", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as CampusEvent[];
}
