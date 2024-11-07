import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().min(6),
  address: z.string().min(3),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
