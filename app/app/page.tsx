"use client";

import dynamic from "next/dynamic";

const PulsApp = dynamic(
  () => import("@/components/PulsApp").then((mod) => mod.PulsApp),
  {
    ssr: false,
    loading: () => <div className="min-h-dvh bg-[#f3eee7]" />,
  },
);

export default function AppPage() {
  return <PulsApp />;
}
