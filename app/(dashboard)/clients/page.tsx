"use client";

import { useSearchParams } from "next/navigation";
import { useClients } from "@/hooks/useClients";
import { ClientsTable } from "@/components/features/clients/ClientsTable";
import { ClientsFilters } from "@/components/features/clients/ClientsFilters";
import { ClientsPagination } from "@/components/features/clients/ClientsPagination";

import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filters = {
        search: searchParams.get("search") ?? undefined,
        page: Number(searchParams.get("page") ?? 1),
        per_page: 10,
    };

    const { data, isLoading, isError } = useClients(filters);

    return (
        <div>
            <PageHeader
                title="Customers"
                description="Manage your customers and their information."
                action={
                    <Button
                        onClick={() => router.push("/clients/new")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Customer
                    </Button>
                }
            />

            <ClientsFilters />

            {isLoading && (
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-12 bg-slate-100 rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            )}

            {isError && (
                <div className="text-center py-16 bg-white rounded-xl border border-red-200">
                    <p className="text-red-500 text-sm">
                        Error occurred while loading customers.
                    </p>
                </div>
            )}

            {data && (
                <>
                    <ClientsTable clients={data.data.data} />
                    <ClientsPagination
                        currentPage={data.data.meta.current_page}
                        lastPage={data.data.meta.last_page}
                        total={data.data.meta.total}
                    />
                </>
            )}
        </div>
    );
}