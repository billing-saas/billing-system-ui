"use client";

import { useParams, useRouter } from "next/navigation";
import { useInvoice } from "@/hooks/useInvoices";
import { PageHeader } from "@/components/ui/PageHeader";
import { InvoiceStatusBadge } from "@/components/features/invoices/InvoiceStatusBadge";
import { InvoiceActions } from "@/components/features/invoices/InvoiceActions";
import { InvoiceStatus } from "@/types/invoice";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InvoiceDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const invoiceId = Number(id);

    const { data, isLoading, isError } = useInvoice(invoiceId);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-red-200">
                <p className="text-red-500 text-sm">Invoice not found.</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => router.push("/invoices")}
                >
                    Back to invoices
                </Button>
            </div>
        );
    }

    const invoice = data.data;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/invoices")}
                    className="text-slate-400 hover:text-slate-600"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {invoice.invoice_number}
                        </h1>
                        <InvoiceStatusBadge status={invoice.status as InvoiceStatus} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        {invoice.client?.name}
                        {invoice.client?.company_name
                            ? ` — ${invoice.client.company_name}`
                            : ""}
                    </p>
                </div>
                <InvoiceActions invoice={invoice} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Colonne gauche */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Items */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-semibold text-slate-900">
                                Invoice Items
                            </h2>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="text-left text-xs font-medium text-slate-400 uppercase px-6 py-3">
                                        Description
                                    </th>
                                    <th className="text-right text-xs font-medium text-slate-400 uppercase px-6 py-3">
                                        Qty
                                    </th>
                                    <th className="text-right text-xs font-medium text-slate-400 uppercase px-6 py-3">
                                        Unit Price
                                    </th>
                                    <th className="text-right text-xs font-medium text-slate-400 uppercase px-6 py-3">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-slate-100"
                                    >
                                        <td className="px-6 py-4 text-sm text-slate-900">
                                            {item.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 text-right">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 text-right">
                                            {invoice.currency} {item.unit_price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 text-right">
                                            {invoice.currency} {item.total.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Totaux */}
                        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="text-slate-900">
                                    {invoice.currency} {invoice.subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">
                                    Tax ({invoice.tax_rate}%)
                                </span>
                                <span className="text-slate-900">
                                    {invoice.currency} {invoice.tax_amount.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm font-semibold border-t border-slate-200 pt-2">
                                <span className="text-slate-900">Total</span>
                                <span className="text-blue-600 text-base">
                                    {invoice.currency} {invoice.total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes & Terms */}
                    {(invoice.notes || invoice.terms) && (
                        <div className="bg-white rounded-xl border border-slate-200 p-6 grid grid-cols-2 gap-6">
                            {invoice.notes && (
                                <div>
                                    <h3 className="text-xs font-medium text-slate-400 uppercase mb-2">
                                        Notes
                                    </h3>
                                    <p className="text-sm text-slate-600">{invoice.notes}</p>
                                </div>
                            )}
                            {invoice.terms && (
                                <div>
                                    <h3 className="text-xs font-medium text-slate-400 uppercase mb-2">
                                        Terms
                                    </h3>
                                    <p className="text-sm text-slate-600">{invoice.terms}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Colonne droite */}
                <div className="space-y-6">

                    {/* Résumé */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-sm font-semibold text-slate-900 mb-4">
                            Summary
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-sm text-slate-500">Issue Date</span>
                                <span className="text-sm font-medium text-slate-900">
                                    {new Date(invoice.issue_date).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-sm text-slate-500">Due Date</span>
                                <span className="text-sm font-medium text-slate-900">
                                    {new Date(invoice.due_date).toLocaleDateString()}
                                </span>
                            </div>
                            {invoice.paid_at && (
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-sm text-slate-500">Paid On</span>
                                    <span className="text-sm font-medium text-green-600">
                                        {new Date(invoice.paid_at).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between py-2">
                                <span className="text-sm text-slate-500">Currency</span>
                                <span className="text-sm font-medium text-slate-900">
                                    {invoice.currency}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Client */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-sm font-semibold text-slate-900 mb-4">
                            Client
                        </h2>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-900">
                                {invoice.client?.name}
                            </p>
                            {invoice.client?.company_name && (
                                <p className="text-sm text-slate-500">
                                    {invoice.client.company_name}
                                </p>
                            )}
                            <p className="text-sm text-slate-500">
                                {invoice.client?.email}
                            </p>
                            {invoice.client?.phone && (
                                <p className="text-sm text-slate-500">
                                    {invoice.client.phone}
                                </p>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 text-blue-600 text-xs p-0"
                            onClick={() =>
                                router.push(`/clients/${invoice.client?.id}`)
                            }
                        >
                            View client →
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}