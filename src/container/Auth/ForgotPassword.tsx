"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { isEntryEmpty, validateEmail } from "@/utils/general";

interface ForgotPasswordProps {
  loading: boolean;
  errorMessage: string;
  forgotPasswordSuccess: boolean;
  onSubmit: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ loading, errorMessage, forgotPasswordSuccess, onSubmit }) => {
  const [emailData, setEmailData] = useState({
    value: "",
    error: "",
  });

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData({
      value: event.target.value,
      error: "",
    });
  };

  const onSubmitEmailDetails = () => {
    if (isEntryEmpty(emailData.value) || !validateEmail(emailData.value)) {
      setEmailData((prev) => ({ ...prev, error: "Invalid email" }));
      return;
    }
    onSubmit(emailData.value);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-4">Forgot your password?</div>
      {!forgotPasswordSuccess && (
        <div className="text-center mb-4">
          No problem! Provide your email address and we will send you a reset link.
        </div>
      )}
      {errorMessage && <div className="text-center text-red-500">{errorMessage}</div>}
      {forgotPasswordSuccess ? (
        <div className="text-center">Check your email for the reset link.</div>
      ) : (
        <>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            value={emailData.value}
            onChange={onChangeEmail}
            type="email"
            className={`w-full mb-4 ${emailData.error ? "border-red-500" : ""}`}
          />
          {emailData.error && <div className="text-red-500 text-sm">{emailData.error}</div>}
          <Button onClick={onSubmitEmailDetails} disabled={loading} className="w-full mb-4">Send</Button>
        </>
      )}
      <div className="text-center">
        <Link href="/auth/signup" className="text-blue-500">Back to register</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
