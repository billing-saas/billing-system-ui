export type UserProfile = {
    id: number;
    user_id: string;
    email: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    postal_code: string | null;
    country: string | null;
    company_name: string | null;
    tax_number: string | null;
    currency: string;
    logo_path: string | null;
    created_at: string;
    updated_at: string;
};