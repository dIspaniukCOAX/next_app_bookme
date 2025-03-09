"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AuthForm from "./AuthForm";

export default function AuthPage({ tokenId }: { tokenId?: string }) {
  return (
    <div id="main-page" className="flex h-screen flex-col justify-center items-center">
      <Card className="p-4 flex flex-col justify-center items-center">
        <CardContent>
          <AuthForm tokenId={tokenId} />
        </CardContent>
      </Card>
    </div>
  );
}
