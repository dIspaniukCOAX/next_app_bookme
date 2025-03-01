"use client";

import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import React, { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <ApolloProvider client={client}>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
      </div>
    </ApolloProvider>
  );
};
