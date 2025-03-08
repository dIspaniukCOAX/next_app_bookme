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
  }
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
