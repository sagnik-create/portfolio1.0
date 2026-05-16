import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-800"
        >
          {title}
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-end gap-4 text-sm text-slate-600 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.href.startsWith("#") ? (
                  <a className="transition hover:text-slate-950" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <Link className="transition hover:text-slate-950" href={item.href}>
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
