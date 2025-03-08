import { db } from "@/lib/db";
import { decrypt, generateAccessToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const userResolvers = {
  Query: {
    users: async () => await db.user.findMany(),
    user: async (_: any, { id }: { id: string | undefined }) => await db.user.findUnique({ where: { id } }),
    me: async (_: any, __: any, { req }: { req: NextRequest }) => {
      const token = req.cookies.get("access_token")?.value;
      if (!token) {
        throw new Error("Not authenticated");
      }

      try {
        const decoded = await decrypt(token);
        if (!decoded?.userId) {
          throw new Error("Token not found");
        }

        const user = await db.user.findUnique({ where: { id: decoded?.userId as string } });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        throw new Error("Invalid token");
      }
    }
  },
  Mutation: {
    signup: async (
      _: any,
      {
        email,
        password,
        first_name,
        last_name,
        age
      }: { email: string; password: string; first_name: string; last_name: string; age: number },
      { res }: { res: NextResponse }
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.user.create({
        data: { email, password: hashedPassword, first_name, last_name, age }
      });

      const token = (await generateAccessToken(user.id)) || "";

      res.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
        path: "/"
      });

      return { user };
    },
    signin: async (
      _: any,
      { email, password }: { email: string; password: string },
      { res }: { res: NextResponse }
    ) => {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await db.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
      }

      const token = (await generateAccessToken(user.id)) || "";

      res.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
        path: "/"
      });

      return { user, accessToken: token };
    },
    logout: async (_: any, __: any, { res }: { res: NextResponse }) => {
      res.cookies.set("access_token", "", { maxAge: 0, path: "/" }); // Delete cookie
      return true;
    }
  }
};
