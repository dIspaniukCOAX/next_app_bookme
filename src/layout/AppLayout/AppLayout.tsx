"use client";

import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface LayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: LayoutProps) => {
  const [isAuth, setIsAuth] = React.useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col h-screen">
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-xl font-semibold">BookMe</h1>
          <Link href="/auth/sign-in">Login</Link>
        </header>
        <main className="flex-1 flex flex-col items-center pb-4 bg-gray-100 overflow-auto w-full">
          {children}
          <footer className="mt-16 mb-6 text-center text-gray-500">
            <p>© 2025 Language Learning. Всі права захищено.</p>
          </footer>
        </main>
      </div>
    </ApolloProvider>
  );
};
