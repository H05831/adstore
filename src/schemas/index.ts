import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").nullable(),
  description: z.string().min(1, "Product description is required").nullable(),
  price: z.number().nullable(),
  category: z.enum(["WOMEN", "MEN", "CHILDREN"]).nullable(),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
      })
    )
    .nonempty("At least one size is required"),
  colors: z
    .array(
      z.object({
        color: z.string().min(1, "Color is required"),
      })
    )
    .nonempty("At least one color is required"),
});

export const checkoutAndPaymentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  emailAddress: z.string().email("Invalid email address"),
  confirmationEmail: z.string().email("Invalid confirmation email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  streetName: z.string().min(1, "Street name is required"),
  houseNumber: z.string().min(1, "House number is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});
