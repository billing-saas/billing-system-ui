"use client";

import { InvoiceForm } from "@/components/features/invoices/invoiceForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { useInvoice, useUpdateInvoice } from "@/hooks/useInvoices";
import { InvoiceSchema } from "@/lib/validations/invoice.schema";
import { useRouter, useParams } from "next/navigation";

export default function EditInvoicePage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const invoiceId = Number(id);

    const { data, isLoading } = useInvoice(invoiceId);
    const { mutate: updateInvoice, isPending } = useUpdateInvoice(invoiceId);

    const handleSubmit = (data: InvoiceSchema) => {
        updateInvoice(data, {
            onSuccess: () => router.push(`/invoices/${invoiceId}`),
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-48 bg-slate-100 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="Edit Invoice"
                description={`Editing ${data?.data.invoice_number}`}
            />
            <InvoiceForm
                defaultValues={data?.data}
                onSubmit={handleSubmit}
                isLoading={isPending}
                submitLabel="Save Changes"
            />
        </div>
    );
}