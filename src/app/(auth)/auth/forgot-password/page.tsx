import AuthGuard from "@/container/Auth/AuthGuard";
import AuthPage from "@/container/Auth/AuthPage";
import React from "react";

export default function Page() {
  return (
    <AuthGuard authRequired={false} redirectTo="/">
      <AuthPage />
    </AuthGuard>
  );
}
