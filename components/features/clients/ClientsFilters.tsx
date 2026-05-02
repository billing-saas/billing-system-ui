"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export function ClientsFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateParams = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            params.set("page", "1"); // reset page à chaque filtre
            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams]
    );

    const handleSearch = useDebouncedCallback((value: string) => {
        updateParams("search", value);
    }, 400);

    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    placeholder="Rechercher un client..."
                    className="pl-9 bg-white border-slate-200"
                    defaultValue={searchParams.get("search") ?? ""}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
    );
}