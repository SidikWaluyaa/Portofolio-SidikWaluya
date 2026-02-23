import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sidik | Junior Full Stack Developer",
  description: "Portofolio Sidik, seorang Junior Full Stack Developer yang berspesialisasi dalam membangun pengalaman digital premium.",
  icons: {
    icon: "/Portofolio-SidikWaluya/logo.svg",
  },
};

import PageTransition from "@/components/PageTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
        <GoogleAnalytics gaId="G-NNVSGE9C4L" />
      </body>
    </html>
  );
}
