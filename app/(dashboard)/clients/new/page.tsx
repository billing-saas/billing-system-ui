"use client";

import { ClientForm } from "@/components/features/clients/ClientForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCreateClient } from "@/hooks/useClients";
import { ClientSchema } from "@/lib/validations/client.schema";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
    const router = useRouter();
    const { mutate: createClient, isPending } = useCreateClient();

    const handleSubmit = (data: ClientSchema) => {
        createClient(data, {
            onSuccess: () => router.push("/clients"),
        });
    };

    return (
        <div>
            <PageHeader
                title="New Customer"
                description="Add a new customer to your list."
            />
            <ClientForm
                onSubmit={handleSubmit}
                isLoading={isPending}
                submitLabel="Create Customer"
            />
        </div>
    );
}