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
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--primary-color)]">
          Welcome To
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
            className="rounded-full bg-[var(--primary-color)] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--primary-color-dark)]"
            style={{ color: "#ffffff" }}
          >
            View Projects
          </Link>
          <Link
            href="https://drive.google.com/file/d/1ywz26MhtmQaUmwPzg7s0Uhl_h09j-VpS/view?usp=sharing"
            className="rounded-full border border-[var(--border-color)] bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-[var(--accent-color)] hover:bg-[var(--accent-soft)]"
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[var(--border-color)] bg-gradient-to-br from-white to-[var(--secondary-soft)] p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary-color)]">
          Quick Snapshot
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[var(--secondary-color)] p-5 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
              Education
            </p>
            <p className="mt-3 text-lg font-semibold">{data.education.degree}</p>
            <p className="mt-2 text-sm text-slate-300">{data.education.institution}</p>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary-color)]">
              Worked on
            </p>
            <p className="mt-3 text-lg font-semibold">69 repositories</p>
            <p className="mt-2 text-lg font-semibold">10+ projects</p>
            <p className="mt-2 text-sm text-slate-500">Based on GitHub stats</p>
          </div>
        </div>

        {contactLinks.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className="rounded-full border border-[var(--border-color)] bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
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
