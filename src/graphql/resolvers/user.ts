import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export const userResolvers = {
  Query: {
    users: async () => await db.user.findMany(),
    user: async (_: any, { id }: { id: string | undefined }) => await db.user.findUnique({ where: { id } }),
    me: async (_: any, __: any, { req }: { req: NextApiRequest }) => {
      // const token = req.headers.get("cookie")?.split("next-auth.session-token=")[1];
      const token = await getToken({ req, secret: process.env.AUTH_SECRET });

      if (!token) {
        throw new Error("Not authenticated");
      }

      try {
        if (!token?.id) {
          throw new Error("Token not found");
        }

        const user = await db.user.findUnique({ where: { id: token?.id as string } });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        throw new Error("Invalid token");
      }
    }
  },
};
