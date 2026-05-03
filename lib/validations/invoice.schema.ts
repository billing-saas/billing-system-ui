import { z } from "zod";

export const invoiceItemSchema = z.object({
    description: z
        .string()
        .min(1, "Description is required")
        .max(255),
    quantity: z
        .number({ error: "Quantity must be a number" })
        .min(0.01, "Quantity must be greater than 0"),
    unit_price: z
        .number({ error: "Unit price must be a number" })
        .min(0, "Unit price must be positive"),
});

export const invoiceSchema = z.object({
    client_id: z
        .number({ error: "Please select a client" })
        .min(1, "Please select a client"),
    issue_date: z
        .string()
        .min(1, "Issue date is required"),
    due_date: z
        .string()
        .min(1, "Due date is required"),
    tax_rate: z
        .number()
        .min(0)
        .max(100),
    currency: z
        .string()
        .length(3),
    notes: z.string().optional().or(z.literal("")),
    terms: z.string().optional().or(z.literal("")),
    items: z
        .array(invoiceItemSchema)
        .min(1, "At least one item is required"),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;