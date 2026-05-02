"use client";

import { ClientForm } from "@/components/features/clients/ClientForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { useClient, useUpdateClient } from "@/hooks/useClients";
import { ClientSchema } from "@/lib/validations/client.schema";
import { useParams, useRouter } from "next/navigation";

export default function EditClientPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const clientId = Number(id);

    const { data, isLoading } = useClient(clientId);
    const { mutate: updateClient, isPending } = useUpdateClient(clientId);

    const handleSubmit = (data: ClientSchema) => {
        updateClient(data, {
            onSuccess: () => router.push("/clients"),
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-48 bg-slate-100 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="Update Customer"
                description={`Edit of ${data?.data.name}`}
            />
            <ClientForm
                defaultValues={data?.data}
                onSubmit={handleSubmit}
                isLoading={isPending}
                submitLabel="Save Changes"
            />
        </div>
    );
}