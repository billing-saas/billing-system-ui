"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Simulation API (remplace par ton backend Laravel)
            if (email === "admin@test.com" && password === "password") {
                document.cookie = "auth-storage=fake-token; path=/";
                router.push("/dashboard");
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (err: any) {
            setError("Email ou mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">Billing System</h1>
                    <p className="text-gray-400 text-sm mt-2">
                        Connectez-vous pour gérer vos factures
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="ex: admin@billing.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all py-2 rounded-lg font-semibold"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Pas encore de compte ?{" "}
                    <a href="/register" className="text-indigo-400 hover:underline">
                        Créer un compte
                    </a>
                </p>
            </div>
        </div>
    );
}