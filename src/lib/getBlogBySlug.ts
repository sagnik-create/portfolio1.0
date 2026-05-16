import { getAllBlogs } from "@/lib/getData";

export function getBlogBySlug(slug: string) {
  return getAllBlogs().find((blog) => blog.slug === slug);
}
