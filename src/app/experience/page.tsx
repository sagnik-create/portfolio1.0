import ExperienceCard from "@/components/ExperienceCard";
import { getData } from "@/lib/getData";

export default function ExperiencePage() {
  const data = getData();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Experience
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
          Professional experience and leadership
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Experience entries are rendered directly from your portfolio data.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {data.experience.map((experience) => (
          <ExperienceCard
            key={`${experience.role}-${experience.company}`}
            experience={experience}
          />
        ))}
      </div>

      {data.leadership.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-slate-950">Leadership</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {data.leadership.map((item) => (
              <article
                key={`${item.role}-${item.organization}`}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">{item.role}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.organization}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {item.description.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
