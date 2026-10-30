import type { Metadata } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "PULS",
  description: "Open PULS in the App Store.",
};

const STORE_URL = "https://apps.apple.com/app/puls-alive/id6826094421";
const INSTAGRAM_URL = `instagram://extbrowser/?url=${encodeURIComponent(STORE_URL)}`;
const FACEBOOK_URL = STORE_URL.replace("https://", "x-safari-https://");

const buttonClassName =
  "inline-flex h-14 w-full max-w-xs cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-[#006039] px-8 text-base font-medium text-white shadow-[0_16px_40px_rgba(0,96,57,0.28)] sm:w-auto";

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
  const href =
    target === "instagram"
      ? INSTAGRAM_URL
      : target === "facebook"
        ? FACEBOOK_URL
        : STORE_URL;
  const refreshUrl =
    target === "instagram" ? INSTAGRAM_URL : target === "store" ? STORE_URL : null;

  return (
    <>
      {refreshUrl ? (
        <meta httpEquiv="refresh" content={`0;url=${refreshUrl}`} />
      ) : null}
      <main className="flex min-h-dvh items-center justify-center bg-[#f3eee7] px-6">
        {target === "facebook" ? (
          <>
            <button type="button" id="ios-store" className={buttonClassName}>
              Im App Store öffnen
            </button>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(){var btn=document.getElementById("ios-store");if(!btn)return;var safari=${JSON.stringify(FACEBOOK_URL)};var store=${JSON.stringify(STORE_URL)};btn.addEventListener("click",function(){var left=false;function gone(){left=true;}document.addEventListener("visibilitychange",gone);window.addEventListener("pagehide",gone);var frame=document.createElement("iframe");frame.setAttribute("hidden","");frame.style.cssText="position:absolute;width:0;height:0;border:0";frame.src=safari;document.body.appendChild(frame);setTimeout(function(){if(!left&&!document.hidden)window.location.href=store;},1000);});})();`,
              }}
            />
          </>
        ) : (
          <a href={href} className={buttonClassName}>
            Im App Store öffnen
          </a>
        )}
      </main>
    </>
  );
}
