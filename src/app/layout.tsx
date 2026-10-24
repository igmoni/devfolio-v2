import { Suspense } from "react";

import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { UmamiAnalytics } from "@/components/analytics/UmamiAnalytics";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { NavigationProgress } from "@/components/common/NavigationProgress";
import { OnekoCat } from "@/components/common/OnekoCat";
import { Quote } from "@/components/common/Quote";
import { Reveal } from "@/components/common/Reveal";
import { poppins } from "@/config/font";
import { AppProviders } from "@/providers/AppProviders";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://monxdev.vercel.app"),
  alternates: {
    canonical: "https://monxdev.vercel.app",
  },
  title: {
    default: "Mohan S P - Full Stack Web Developer",
    template: "%s",
  },

  description:
    "I build modern websites and digital products focused on design and performance.",

  openGraph: {
    type: "website",
    url: "https://monxdev.vercel.app/",
    title: "Mohan S P - Full Stack Web Developer",
    description:
      "I build modern websites and digital products focused on design and performance.",
    siteName: "Mohan S P",
    images: [
      {
        url: "https://monxdev.vercel.app/meta/og-img.png",
        width: 1200,
        height: 630,
        alt: "Mohan S P Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mohan S P - Full Stack Web Developer",
    description:
      "I build modern websites and digital products focused on design and performance.",
    images: ["https://monxdev.vercel.app/meta/og-img.png"],
    creator: "@_igmoni",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
      suppressContentEditableWarning
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Suspense fallback={null}>
          <AppProviders>
            <NavigationProgress />
            <Toaster richColors position="top-right" />
            <CustomCursor />
            <Navbar />
            <OnekoCat />
            {children}
            <Reveal delay={0.2}>
              <Quote />
            </Reveal>
            <Footer />
            <Analytics />
            <UmamiAnalytics />
            <SpeedInsights />
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
