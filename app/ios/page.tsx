import type { Metadata } from "next";
import { headers } from "next/headers";
import { APP_STORE_URL } from "@/lib/app-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "PULS",
  description: "Open PULS in the App Store.",
};

const STORE_URL = APP_STORE_URL;
const INSTAGRAM_URL = `instagram://extbrowser/?url=${encodeURIComponent(STORE_URL)}`;

const buttonClassName =
  "inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-[#006039] px-8 text-base font-medium text-white shadow-[0_16px_40px_rgba(0,96,57,0.28)] sm:w-auto";

function targetFromUserAgent(userAgent: string) {
  if (userAgent.includes("Instagram") || userAgent.includes("Threads")) {
    return "instagram" as const;
  }
  if (
    userAgent.includes("FBAN") ||
    userAgent.includes("FBAV") ||
    userAgent.includes("FB_IAB") ||
    userAgent.includes("Messenger")
  ) {
    return "facebook" as const;
  }
  return "store" as const;
}

export default async function IosPage() {
  const userAgent = (await headers()).get("user-agent") ?? "";
  const target = targetFromUserAgent(userAgent);
  const href = target === "instagram" ? INSTAGRAM_URL : STORE_URL;
  const refreshUrl =
    target === "instagram" ? INSTAGRAM_URL : target === "store" ? STORE_URL : null;

  return (
    <>
      {refreshUrl ? (
        <meta httpEquiv="refresh" content={`0;url=${refreshUrl}`} />
      ) : null}
      {target === "facebook" ? (
        <a
          href={STORE_URL}
          className="flex min-h-dvh w-full touch-manipulation items-center justify-center bg-[#f3eee7] px-6"
        >
          <span className={buttonClassName}>Im App Store öffnen</span>
        </a>
      ) : (
        <main className="flex min-h-dvh items-center justify-center bg-[#f3eee7] px-6">
          <a href={href} className={buttonClassName}>
            Im App Store öffnen
          </a>
        </main>
      )}
    </>
  );
}
