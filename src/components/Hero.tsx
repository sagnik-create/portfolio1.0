import Link from "next/link";
import { getPrimaryContactLinks, type PortfolioData } from "@/lib/getData";

type HeroProps = {
  data: PortfolioData;
};

export default function Hero({ data }: HeroProps) {
  const contactLinks = getPrimaryContactLinks().slice(0, 2);

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
          Portfolio
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {data.short_title.content}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          {data.very_short_bio.content}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            style={{ color: "#ffffff" }}
          >
            View Projects
          </Link>
          <Link
            href="/blogs"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Read Blogs
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Quick Snapshot
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">
              Education
            </p>
            <p className="mt-3 text-lg font-semibold">{data.education.degree}</p>
            <p className="mt-2 text-sm text-slate-300">{data.education.institution}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Goal
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {data.goals.short_term}
            </p>
          </div>
        </div>

        {contactLinks.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
