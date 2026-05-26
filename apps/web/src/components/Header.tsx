import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#research", label: "Research" },
  { href: "/#news", label: "News" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="mb-10 border-b border-border pb-6">
      <h1 className="mb-1 text-3xl font-normal tracking-tight">
        <Link href="/">Your Name</Link>
      </h1>
      <p className="mb-4 text-sm text-muted">
        Light Transport · GPU Architecture · Computer Graphics
      </p>
      <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
