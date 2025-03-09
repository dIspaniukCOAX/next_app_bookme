import speakeasy from 'speakeasy';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { NextAuthOptions, getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "2FA Token", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await db.user.findUnique({ where: { email: credentials.email as string } });
        if (!user) {
          throw new Error("No user found with that email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        if (user.two_factor_enabled) {
          if (!credentials.token) {
            throw new Error("2FA token required");
          }

          const isTokenValid = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: "base32",
            token: credentials.token,
          });

          if (!isTokenValid) {
            throw new Error("Invalid 2FA token");
          }
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export async function getSession() {
  return await getServerSession(authOptions);
}
