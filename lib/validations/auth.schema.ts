import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required"),
});

export const registerSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .max(100),
        lastName: z
            .string()
            .min(1, "Last name is required")
            .max(100),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email"),
        password: z
            .string()
            .min(8, "Minimum 8 characters")
            .regex(/[A-Z]/, "At least one uppercase letter")
            .regex(/[a-z]/, "At least one lowercase letter")
            .regex(/[0-9]/, "At least one digit")
            .regex(/[@$!%*?&\-_]/, "At least one special character"),
        password_confirmation: z
            .string()
            .min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;