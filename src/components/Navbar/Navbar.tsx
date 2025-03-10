"use client";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "../MobileNav/MobileNav";
import { Button } from "../ui/button";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/queries";
import { Loader, LogOut } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import PersonAvatar from "../PersonalAvatar/PersonAvatar";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { data, loading, error } = useQuery(GET_ME);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data?.me));
    }
  }, [data]);

  return (
    <nav className="flex justify-between sticky top-0 left-0 z-50 w-full bg-[#383838] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/icons/logo.svg" width={32} height={32} alt="yoom logo" className="max-sm:size-10" />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">Book Me</p>
      </Link>
      <div className="flex-between gap-5">
        {loading ? (
          <Loader />
        ) : data ? (
          <div className="flex items-center gap-3 cursor-pointer">
            <PersonAvatar userData={data.me} />
            <LogOut color="#fff" onClick={() => signOut()} />
          </div>
        ) : (
          <Button>
            <Link href="/auth/sign-in">Login</Link>
          </Button>
        )}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
