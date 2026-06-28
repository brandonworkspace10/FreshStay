import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FF5A5F",
};

const title =
  "FreshStay BnB | Airbnb & Short-Term Rental Cleaning NYC — Recurring Turnover Plans";
const description =
  "FreshStay BnB handles NYC Airbnb turnover cleaning on a recurring plan. Same-day service, insured crews, background-checked cleaners. Weekly, bi-weekly, or per-stay for Manhattan, Brooklyn & Queens hosts.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords: [
    "airbnb cleaning nyc",
    "airbnb turnover cleaning",
    "bnb cleaning service nyc",
    "short term rental cleaning new york",
    "vacation rental cleaning manhattan",
    "airbnb cleaner brooklyn",
    "freshstay bnb",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={jakarta.variable} lang="en">
      <body className="font-sans antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
