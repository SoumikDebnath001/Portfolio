import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteLoader from "./components/SiteLoader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const SITE_DESCRIPTION =
  "Full stack engineer building web products end to end — clean, responsive interfaces backed by fast, reliable APIs, with generative AI where it earns its place.";

export const metadata: Metadata = {
  title: {
    default: "Soumik Debnath — Full Stack Engineer",
    template: "%s · Soumik Debnath",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Soumik Debnath" }],
  openGraph: {
    title: "Soumik Debnath — Full Stack Engineer",
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "Soumik Debnath",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumik Debnath — Full Stack Engineer",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} site-loading`} suppressHydrationWarning>
      <body>
        {/* Applies the saved theme before first paint so the page never flashes. */}
        <Script id="theme-boot" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",s||(d?"dark":"light"));}catch(e){}})();`}
        </Script>
        {/* Without JS nothing would ever lift the loader, so skip it. */}
        <noscript>
          <style>{`#site-loader{display:none}html.site-loading,html.site-loading body{overflow:auto}`}</style>
        </noscript>
        <SiteLoader />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
