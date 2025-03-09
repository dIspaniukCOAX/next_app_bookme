import { IUser } from "@/types/user.types";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";

interface IPersonalAvatarProps {
  userData: IUser;
}

const PersonAvatar = ({ userData }: IPersonalAvatarProps) => {
  return (
    <Link href={"/profile"} className="flex h-full items-center justify-center gap-[8px] cursor-pointer">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <p className="text-[#f3f3f3]">
        {userData.first_name} {userData.last_name}
      </p>
    </Link>
  );
};

export default PersonAvatar;
