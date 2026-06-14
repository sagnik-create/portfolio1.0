import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/getData";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Projects
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
          Things I&apos;ve built
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Projects across multiple Domains and Technologies
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
