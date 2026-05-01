
import api from "@/lib/axios";
import { ClientFormData, PaginatedClients, Client } from "@/types/client";

type ClientFilters = {
    search?: string;
    city?: string;
    country?: string;
    per_page?: number;
    page?: number;
};

export const clientsApi = {

    // GET /clients
    getAll: async (filters: ClientFilters = {}): Promise<PaginatedClients> => {
        const response = await api.get("/clients", { params: filters });
        return response.data;
    },

    // GET /clients/:id
    getOne: async (id: number): Promise<{ data: Client }> => {
        const response = await api.get(`/clients/${id}`);
        return response.data;
    },

    // POST /clients
    create: async (data: ClientFormData): Promise<{ data: Client }> => {
        const response = await api.post("/clients", data);
        return response.data;
    },

    // PUT /clients/:id
    update: async (id: number, data: Partial<ClientFormData>): Promise<{ data: Client }> => {
        const response = await api.put(`/clients/${id}`, data);
        return response.data;
    },

    // DELETE /clients/:id
    delete: async (id: number): Promise<void> => {
        await api.delete(`/clients/${id}`);
    },

};