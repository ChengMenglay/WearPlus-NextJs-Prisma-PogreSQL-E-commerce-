import Credential from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./app/(auth)/actions/authActions";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credential({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);
        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);
          if (user && (await bcrypt.compare(password, user.passwordHash))) {
            return user;
          }
          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
