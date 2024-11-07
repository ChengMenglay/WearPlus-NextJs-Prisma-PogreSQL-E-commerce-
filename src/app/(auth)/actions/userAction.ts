"use server";

import { ActionResult } from "@/app";
import {
  editProfileSchema,
  EditProfileSchema,
} from "@/lib/schemas/editProfileSchema";
import { User } from "@prisma/client";
import { getUserId } from "./authActions";
import { prisma } from "@/lib/prisma";

export const updateUserProfile = async (
  data: EditProfileSchema
): Promise<ActionResult<User>> => {
  try {
    const userId = await getUserId();
    const validated = editProfileSchema.safeParse(data);
    if (!validated.success)
      return { status: "error", error: validated.error.errors };
    const { name, email, phoneNumber, address } = validated.data;
    const user = await prisma.user.update({
      where: { id: userId as string },
      data: {
        name,
        email,
        phoneNumber,
        address,
      },
    });
    return { status: "success", data: user };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
};
