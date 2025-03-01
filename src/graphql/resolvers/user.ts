import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const userResolvers = {
  Query: {
    users: async () => await db.user.findMany(),
    user: async (_: any, { id }: { id: string }) =>
      await db.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: async (
      _: any,
      { email, password, first_name, last_name, age }: 
      { email: string; password: string; first_name: string; last_name: string; age: number }
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      return await db.user.create({
        data: { email, password: hashedPassword, first_name, last_name, age },
      });
    },
  },
};
