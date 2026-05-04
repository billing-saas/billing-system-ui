"use client";

import { RecentInvoice } from "@/types/dashboard";
import { InvoiceStatusBadge } from "@/components/features/invoices/InvoiceStatusBadge";
import { InvoiceStatus } from "@/types/invoice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type RecentInvoicesProps = {
    invoices: RecentInvoice[];
};

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
    const router = useRouter();

    return (
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
                    View all →
                </Button>
            </div>
            {invoices.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">
                    No invoices yet.
                </p>
            ) : (
                <div className="space-y-2">
                    {invoices.map((invoice) => (
                        <div
                            key={invoice.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => router.push(`/invoices/${invoice.id}`)}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-slate-900">
                                        {invoice.invoice_number}
                                    </p>
                                    <InvoiceStatusBadge
                                        status={invoice.status as InvoiceStatus}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {invoice.client?.name ?? "—"} •{" "}
                                    Due {new Date(invoice.due_date).toLocaleDateString()}
                                </p>
                            </div>
                            <span className="text-sm font-semibold text-slate-900 flex-shrink-0">
                                {invoice.currency} ${parseFloat(String(invoice.total)).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}