import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="px-6 pt-7 sm:px-10 sm:pt-9 lg:px-16 lg:pt-12">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.22em] text-[#006039]"
        >
          PULS
        </Link>
        <nav className="flex items-center gap-6 text-sm text-stone-600">
          <Link href="/blog" className="transition hover:text-stone-900">
            Blog
          </Link>
          <Link href="/app" className="transition hover:text-stone-900">
            Open the app
          </Link>
        </nav>
      </div>
    </header>
  );
}
