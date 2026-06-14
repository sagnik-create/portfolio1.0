import { getPrimaryContactLinks } from "@/lib/getData";

type FooterProps = {
  title: string;
};

export default function Footer({ title }: FooterProps) {
  const links = getPrimaryContactLinks();

  return (
    <footer
      id="contact"
      className="mt-20 border-t border-[var(--border-color)] bg-[var(--secondary-soft)] text-sm text-slate-600"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-lg space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary-color)]">
            Contact
          </p>
          <p className="text-lg font-semibold text-slate-900">{title}</p>
          <p>Phone: (91) 817 8911 288 
            <br /> Email: sagnikd587@gmail.com 
            <br /> Location: Jaipur, Rajasthan</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              className="rounded-full border border-[var(--border-color)] bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
