import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  title: string;
  subtitle?: string;
};

export default function Navbar({ title, subtitle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 text-slate-900 transition hover:text-[var(--primary-color)]"
          aria-label={`${title} home`}
        >
          <span className="profile-avatar profile-avatar--header">
            <Image
              src="/assets/profile/logo.jpg"
              alt={`${title} profile photo`}
              width={96}
              height={96}
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold uppercase tracking-[0.24em]">
              {title}
            </span>
            {subtitle ? (
              <span className="mt-1 hidden text-xs font-medium text-slate-500 sm:block">
                {subtitle}
              </span>
            ) : null}
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-end gap-4 text-sm text-slate-600 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.href.startsWith("#") ? (
                  <a className="transition hover:text-[var(--primary-color)]" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <Link className="transition hover:text-[var(--primary-color)]" href={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
