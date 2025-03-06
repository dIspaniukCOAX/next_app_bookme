"use client";

import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: LayoutProps) => {
  return (
    <ApolloProvider client={client}>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <section className="flex h-[calc(100svh-72px)] flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14 bg-[#3d3d3d]">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </ApolloProvider>
  );
};
