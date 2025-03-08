import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { first_name, last_name, age, email, password, adminPassword } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 12);

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    await db.user.create({
      data: {
        first_name,
        last_name,
        age: Number(age),
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred while registering the user" }, { status: 500 });
  }
}
