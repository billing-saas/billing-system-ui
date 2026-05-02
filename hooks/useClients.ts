"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsApi } from "@/lib/api/clients.api";
import { ClientFormData } from "@/types/client";
import { toast } from "sonner";

// Clé unique pour le cache TanStack Query
export const clientKeys = {
    all: ["clients"] as const,
    list: (filters: object) => ["clients", "list", filters] as const,
    detail: (id: number) => ["clients", "detail", id] as const,
};

// Hook pour récupérer la liste des clients
export const useClients = (filters = {}) => {
    return useQuery({
        queryKey: clientKeys.list(filters),
        queryFn: () => clientsApi.getAll(filters),
    });
};

// Hook pour récupérer un seul client
export const useClient = (id: number) => {
    return useQuery({
        queryKey: clientKeys.detail(id),
        queryFn: () => clientsApi.getOne(id),
        enabled: !!id, // n'exécute pas la requête si id est null
    });
};

// Hook pour créer un client
export const useCreateClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ClientFormData) => clientsApi.create(data),
        onSuccess: () => {
            // Invalide le cache → TanStack refetch automatiquement la liste
            queryClient.invalidateQueries({ queryKey: clientKeys.all });
            toast.success("Customer created successfully!");
        },
        onError: () => {
            toast.error("Error occurred while creating the customer.");
        },
    });
};

// Hook pour modifier un client
export const useUpdateClient = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<ClientFormData>) => clientsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: clientKeys.all });
            queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) });
            toast.success("Customer updated successfully!");
        },
        onError: () => {
            toast.error("Error occurred while updating the customer.");
        },
    });
};

// Hook pour supprimer un client
export const useDeleteClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => clientsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: clientKeys.all });
            toast.success("Customer deleted successfully!");
        },
        onError: () => {
            toast.error("Error occurred while deleting the customer.");
        },
    });
};