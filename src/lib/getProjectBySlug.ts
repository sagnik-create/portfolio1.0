import { getProjects } from "@/lib/getData";

export function getProjectBySlug(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}
