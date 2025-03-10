"use client";

import React from "react";
import AuthForm from "./AuthForm";

export default function AuthPage({ tokenId }: { tokenId?: string }) {
  return (
    <div id="main-page" className="flex h-screen flex-col justify-center items-center">
      <AuthForm tokenId={tokenId} />
    </div>
  );
}
