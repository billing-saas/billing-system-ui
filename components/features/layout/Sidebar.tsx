"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    FileText,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Clients",
        href: "/clients",
        icon: Users,
    },
    {
        label: "Factures",
        href: "/invoices",
        icon: FileText,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    return (
        <aside className="w-64 bg-slate-900 flex flex-col h-full">

            {/* Logo */}
            <div className="px-6 py-6 border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-semibold text-lg">
                        Facturo
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User + Logout */}
            <div className="px-4 py-4 border-t border-slate-700">
                <div className="px-3 py-2 mb-2">
                    <p className="text-white text-sm font-medium truncate">
                        {user?.email}
                    </p>
                    <p className="text-slate-400 text-xs capitalize">
                        {user?.role}
                    </p>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                </button>
            </div>

        </aside>
    );
}