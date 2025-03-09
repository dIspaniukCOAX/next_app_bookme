import { ReactNode } from "react";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <main className="min-h-screen">{children}</main>;
};

export default RootLayout;
