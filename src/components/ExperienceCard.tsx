import type { ExperienceEntry } from "@/lib/getData";

type ExperienceCardProps = {
  experience: ExperienceEntry;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const meta = [experience.company, experience.duration].filter(Boolean).join(" • ");

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-950">{experience.role}</h2>
      {meta ? <p className="mt-2 text-sm text-slate-500">{meta}</p> : null}

      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
        {experience.description.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
