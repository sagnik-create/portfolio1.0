import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import BlogRenderer from "@/components/BlogRenderer";
import { getAllBlogs, hasInternalBlogContent } from "@/lib/getData";
import { getBlogBySlug } from "@/lib/getBlogBySlug";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllBlogs()
    .filter((blog) => hasInternalBlogContent(blog))
    .map((blog) => ({
      slug: blog.slug,
    }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog not found",
    };
  }

  return {
    title: blog.title,
    description: blog.content || "External blog post",
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  if (!hasInternalBlogContent(blog)) {
    if (blog.external_url) {
      redirect(blog.external_url);
    }

    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
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

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
        {blog.title}
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        {[blog.date, blog.reading_time].filter(Boolean).join(" • ")}
      </p>
      {blog.related_to?.name ? (
        <p className="mt-2 text-sm text-slate-500">Related to: {blog.related_to.name}</p>
      ) : null}

      {blog.external_url ? (
        <a
          className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium !text-white shadow-sm transition hover:bg-slate-800 hover:!text-white"
          href={blog.external_url}
          target="_blank"
          rel="noreferrer"
        >
          Open full blog
        </a>
      ) : null}

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <BlogRenderer content={blog.content} />
      </div>
    </main>
  );
}
