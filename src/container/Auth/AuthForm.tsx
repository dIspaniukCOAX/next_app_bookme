"use client";
import { usePathname } from "next/navigation";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import ForgotPassword from "./ForgotPassword";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AuthGuard from "./AuthGuard";
import { ICreateUserInput } from "@/types/user.types";
export default function AuthForm({ tokenId }: { tokenId?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const handleLogin = async (userData: { email: string; password: string; twoFactorCode?: string }) => {
    setErrorMessage("");
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: userData.email,
      password: userData.password,
      token: userData.twoFactorCode
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/");
    }
    if (result?.error) {
      if (result.error === "2FA token required") {
        setTwoFactorRequired(true);
      } else {
        setErrorMessage(result.error);
      }
    }
  };

  const handleRegister = async (userData: ICreateUserInput) => {
    setErrorMessage("");
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        age: userData.age,
        password: userData.password
      })
    });
    setLoading(false);
    if (response.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password
      });
      if (result?.ok) {
        router.push("/");
      } else {
        if (result?.error) {
          setErrorMessage(result?.error);
        }
      }
    } else {
      // Handle error
      const data = await response.json();
      setErrorMessage(data.error);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setErrorMessage("");
    setForgotPasswordSuccess(false);
    setLoading(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    setLoading(false);
    if (response.ok) {
      setForgotPasswordSuccess(true);
    } else {
      const data = await response.json();
      setErrorMessage(data.error);
    }
  };

  useEffect(() => {
    if (pathname.includes("/reset-password") && !tokenId?.length) {
      router.push("/signin");
    }
  }, [tokenId, router, pathname]);

  return (
    <>
      <AuthGuard authRequired={false} redirectTo="/">
        {pathname.includes("/auth/signin") && (
          <LoginComponent loading={loading} errorMessage={errorMessage} onSubmit={handleLogin} twoFactorRequired={twoFactorRequired} />
        )}
        {pathname.includes("/auth/signup") && (
          <RegisterComponent errorMessage={errorMessage} loading={loading} onSubmit={handleRegister} />
        )}
        {pathname.includes("/auth/forgot-password") && (
          <ForgotPassword
            loading={loading}
            forgotPasswordSuccess={forgotPasswordSuccess}
            errorMessage={errorMessage}
            onSubmit={handleForgotPassword}
          />
        )}
      </AuthGuard>
    </>
  );
}
