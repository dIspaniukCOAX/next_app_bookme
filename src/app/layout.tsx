import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CustomSessionProvider from "@/provider/CustomSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Me",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg"
  },
  openGraph: {
    title: "Book Me - Video Calling App",
    description: "Connect with teachers easily via video calls.",
    url: "https://d6e2-157-245-67-12.ngrok-free.app/",
    siteName: "Book Me",
    images: [
      {
        url: "/images/login-photo.jpg",
        width: 1200,
        height: 630,
        alt: "Book Me Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <CustomSessionProvider>
        <body className={`${inter.className} bg-[#1c1c1c]`}>
          <Toaster />
          {children}
        </body>
      </CustomSessionProvider>
    </html>
  );
}
