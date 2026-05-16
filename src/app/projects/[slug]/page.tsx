import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/getProjectBySlug";
import { getProjects, hasInternalBlogContent } from "@/lib/getData";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.project_name,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectBlog = project.blog?.title
    ? {
        ...project.blog,
        slug: project.blog.slug || project.slug,
      }
    : null;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
          {project.tagline || "Project"}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
          {project.project_name}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{project.description}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Key features</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          {projectBlog ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">Associated blog</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{projectBlog.title}</p>
              <div className="mt-5">
                {hasInternalBlogContent(projectBlog) ? (
                  <Link
                    className="text-sm font-medium text-slate-900 hover:text-slate-700"
                    href={`/blogs/${projectBlog.slug}`}
                  >
                    Read the write-up
                  </Link>
                ) : projectBlog.external_url ? (
                  <a
                    className="text-sm font-medium text-slate-900 hover:text-slate-700"
                    href={projectBlog.external_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open external article
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Links</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm font-medium">
              {project.github ? (
                <a
                  className="text-slate-900 hover:text-slate-700"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub repository
                </a>
              ) : (
                <p className="text-slate-500">GitHub link not added yet.</p>
              )}

              {project.live_demo ? (
                <a
                  className="text-slate-900 hover:text-slate-700"
                  href={project.live_demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live demo
                </a>
              ) : (
                <p className="text-slate-500">Live demo link not added yet.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
