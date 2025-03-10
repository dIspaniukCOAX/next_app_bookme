"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import LoginPhoto from "@/assets/images/login-photo.jpg";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ICreateUserInput } from "@/types/user.types";
import Loader from "@/components/Loader/Loader";

interface RegisterComponentProps {
  className?: string;
  onSubmit: (userData: ICreateUserInput) => void;
  errorMessage: string;
  loading: boolean;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ className, onSubmit, loading }) => {
  const { register, handleSubmit } = useForm<ICreateUserInput>();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-balance text-muted-foreground">Register account</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input {...register("first_name")} id="first_name" type="text" placeholder="Enter your name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  {...register("last_name")}
                  id="last_name"
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input {...register("age")} id="age" type="text" placeholder="Enter your age" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input {...register("password")} id="password" type="password" placeholder="Your Password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div className="text-center text-sm">
                Have you already have the account?{" "}
                <Link href="/auth/signin" className="underline underline-offset-4">
                  Sign in
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

export default RegisterComponent;
