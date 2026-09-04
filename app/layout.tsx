import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "PULS",
  description:
    "Täglicher Check-in. Wenn du zwei Tage still bist, benachrichtigt PULS deinen Notfallkontakt.",
  applicationName: "PULS",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "PULS",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3eee7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f3eee7] font-sans text-stone-800">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
