"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";

import { z } from "zod";

export const loginUser = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });

    return { success: "Login successfull!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Invalid credentials!" };
        default: {
          error: "Something went wrong!";
        }
      }
    }

    throw error;
  }
};
