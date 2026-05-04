import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Obtener todos los cursos publicados
export async function getCourses() {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

// Obtener un curso por slug
export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

// Obtener lecciones de un curso, ordenadas
export async function getLessonsByCourseId(courseId: string) {
  const { data, error } = await supabaseAdmin
    .from("lessons")
    .select("id, title, content, video_url, is_published, lesson_number")
    .eq("course_id", courseId)
    .order("lesson_number", { ascending: true });
  if (error) throw error;
  return data;
}

// Obtener noticias publicadas
export async function getPublishedPosts(type?: string) {
  let query = supabaseAdmin
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

// Obtener un post por slug
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data;
}

// Obtener todas las noticias (admin, incluye no publicadas)
export async function getAllPosts(type?: string) {
  let query = supabaseAdmin
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (type) {
    query = query.eq("post_type", type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Obtener el progreso de lecciones de un usuario en un curso
export async function getLessonProgressForUser(userId: string, courseId: string) {
  const { data: lessons } = await supabaseAdmin
    .from("lessons")
    .select("id")
    .eq("course_id", courseId)
    .eq("is_published", true);

  if (!lessons || lessons.length === 0) return 0;

  const lessonIds = lessons.map((l: any) => l.id);

  const { data: progress, error } = await supabaseAdmin
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds)
    .eq("is_completed", true);

  if (error) return 0;

  return Math.round((progress.length / lessons.length) * 100);
}

// Obtener la configuración del sitio
export async function getSiteConfig() {
  const { data, error } = await supabaseAdmin
    .from("site_config")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    // Valores por defecto si no hay registro
    return {
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
  }

  return data;
}