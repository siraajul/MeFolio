import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/ui/smooth-scroll";
import { ThemeToggleFab } from "@/components/ui/theme-toggle-fab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirajul Islam | SQA Automation Engineer",
  description: "SQA Automation Engineer & SDET specializing in scalable test frameworks, performance testing, and quality assurance strategies.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sirajul Islam | SQA Automation Engineer",
    description: "Expert in Test Automation, SDET, and Quality Assurance strategies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
          <ThemeToggleFab />
        </SmoothScroll>
      </body>
    </html>
  );
}
