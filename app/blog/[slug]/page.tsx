import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { JSX } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatIsADailyCheckInApp } from "@/content/what-is-a-daily-check-in-app";
import { getPost, posts } from "@/lib/posts";

const articles: Record<string, () => JSX.Element> = {
  "what-is-a-daily-check-in-app": WhatIsADailyCheckInApp,
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — PULS`,
    description: post.description,
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const Article = articles[slug];
  if (!post || !Article) notFound();

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <article className="mx-auto max-w-2xl px-6 pb-20 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-0">
        <p className="text-sm text-stone-500">{formatDate(post.date)}</p>
        <h1 className="mt-3 text-[2rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-[2.6rem] sm:leading-[1.12]">
          {post.title}
        </h1>
        <div className="blog-prose mt-10">
          <Article />
        </div>
        <p className="mt-16 border-t border-stone-300/70 pt-10 text-[15px] leading-relaxed text-stone-600">
          PULS is a daily check-in in the browser.{" "}
          <Link
            href="/app"
            className="font-medium text-[#006039] underline decoration-[#006039]/25 underline-offset-4 hover:decoration-[#006039]"
          >
            Open the app
          </Link>
          , or go back to the{" "}
          <Link
            href="/blog"
            className="font-medium text-[#006039] underline decoration-[#006039]/25 underline-offset-4 hover:decoration-[#006039]"
          >
            blog
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
