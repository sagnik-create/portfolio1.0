import BlogCard from "@/components/BlogCard";
import { getAllBlogs } from "@/lib/getData";

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Blogs
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
          Articles, notes, and build logs
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Blogs are pulled from global entries as well as project and experience write-ups.
        </p>
      </div>

      {blogs.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-8 text-sm text-slate-600">
          No blogs yet. Add entries to `src/data/portfolio.json` and they will show up automatically.
        </div>
      )}
    </main>
  );
}
