import api from "@/lib/axios";
import { UserProfile } from "@/types/profile";

type UpdateProfilePayload = {
    first_name?: string;
    last_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    company_name?: string;
    tax_number?: string;
    currency?: string;
};

export const profileApi = {
    get: async (): Promise<{ data: UserProfile }> => {
        const response = await api.get("/profile");
        return response.data;
    },

    update: async (
        data: UpdateProfilePayload
    ): Promise<{ data: UserProfile }> => {
        const response = await api.put("/profile", data);
        return response.data;
    },
};