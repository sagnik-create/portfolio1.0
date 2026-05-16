import Link from "next/link";
import type { ResolvedProjectEntry } from "@/lib/getData";

type ProjectCardProps = {
  project: ResolvedProjectEntry;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
        {project.tagline || "Project"}
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-950">
        {project.project_name}
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm font-medium">
        <Link className="text-slate-900 hover:text-slate-700" href={`/projects/${project.slug}`}>
          View details
        </Link>
        {project.github ? (
          <a
            className="text-slate-600 hover:text-slate-900"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}
