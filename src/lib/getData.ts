import portfolioJson from "@/data/portfolio.json";

export type BlogPlatform = "medium" | "custom" | string;

export type BlogEntry = {
  title: string;
  slug?: string;
  content: string;
  external_url: string;
  platform: BlogPlatform;
  tags: string[];
  date: string;
  reading_time: string;
  featured?: boolean;
  cover_image: string;
  related_to?: {
    type: "project" | "experience" | "general" | string;
    name: string;
  };
};

export type ProjectEntry = {
  project_name: string;
  slug?: string;
  tagline: string;
  description: string;
  tech_stack: string[];
  features: string[];
  github: string;
  live_demo: string;
  featured?: boolean;
  blog?: BlogEntry;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  duration: string;
  description: string[];
  blog?: BlogEntry;
};

export type LeadershipEntry = {
  role: string;
  organization: string;
  description: string[];
};

export type Education = {
  degree: string;
  institution: string;
  additional: string;
};

export type Goals = {
  short_term: string;
  long_term: string;
};

export type PortfolioData = {
  short_title: {
    content: string;
  };
  very_short_bio: {
    content: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  skills: Record<string, string[]>;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  blogs: BlogEntry[];
  leadership: LeadershipEntry[];
  education: Education;
  goals: Goals;
};

export type ResolvedBlogEntry = BlogEntry & {
  slug: string;
  source: "project" | "experience" | "global";
};

export type ResolvedProjectEntry = ProjectEntry & {
  slug: string;
};

type RelatedType = "project" | "experience" | "general" | string;

const rawData = portfolioJson as PortfolioData;

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function clean(value?: string): string {
  return value?.trim() ?? "";
}

function hasContent(value?: string): boolean {
  return clean(value).length > 0;
}

function withProjectSlug(project: ProjectEntry): ResolvedProjectEntry {
  return {
    ...project,
    slug: clean(project.slug) || slugify(project.project_name),
  };
}

function normalizeBlog(
  blog: BlogEntry | undefined,
  source: ResolvedBlogEntry["source"],
  fallbackName: string,
  relatedType: RelatedType,
): ResolvedBlogEntry | null {
  if (!blog) {
    return null;
  }

  const title = clean(blog.title);
  const content = clean(blog.content);
  const externalUrl = clean(blog.external_url);

  if (!title || (!content && !externalUrl)) {
    return null;
  }

  return {
    ...blog,
    title,
    content,
    external_url: externalUrl,
    tags: blog.tags ?? [],
    slug: clean(blog.slug) || slugify(title),
    source,
    related_to: blog.related_to?.name
      ? blog.related_to
      : {
          type: relatedType,
          name: fallbackName,
        },
  };
}

export function getData(): PortfolioData {
  return rawData;
}

export function getProjects(): ResolvedProjectEntry[] {
  return rawData.projects.map(withProjectSlug);
}

export function getFeaturedProjects(limit = 3): ResolvedProjectEntry[] {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);

  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

export function getAllBlogs(): ResolvedBlogEntry[] {
  const globalBlogs = rawData.blogs
    .map((blog) => normalizeBlog(blog, "global", "General", "general"))
    .filter((blog): blog is ResolvedBlogEntry => blog !== null);

  const projectBlogs = getProjects()
    .map((project) =>
      normalizeBlog(project.blog, "project", project.project_name, "project"),
    )
    .filter((blog): blog is ResolvedBlogEntry => blog !== null);

  const experienceBlogs = rawData.experience
    .map((experience) =>
      normalizeBlog(experience.blog, "experience", experience.role, "experience"),
    )
    .filter((blog): blog is ResolvedBlogEntry => blog !== null);

  return [...globalBlogs, ...projectBlogs, ...experienceBlogs];
}

export function getFeaturedBlogs(limit = 3): ResolvedBlogEntry[] {
  const blogs = getAllBlogs();
  const featured = blogs.filter((blog) => blog.featured);

  return (featured.length > 0 ? featured : blogs).slice(0, limit);
}

export function getPrimaryContactLinks() {
  const { email, github, linkedin, portfolio } = rawData.contact;

  return [
    email
      ? { label: "Email", href: `mailto:${clean(email)}`, value: clean(email) }
      : null,
    github ? { label: "GitHub", href: clean(github), value: clean(github) } : null,
    linkedin
      ? { label: "LinkedIn", href: clean(linkedin), value: clean(linkedin) }
      : null,
    portfolio
      ? { label: "Portfolio", href: clean(portfolio), value: clean(portfolio) }
      : null,
  ].filter((item): item is { label: string; href: string; value: string } => item !== null);
}

export function hasInternalBlogContent(blog: BlogEntry | ResolvedBlogEntry): boolean {
  return hasContent(blog.content);
}
