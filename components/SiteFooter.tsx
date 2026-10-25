import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="px-6 pb-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 border-t border-stone-300/70 pt-8 text-sm text-stone-500">
        <p className="tracking-[0.18em] text-[#006039]">PULS</p>
        <Link href="/privacy" className="transition hover:text-stone-900">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
