"use server";

import { ActionResult } from "@/app";
import { auth, signIn, signOut } from "@/auth";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result) {
      return { status: "success", data: "Log in successfully" };
    }
    return { status: "error", error: "Log in fail!" };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Invalid credentials" };
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/login" });
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validatedData = registerSchema.safeParse(data);
    if (!validatedData.success) {
      return { status: "error", error: validatedData.error.errors };
    }
    const { name, email, password } = validatedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { status: "error", error: "User already exists" };
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashedPassword },
    });

    // Automatically sign in the user after registration
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult.success) {
      return { status: "success", data: user };
    } else {
      return {
        status: "error",
        error:
          "Registration successful, but login failed. Please log in manually.",
      };
    }
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong!" };
  }
}
export async function getUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;
  return userId;
}
export async function getUserInforById(id: string) {
  const userInfo = await prisma.user.findUnique({ where: { id } });
  return userInfo;
}

export async function getUserByEmail(email: string) {
  const userInfo = await prisma.user.findUnique({ where: { email } });
  return userInfo;
}
export async function getUserInfor() {
  const userId = await getUserId();
  return prisma.user.findUnique({ where: { id: userId as string } });
}
