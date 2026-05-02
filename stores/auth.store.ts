import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

type User = {
    id: string;
    email: string;
};

type AuthStore = {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    logout: () => void;
};

const cookieStorage = {
    getItem: (name: string) => Cookies.get(name) ?? null,
    setItem: (name: string, value: string) => Cookies.set(name, value, { expires: 7 }),
    removeItem: (name: string): undefined => {
        Cookies.remove(name);
        return undefined;
    },
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => cookieStorage),
        }
    )
);