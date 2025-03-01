import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppLayout } from "@/layout";
import BackgroundHero from "@/assets/images/bg_1.jpg";
import { TeacherCard } from "@/components/TeacherCard/TeacherCard";

export default function Home() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className={`flex items-center justify-center w-full min-h-[50vh] relative`}>
        <Image
          src={BackgroundHero}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute brightness-50"
        />
        <div className="flex flex-col items-center gap-2.5 text-center space-y-4 max-w-2xl z-[10]">
          <h1 className="text-[#EEEEEE] md:text-5xl font-bold">Знайди викладача та почни навчання!</h1>
          <p className="text-[#EEEEEE] text-lg md:text-xl">
            Обирай найкращих фахівців, бронюй заняття та вчися онлайн через відеозв'язок.
          </p>
          <Button size="lg" className="px-[25px] py-[10px] text-lg w-[max-content]">Знайти викладача</Button>
        </div>
      </section>

      {/* Популярні викладачі */}
      <section className="mt-12 w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-center">Популярні викладачі</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((id) => (
            <TeacherCard key={id} id={id} />
          ))}
        </div>
      </section>

      {/* Як це працює */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold">Як це працює?</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {["Обери викладача", "Забронюй заняття", "Приєднайся до уроку"].map((step, index) => (
            <Card key={index} className="p-6 w-72">
              <h3 className="font-bold text-xl">🔹 {step}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* Відгуки */}
      <section className="mt-16 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center">Відгуки студентів</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {["Дуже сподобалося заняття!", "Чудовий викладач, рекомендую!"].map((review, index) => (
            <Card key={index} className="p-4">
              <CardContent className="text-center">{review}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
