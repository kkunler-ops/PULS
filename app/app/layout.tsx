import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "PULS",
  description:
    "Täglicher Check-in. Wenn du zwei Tage still bist, benachrichtigt PULS deinen Notfallkontakt.",
  appleWebApp: {
    capable: true,
    title: "PULS",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3eee7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
