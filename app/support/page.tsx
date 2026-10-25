import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { blogLinkClass } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Support — PULS",
  description:
    "Get help with PULS. Write to us if something does not work or you have a question.",
};

export default function SupportPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl px-6 pb-20 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-0">
        <p className="text-xs font-medium tracking-[0.18em] text-[#006039] uppercase">
          Support
        </p>
        <h1 className="mt-4 text-[2rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-[2.6rem] sm:leading-[1.12]">
          Support
        </h1>

        <div className="blog-prose mt-10">
          <p>
            PULS is a daily check-in app. Write to us if something does not
            work or you have a question.
          </p>
          <p>
            <a href="mailto:kontakt@inan-copy.de" className={blogLinkClass}>
              kontakt@inan-copy.de
            </a>
          </p>
          <p>
            In your email, briefly describe what happened, and include your
            iPhone model and iOS version.
          </p>
          <p>
            Privacy:{" "}
            <Link href="/privacy" className={blogLinkClass}>
              https://www.puls-app.com/privacy
            </Link>
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
