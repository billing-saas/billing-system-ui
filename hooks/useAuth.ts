"use client";

import { useAuthStore } from "@/stores/auth.store";
import { AuthService } from "@/lib/api/auth.api";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const { token, user } = useAuthStore();
    const router = useRouter();

    const login = async (email: string, password: string) => {
        await AuthService.login({ email, password });
        router.push("/dashboard");
    };

    const logout = async () => {
        await AuthService.logout();
        router.push("/login");
    };

    return {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
    };
};