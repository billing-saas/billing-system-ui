import api from "@/lib/axios";
import { Invoice, InvoiceFormData, PaginatedInvoices } from "@/types/invoice";

type InvoiceFilters = {
    status?: string;
    client_id?: number;
    search?: string;
    date_from?: string;
    date_to?: string;
    per_page?: number;
    page?: number;
};

export const invoicesApi = {

    getAll: async (filters: InvoiceFilters = {}): Promise<PaginatedInvoices> => {
        const response = await api.get("/invoices", { params: filters });
        return response.data;
    },

    getOne: async (id: number): Promise<{ data: Invoice }> => {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    },

    create: async (data: InvoiceFormData): Promise<{ data: Invoice }> => {
        const response = await api.post("/invoices", data);
        return response.data;
    },

    update: async (
        id: number,
        data: Partial<InvoiceFormData>
    ): Promise<{ data: Invoice }> => {
        const response = await api.put(`/invoices/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/invoices/${id}`);
    },

    send: async (id: number): Promise<{ data: Invoice }> => {
        const response = await api.post(`/invoices/${id}/send`);
        return response.data;
    },

    markAsPaid: async (id: number): Promise<{ data: Invoice }> => {
        const response = await api.post(`/invoices/${id}/pay`);
        return response.data;
    },

    download: async (id: number): Promise<Blob> => {
        const response = await api.get(`/invoices/${id}/download`, {
            responseType: "blob",
        });
        return response.data;
    },
};