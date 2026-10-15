"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteLocaleProvider } from "@/components/SiteLocale";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SiteLocaleProvider>
      <div className="min-h-dvh">
        <SiteHeader />
        {children}
      </div>
    </SiteLocaleProvider>
  );
}
