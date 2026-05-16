import Link from "next/link";
import { hasInternalBlogContent, type ResolvedBlogEntry } from "@/lib/getData";

type BlogCardProps = {
  blog: ResolvedBlogEntry;
};

export default function BlogCard({ blog }: BlogCardProps) {
  const href = hasInternalBlogContent(blog) ? `/blogs/${blog.slug}` : blog.external_url;

  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <span
            key={`${blog.slug}-${tag}`}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-4 text-2xl font-semibold text-slate-950">{blog.title}</h3>
      <p className="mt-2 text-sm text-slate-500">
        {[blog.date, blog.reading_time].filter(Boolean).join(" • ")}
      </p>
      {blog.related_to?.name ? (
        <p className="mt-2 text-sm text-slate-500">Related to: {blog.related_to.name}</p>
      ) : null}

      <p className="mt-4 line-clamp-5 text-sm leading-7 text-slate-600">
        {blog.content || "This article is published externally."}
      </p>

      <div className="mt-6">
        {hasInternalBlogContent(blog) ? (
          <Link className="text-sm font-medium text-slate-900 hover:text-slate-700" href={href}>
            Read article
          </Link>
        ) : (
          <a
            className="text-sm font-medium text-slate-900 hover:text-slate-700"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            Open external article
          </a>
        )}
      </div>
    </article>
  );
}
