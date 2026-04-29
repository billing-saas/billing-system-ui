import api from "@/lib/axios";
import { useAuthStore } from "@/stores/auth.store";

type LoginPayload = {
    email: string;
    password: string;
};

type AuthResponse = {
    success: boolean;
    data: {
        user: { userId: string; email: string };
        accessToken: string;
        sessionId: string;
    };
};

export const AuthService = {

    login: async (payload: LoginPayload) => {
        const response = await api.post<AuthResponse>(
            `${process.env.NEXT_PUBLIC_AAAS_URL}/auth/login`,
            payload
        );

        const { accessToken, user } = response.data.data;

        // Stocke dans Zustand
        useAuthStore.getState().setAuth(accessToken, {
            id: user.userId,
            email: user.email,
            role: "user",
        });

        return response.data;
    },

    logout: async () => {
        await api.post(
            `${process.env.NEXT_PUBLIC_AAAS_URL}/auth/logout`
        );
        useAuthStore.getState().logout();
    },

    refreshToken: async () => {
        const response = await api.post(
            `${process.env.NEXT_PUBLIC_AAAS_URL}/auth/refresh-token`
        );

        const { accessToken } = response.data;
        const currentUser = useAuthStore.getState().user;

        if (currentUser) {
            useAuthStore.getState().setAuth(accessToken, currentUser);
        }

        return accessToken;
    },
};