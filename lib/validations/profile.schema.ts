import { z } from "zod";

export const profileSchema = z.object({
    first_name: z.string().min(1, "First name is required").max(100),
    last_name: z.string().min(1, "Last name is required").max(100),
    phone: z.string().max(20).optional().or(z.literal("")),
    address: z.string().max(255).optional().or(z.literal("")),
    city: z.string().max(100).optional().or(z.literal("")),
    postal_code: z.string().max(20).optional().or(z.literal("")),
    country: z.string().max(100).optional().or(z.literal("")),
    company_name: z.string().max(255).optional().or(z.literal("")),
    tax_number: z.string().max(50).optional().or(z.literal("")),
    currency: z.string().length(3).optional().or(z.literal("")),
});

export type ProfileSchema = z.infer<typeof profileSchema>;