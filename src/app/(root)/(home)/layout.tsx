import { Metadata } from "next";
import { ReactNode } from "react";

import { AppLayout } from "@/layout";

export const metadata: Metadata = {
  title: "Book Me",
  description: "A workspace for your team"
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <AppLayout>{children}</AppLayout>;
};

export default RootLayout;
