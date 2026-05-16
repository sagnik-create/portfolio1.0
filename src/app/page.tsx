
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { getData, getFeaturedBlogs, getFeaturedProjects } from "@/lib/getData";

export default function Home() {
  const data = getData();
  const featuredProjects = getFeaturedProjects(3);
  const featuredBlogs = getFeaturedBlogs(3);
  const skillGroups = Object.entries(data.skills);

  return (
    <main>
      <Hero data={data} />

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Featured Projects
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Selected work
            </h2>
          </div>
          <Link className="text-sm font-medium text-slate-900 hover:text-slate-700" href="/projects">
            View all projects
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Skills Overview
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Tools and technologies
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map(([category, items]) => (
            <article
              key={category}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold capitalize text-slate-950">
                {category.replace(/_/g, " ")}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={`${category}-${item}`}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Latest Writing
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Blogs and notes
            </h2>
          </div>
          <Link className="text-sm font-medium text-slate-900 hover:text-slate-700" href="/blogs">
            View all blogs
          </Link>
        </div>

        {featuredBlogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-8 text-sm text-slate-600">
            Add blog content to `src/data/portfolio.json` and it will appear here automatically.
          </div>
        )}
      </section>
    </main>
  );
}
