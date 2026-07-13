import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rishiharan — Websites & AI tools that generate real leads",
  description:
    "I build fullstack web products and AI-powered tools for businesses, through Binory. 2 live client products shipped, PrimeLeed and Student Finance Checker.",
  openGraph: {
    title: "Get a website that actually turns visitors into paying customers",
    description:
      "Fullstack development, AI integration, shipped fast for real businesses. Co-Founder @ Binory.",
    url: "https://rishiharan.vercel.app",
    siteName: "Rishiharan",
    images: [
      {
        url: "https://rishiharan.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rishiharan — Websites & AI tools that generate real leads",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a website that actually turns visitors into paying customers",
    description:
      "Fullstack development, AI integration, shipped fast for real businesses.",
    images: ["https://rishiharan.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {gaId && process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={gaId} />
        )}
      </body>
    </html>
  );
}
