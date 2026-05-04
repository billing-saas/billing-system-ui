// lib/api/auth.ts
import api from "@/lib/axios";
import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

type LoginPayload = {
    email: string;
    password: string;
};

type RegisterPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type AuthResponse = {
    success: boolean;
    data: {
        user: { userId: string; email: string };
        accessToken: string;
        sessionId: string;
    };
};

// Instance axios dédiée à l'AaaS (sans baseURL Laravel)
const aaasApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AAAS_URL || "",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        'x-api-key': process.env.NEXT_PUBLIC_AAAS_API_KEY || "",
    },
});

aaasApi.interceptors.request.use((config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log(`[AaaS Request] ${config.method?.toUpperCase()} → ${fullUrl}`);
    return config;
});

aaasApi.interceptors.response.use(
    (response) => {
        console.log(`[AaaS Response] ${response.status} → ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error(`[AaaS Error] ${error.response?.status} → ${error.response?.config?.url}`);
        return Promise.reject(error);
    }
);

export const AuthService = {

    login: async (payload: LoginPayload) => {
        const response = await aaasApi.post<AuthResponse>(
            "/auth/login",
            payload
        );

        const { accessToken, user } = response.data.data;

        useAuthStore.getState().setAuth(accessToken, {
            id: user.userId,
            email: user.email,
        });

        return response.data;
    },

    register: async (payload: RegisterPayload) => {
        const registerResponse = await api.post("/auth/register", payload);
        return registerResponse.data;
    },

    logout: async () => {
        try {
            const token = useAuthStore.getState().token;

            await aaasApi.post("/auth/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } finally {
            useAuthStore.getState().logout();
        }
    },

    refreshToken: async () => {
        const response = await aaasApi.post("/auth/refresh-token");
        const { accessToken } = response.data;
        const currentUser = useAuthStore.getState().user;

        if (currentUser) {
            useAuthStore.getState().setAuth(accessToken, currentUser);
        }

        return accessToken;
    },
};