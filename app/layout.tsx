import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code, Antic } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const antic = Antic({
  variable: "--font-antic",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sirajul Islam | SQA Automation Engineer",
  description: "SQA Automation Engineer & SDET specializing in scalable test frameworks and quality assurance.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} ${antic.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=(s==='dark')||(s!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark')}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
