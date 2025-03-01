import React from "react";
import { Card, CardContent } from "../ui/card";
import { ITeacher } from "@/types";
import { Button } from "../ui/button";
import Image from "next/image";

export const TeacherCard = ({ id }: { id: number }) => {
  return (
    <Card key={id} className="p-4">
      <CardContent className="flex flex-col items-center">
        <Image src="/teacher.jpg" width={100} height={100} alt="Викладач" className="rounded-full mb-4 bg-linear-65 from-purple-500 to-pink-500" />
        <h3 className="font-semibold text-lg">Ім'я Викладача</h3>
        <p className="text-gray-500">🇬🇧 Англійська, 🇪🇸 Іспанська</p>
        <p className="text-yellow-500">⭐ 4.9</p>
        <Button className="mt-4 w-full">Переглянути</Button>
      </CardContent>
    </Card>
  );
};
