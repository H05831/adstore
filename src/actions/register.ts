"use server";

import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from 'bcrypt';

export const registerUser = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid credentails" };
    }

    const { email, username, password } = validatedFields.data;

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return { error: "User already exists!" };
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await db.user.create({
        data: {
            email, name: username, password: hashPassword
        }
    });

    return { success: "Register Successfully!" };
};