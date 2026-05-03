"use client";

import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import {
    useSendInvoice,
    useMarkAsPaid,
    useDeleteInvoice,
    useDownloadInvoice,
} from "@/hooks/useInvoices";
import {
    Send,
    CheckCircle,
    Trash2,
    Pencil,
    Download,
    Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

type InvoiceActionsProps = {
    invoice: Invoice;
};

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
    const router = useRouter();

    const { mutate: sendInvoice, isPending: isSending } = useSendInvoice();
    const { mutate: markAsPaid, isPending: isMarkingPaid } = useMarkAsPaid();
    const { mutate: deleteInvoice, isPending: isDeleting } = useDeleteInvoice();
    const { mutate: downloadInvoice, isPending: isDownloading } = useDownloadInvoice();

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this invoice?")) return;
        deleteInvoice(invoice.id, {
            onSuccess: () => router.push("/invoices"),
        });
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">

            {/* Download — disponible pour tous les statuts sauf draft */}
            {invoice.status !== "draft" && (
                <Button
                    variant="outline"
                    className="border-slate-200"
                    onClick={() => downloadInvoice(invoice.id)}
                    disabled={isDownloading}
                >
                    {isDownloading
                        ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        : <Download className="w-4 h-4 mr-2" />
                    }
                    Download PDF
                </Button>
            )}

            {/* Draft → Modifier + Envoyer + Supprimer */}
            {invoice.status === "draft" && (
                <>
                    <Button
                        variant="outline"
                        className="border-slate-200"
                        onClick={() => router.push(`/invoices/${invoice.id}/edit`)}
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => sendInvoice(invoice.id)}
                        disabled={isSending}
                    >
                        {isSending
                            ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            : <Send className="w-4 h-4 mr-2" />
                        }
                        Send Invoice
                    </Button>
                    <Button
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting
                            ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            : <Trash2 className="w-4 h-4 mr-2" />
                        }
                        Delete
                    </Button>
                </>
            )}

            {/* Sent → Marquer payée */}
            {invoice.status === "sent" && (
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => markAsPaid(invoice.id)}
                    disabled={isMarkingPaid}
                >
                    {isMarkingPaid
                        ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        : <CheckCircle className="w-4 h-4 mr-2" />
                    }
                    Mark as Paid
                </Button>
            )}

            {/* Overdue → Marquer payée */}
            {invoice.status === "overdue" && (
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => markAsPaid(invoice.id)}
                    disabled={isMarkingPaid}
                >
                    {isMarkingPaid
                        ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        : <CheckCircle className="w-4 h-4 mr-2" />
                    }
                    Mark as Paid
                </Button>
            )}

        </div>
    );
}