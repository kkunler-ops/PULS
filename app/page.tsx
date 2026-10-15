import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "PULS",
  description:
    "Millions of people live alone. If something happens, others may notice too late — or not at all. PULS is a daily check-in that alerts your emergency contact if you go silent.",
};

export default function HomePage() {
  return (
    <SiteShell>
      <LandingPage />
    </SiteShell>
  );
}
