"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { isEntryEmpty, validateEmail } from "@/utils/general";

interface LoginComponentProps {
  onSubmit: (userData: { email: string; password: string; twoFactorCode?: string }) => void;
  twoFactorRequired: boolean;
  errorMessage: string;
  loading: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onSubmit, errorMessage, loading, twoFactorRequired }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const onSubmitLoginDetails = () => {
    if (isEntryEmpty(email)) {
      setEmailError("Invalid email");
      return;
    }
    if (isEntryEmpty(password)) {
      setPasswordError("Incorrect password.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email");
      return;
    }
    onSubmit({ email, password, twoFactorCode });
  };

  return (
    <Card className="w-full max-w-sm mx-auto p-6 shadow-md">
      <CardContent>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div className="mb-4 relative">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className={passwordError ? "border-red-500" : ""}
              onKeyDown={(e) => e.key === "Enter" && onSubmitLoginDetails()}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        {twoFactorRequired && (
          <div className="mb-4">
            <Label htmlFor="twoFactorCode">2FA Code</Label>
            <Input
              id="twoFactorCode"
              type="text"
              placeholder="2FA Code"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
            />
          </div>
        )}
        <div className="text-right text-sm mb-4">
          <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p>
            No account yet?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
          <Button onClick={onSubmitLoginDetails} disabled={loading} className="w-28">
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginComponent;
