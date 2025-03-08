import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    user.reset_token = resetToken;
    user.reset_token_expiry = resetTokenExpiry;
    await db.user.update({ where: { id: user.id }, data: { reset_token: resetToken, reset_token_expiry: resetTokenExpiry } });

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
