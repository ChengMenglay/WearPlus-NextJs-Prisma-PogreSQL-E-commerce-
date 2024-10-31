import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import GitHub from "next-auth/providers/github";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session) {
        session.user.id = token.sub;
        session.user.role = token.role as string | null; // Set role from token to session
      }
      return session;
    },
    async jwt({ token, user }) {
      // Set role on token from the user object (e.g., during login)
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [GitHub, ...authConfig.providers],
});
