"use client";

import { useParams, useRouter } from "next/navigation";
import { useClient, useDeleteClient } from "@/hooks/useClients";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import {
    Pencil,
    Trash2,
    Mail,
    Phone,
    Building2,
    MapPin,
    FileText,
    Hash,
    ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

export default function ClientDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const clientId = Number(id);

    const { data, isLoading, isError } = useClient(clientId);
    const { mutate: deleteClient, isPending } = useDeleteClient();

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this client?")) return;
        deleteClient(clientId, {
            onSuccess: () => {
                toast.success("Client deleted successfully.");
                router.push("/clients");
            },
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-32 bg-slate-100 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-red-200">
                <p className="text-red-500 text-sm">Client not found.</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => router.push("/clients")}
                >
                    Back to clients
                </Button>
            </div>
        );
    }

    const client = data.data;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/clients")}
                    className="text-slate-400 hover:text-slate-600"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                    <PageHeader
                        title={client.name}
                        description={client.company_name ?? "Individual client"}
                        action={
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="border-slate-200 text-slate-600"
                                    onClick={() => router.push(`/clients/${clientId}/edit`)}
                                >
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                    onClick={handleDelete}
                                    disabled={isPending}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Colonne gauche — Infos */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Informations principales */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-sm font-semibold text-slate-900 mb-4">
                            Contact Information
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Email</p>
                                    <p className="text-sm text-slate-900">{client.email}</p>
                                </div>
                            </div>
                            {client.phone && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Phone</p>
                                        <p className="text-sm text-slate-900">{client.phone}</p>
                                    </div>
                                </div>
                            )}
                            {client.company_name && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Company</p>
                                        <p className="text-sm text-slate-900">{client.company_name}</p>
                                    </div>
                                </div>
                            )}
                            {client.tax_number && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Hash className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Tax Number</p>
                                        <p className="text-sm text-slate-900">{client.tax_number}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Adresse */}
                    {(client.address || client.city || client.country) && (
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2 className="text-sm font-semibold text-slate-900 mb-4">
                                Address
                            </h2>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="text-sm text-slate-900 space-y-0.5">
                                    {client.address && <p>{client.address}</p>}
                                    {(client.city || client.postal_code) && (
                                        <p>
                                            {[client.postal_code, client.city]
                                                .filter(Boolean)
                                                .join(" ")}
                                        </p>
                                    )}
                                    {client.country && (
                                        <p className="text-slate-500">{client.country}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    {client.notes && (
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2 className="text-sm font-semibold text-slate-900 mb-4">
                                Notes
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {client.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* Colonne droite — Résumé */}
                <div className="space-y-6">

                    {/* Stats rapides */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-sm font-semibold text-slate-900 mb-4">
                            Summary
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                <span className="text-sm text-slate-500">Total invoices</span>
                                <span className="text-sm font-medium text-slate-900">—</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                <span className="text-sm text-slate-500">Total revenue</span>
                                <span className="text-sm font-medium text-slate-900">—</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-slate-500">Member since</span>
                                <span className="text-sm font-medium text-slate-900">
                                    {new Date(client.created_at).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Invoices placeholder */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-slate-900">
                                Recent Invoices
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 text-xs"
                                onClick={() => router.push("/invoices")}
                            >
                                View all
                            </Button>
                        </div>
                        <div className="text-center py-6">
                            <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                            <p className="text-xs text-slate-400">
                                No invoices yet.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}