import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { blogLinkClass } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Privacy — PULS",
  description:
    "How PULS handles your name, emergency contact, check-ins, step count, and Apple purchases.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl px-6 pb-20 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-0">
        <p className="text-xs font-medium tracking-[0.18em] text-[#006039] uppercase">
          Privacy
        </p>
        <h1 className="mt-4 text-[2rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-[2.6rem] sm:leading-[1.12]">
          Privacy policy
        </h1>
        <p className="mt-4 text-sm text-stone-500">Last updated: 25 October 2026</p>

        <div className="blog-prose mt-10">
          <p>
            PULS is a daily check-in app. If you go silent, it notifies a person
            you named. This page describes what the iOS app sends, what stays on
            your iPhone, and how purchases work. There is no PULS account.
          </p>

          <h2>Who is responsible</h2>
          <p>
            PULS is operated by Kaan Kuenler. For privacy questions, write to{" "}
            <a href="mailto:kontakt@inan-copy.de" className={blogLinkClass}>
              kontakt@inan-copy.de
            </a>
            .
          </p>

          <h2>What leaves your iPhone</h2>
          <p>
            When the app schedules or updates an alert, it sends the following
            to{" "}
            <span className="break-all">https://www.puls-app.com/api/alarm</span>
            :
          </p>
          <ul>
            <li>your name</li>
            <li>your emergency contact’s email address</li>
            <li>the language you use in the app</li>
            <li>
              your emergency contact’s phone number, only if Premium is active
              and you have entered a number
            </li>
          </ul>
          <p>
            Name, email, and phone number do not stay only on the device. The
            server needs them to send the alert if you miss check-ins.
          </p>

          <h2>Why we use that data</h2>
          <p>
            If you do not check in, PULS emails your emergency contact at 9:00
            local time on the third calendar day after your last check-in. With
            Premium, PULS also sends an SMS to the stored number at the same
            time.
          </p>
          <p>
            Each new check-in replaces the previous scheduled alert. If you
            remove a phone number, the scheduled SMS is cancelled. We do not
            use this data for advertising.
          </p>

          <h2>What stays on your iPhone</h2>
          <p>
            Step count is read only on the device. With Premium, PULS can treat
            movement as a check-in so you do not have to tap the button. Step
            data is not sent to the server. PULS does not use GPS and does not
            access your location.
          </p>

          <h2>Purchases</h2>
          <p>
            Premium is sold as an Apple subscription. Apple processes the
            payment. PULS never sees your card details.
          </p>
          <p>
            RevenueCat receives the purchase history under an anonymous ID so
            the app can unlock Premium. Your name, emergency email, and phone
            number are not sent to RevenueCat.
          </p>

          <h2>No account, no ads</h2>
          <p>
            You do not create a PULS login. We do not run advertising trackers
            in the app.
          </p>

          <h2>Who receives an alert</h2>
          <p>
            Only the emergency contact you entered. The email and, if you use
            Premium, the SMS go to that person. They do not need a PULS
            account.
          </p>

          <h2>Contact</h2>
          <p>
            Kaan Kuenler
            <br />
            <a href="mailto:kontakt@inan-copy.de" className={blogLinkClass}>
              kontakt@inan-copy.de
            </a>
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
