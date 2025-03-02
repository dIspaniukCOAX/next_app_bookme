import { db } from "@/lib/db";
import { generateTokens } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const userResolvers = {
  Query: {
    users: async () => await db.user.findMany(),
    user: async (_: any, { id }: { id: string }) => await db.user.findUnique({ where: { id } }),
    me: async (_: any, __: any, { req }: { req: NextRequest }) => {
      const token = req.cookies.get("token")?.value;
      if (!token) {
        throw new Error("Not authenticated");
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await db.user.findUnique({ where: { id: decoded.userId } });
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

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
      res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        path: "/"
      });

      return { user };
    },
    signin: async (
      _: any,
      { email, password }: { email: string; password: string },
    ) => {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await db.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
      }

      const {
        accessToken,
        refreshToken
      } = generateTokens({ userId: user.id });

      return { user, accessToken, refreshToken };
    },
    logout: async (_: any, __: any, { res }: { res: NextResponse }) => {
      res.cookies.set("token", "", { maxAge: 0, path: "/" }); // Delete cookie
      return true;
    }
  }
};
