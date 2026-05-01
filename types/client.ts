
export type Client = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company_name: string | null;
    tax_number: string | null;
    address: string | null;
    city: string | null;
    postal_code: string | null;
    country: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
};

export type ClientFormData = {
    name: string;
    email: string;
    phone?: string;
    company_name?: string;
    tax_number?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    notes?: string;
};

export type PaginatedClients = {
    data: {
        data: Client[];
        meta: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
        };
    };
};