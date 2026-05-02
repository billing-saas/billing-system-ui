import { z } from "zod";

export const clientSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est obligatoire")
        .max(255, "Le nom est trop long"),
    email: z
        .string()
        .min(1, "L'email est obligatoire")
        .email("Email invalide"),
    phone: z.string().max(20).optional().or(z.literal("")),
    company_name: z.string().max(255).optional().or(z.literal("")),
    tax_number: z.string().max(50).optional().or(z.literal("")),
    address: z.string().max(255).optional().or(z.literal("")),
    city: z.string().max(100).optional().or(z.literal("")),
    postal_code: z.string().max(20).optional().or(z.literal("")),
    country: z.string().max(100).optional().or(z.literal("")),
    notes: z.string().optional().or(z.literal("")),
});

export type ClientSchema = z.infer<typeof clientSchema>;