import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — PULS",
  description:
    "Guides on daily check-in apps, living alone, and how to make sure someone notices if you go silent.",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 pb-20 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-0">
        <p className="text-xs font-medium tracking-[0.18em] text-[#006039] uppercase">
          Blog
        </p>
        <h1 className="mt-4 text-[2rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-4xl">
          Daily check-ins, living alone, and being found in time.
        </h1>
        <ul className="mt-12 space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="text-sm text-stone-500">{formatDate(post.date)}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 block text-xl font-medium tracking-[-0.03em] text-stone-800 transition hover:text-[#006039]"
              >
                {post.title}
              </Link>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-600">
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
