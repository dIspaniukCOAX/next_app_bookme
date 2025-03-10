"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import LoginPhoto from "@/assets/images/login-photo.jpg";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { IUserLogin } from "@/types/user.types";
import Loader from "@/components/Loader/Loader";

interface LoginComponentProps {
  onSubmit: (userData: IUserLogin) => void;
  twoFactorRequired: boolean;
  errorMessage: string;
  loading: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onSubmit, errorMessage, loading, twoFactorRequired }) => {
  const { register, handleSubmit } = useForm<IUserLogin>({
    defaultValues: {
      email: "",
      password: "",
      twoFactorCode: ""
    }
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">Login to your Book Me account</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input {...register("password")} id="password" type="password" required />
              </div>
              {twoFactorRequired && (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="twoFactorCode">2Fa</Label>
                  </div>
                  <Input {...register("twoFactorCode")} defaultValue={""} id="twoFactorCode" type="text" required />
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={LoginPhoto}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.7] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginComponent;
