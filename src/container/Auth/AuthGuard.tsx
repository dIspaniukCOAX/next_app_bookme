"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../../components/Loader";

interface AuthGuardProps {
  children: React.ReactNode;
  authRequired: boolean;
  redirectTo: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  authRequired,
  redirectTo,
}) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Don't do anything while loading

    if (authRequired && status === "unauthenticated") {
      router.push(redirectTo);
    } else if (!authRequired && status === "authenticated") {
      router.push(redirectTo);
    }
  }, [status, router, authRequired, redirectTo]);

  if (status === "loading") {
    return (
      <Loader />
    );
  }

  if (authRequired && status === "unauthenticated") {
    return (
      <div className="fixed top-[40%] left-1/2 flex flex-col justify-center items-center transform -translate-x-1/2">
        <Loader />
        <p>Unauthorised! you are being redirected </p>
      </div>
    );
  }

  if (!authRequired && status === "authenticated") {
    return (
      <div className="fixed top-[40%] left-1/2 flex flex-col justify-center items-center transform -translate-x-1/2">
        <Loader />
        <p>You are being redirected </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
