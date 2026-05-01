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
                title="Nouveau client"
                description="Ajoutez un nouveau client à votre liste."
            />
            <ClientForm
                onSubmit={handleSubmit}
                isLoading={isPending}
                submitLabel="Créer le client"
            />
        </div>
    );
}