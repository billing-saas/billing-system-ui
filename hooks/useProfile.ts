"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/lib/api/profile.api";
import { toast } from "sonner";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => profileApi.get(),
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            toast.success("Profile updated successfully!");
        },
        onError: () => {
            toast.error("Error updating profile.");
        },
    });
};