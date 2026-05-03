import { Client } from "./client";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type InvoiceItem = {
    id: number;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
};

export type Invoice = {
    id: number;
    invoice_number: string;
    status: InvoiceStatus;
    issue_date: string;
    due_date: string;
    paid_at: string | null;
    subtotal: number;
    tax_rate: number;
    tax_amount: number;
    total: number;
    currency: string;
    notes: string | null;
    terms: string | null;
    client: Client;
    items: InvoiceItem[];
    stripe_payment_url: string | null;
    created_at: string;
    updated_at: string;
};

export type InvoiceFormData = {
    client_id: number;
    issue_date: string;
    due_date: string;
    tax_rate?: number;
    currency?: string;
    notes?: string;
    terms?: string;
    items: {
        description: string;
        quantity: number;
        unit_price: number;
    }[];
};

export type PaginatedInvoices = {
    data: {
        data: Invoice[];
        meta: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
        };
    };
};