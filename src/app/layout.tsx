import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Language Learning – Вивчай мови онлайн",
  description: "Знайди викладача, забронюй заняття та навчайся онлайн через відеозв'язок.",
  keywords: ["вивчення мов", "онлайн-уроки", "репетитори", "англійська", "французька"],
  openGraph: {
    title: "Language Learning – Вивчай мови онлайн",
    description: "Знайди найкращих викладачів та почни навчання сьогодні!",
    images: "/og-image.jpg",
    url: "https://yourwebsite.com",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Language Learning – Вивчай мови онлайн",
    description: "Знайди викладача та почни заняття вже зараз!",
    images: "/og-image.jpg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
