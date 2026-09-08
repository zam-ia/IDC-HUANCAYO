import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://idchhuancayo.org";
  const routes = ["", "/en-vivo", "/radio", "/programacion", "/predicaciones", "/podcast", "/noticias", "/devocionales", "/testimonios", "/cursos", "/nosotros"];
  return routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: route === "/en-vivo" || route === "/radio" ? "always" : "weekly", priority: route === "" ? 1 : 0.8 }));
}
