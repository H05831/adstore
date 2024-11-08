import authConfig from "@/authconfig";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "./lib/db";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      try {
        const existingUser = await db.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });
        if (existingUser) {
          token.role = existingUser.role;
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
      return token;
    },
  },

  adapter: PrismaAdapter(db),

  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  ...authConfig,
});
