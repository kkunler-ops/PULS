"use client";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteLocaleProvider } from "@/components/SiteLocale";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SiteLocaleProvider>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </SiteLocaleProvider>
  );
}
