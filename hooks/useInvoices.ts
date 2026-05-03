"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { invoicesApi } from "@/lib/api/invoices.api";
import { InvoiceFormData } from "@/types/invoice";
import { toast } from "sonner";

export const invoiceKeys = {
    all: ["invoices"] as const,
    list: (filters: object) => ["invoices", "list", filters] as const,
    detail: (id: number) => ["invoices", "detail", id] as const,
};

export const useInvoices = (filters = {}) => {
    return useQuery({
        queryKey: invoiceKeys.list(filters),
        queryFn: () => invoicesApi.getAll(filters),
    });
};

export const useInvoice = (id: number) => {
    return useQuery({
        queryKey: invoiceKeys.detail(id),
        queryFn: () => invoicesApi.getOne(id),
        enabled: !!id,
    });
};

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: InvoiceFormData) => invoicesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
            toast.success("Invoice created successfully!");
        },
        onError: () => {
            toast.error("Error creating invoice.");
        },
    });
};

export const useUpdateInvoice = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<InvoiceFormData>) =>
            invoicesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(id) });
            toast.success("Invoice updated successfully!");
        },
        onError: () => {
            toast.error("Error updating invoice.");
        },
    });
};

export const useDeleteInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => invoicesApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
            toast.success("Invoice deleted successfully!");
        },
        onError: () => {
            toast.error("Error deleting invoice.");
        },
    });
};

export const useSendInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => invoicesApi.send(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(id) });
            toast.success("Invoice sent successfully!");
        },
        onError: () => {
            toast.error("Error sending invoice.");
        },
    });
};

export const useMarkAsPaid = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => invoicesApi.markAsPaid(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(id) });
            toast.success("Invoice marked as paid!");
        },
        onError: () => {
            toast.error("Error marking invoice as paid.");
        },
    });
};

export const useDownloadInvoice = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const blob = await invoicesApi.download(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice-${id}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        },
        onError: () => {
            toast.error("Error downloading invoice.");
        },
    });
};