"use client";

import { InvoiceForm } from "@/components/features/invoices/invoiceForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { InvoiceSchema } from "@/lib/validations/invoice.schema";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
    const router = useRouter();
    const { mutate: createInvoice, isPending } = useCreateInvoice();

    const handleSubmit = (data: InvoiceSchema) => {
        createInvoice(data, {
            onSuccess: (res) => router.push(`/invoices/${res.data.id}`),
        });
    };

    return (
        <div>
            <PageHeader
                title="New Invoice"
                description="Create a new invoice for your client."
            />
            <InvoiceForm
                onSubmit={handleSubmit}
                isLoading={isPending}
                submitLabel="Create Invoice"
            />
        </div>
    );
}