"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useInvoices } from "@/hooks/useInvoices";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceStatusBadge } from "@/components/features/invoices/InvoiceStatusBadge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { useDeleteInvoice } from "@/hooks/useInvoices";
import { InvoiceStatus } from "@/types/invoice";

const STATUS_FILTERS: { label: string; value: string }[] = [
    { label: "All", value: "" },
    { label: "Draft", value: "draft" },
    { label: "Sent", value: "sent" },
    { label: "Paid", value: "paid" },
    { label: "Overdue", value: "overdue" },
];

export default function InvoicesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filters = {
        search: searchParams.get("search") ?? undefined,
        status: searchParams.get("status") ?? undefined,
        page: Number(searchParams.get("page") ?? 1),
        per_page: 10,
    };

    const { data, isLoading, isError } = useInvoices(filters);
    const { mutate: deleteInvoice } = useDeleteInvoice();

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);
        params.set("page", "1");
        router.push(`/invoices?${params.toString()}`);
    };

    const invoices = data?.data?.data ?? [];

    return (
        <div>
            <PageHeader
                title="Invoices"
                description="Manage and track all your invoices."
                action={
                    <Button
                        onClick={() => router.push("/invoices/new")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Invoice
                    </Button>
                }
            />

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search invoices..."
                        className="pl-9 bg-white border-slate-200"
                        defaultValue={searchParams.get("search") ?? ""}
                        onChange={(e) => updateParam("search", e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    {STATUS_FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => updateParam("status", filter.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filters.status === filter.value ||
                                (!filters.status && filter.value === "")
                                ? "bg-blue-600 text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            {isLoading && (
                <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
                    ))}
                </div>
            )}

            {isError && (
                <div className="text-center py-16 bg-white rounded-xl border border-red-200">
                    <p className="text-red-500 text-sm">Error loading invoices.</p>
                </div>
            )}

            {!isLoading && !isError && invoices.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                    <p className="text-slate-500 text-sm">No invoices found.</p>
                    <p className="text-slate-400 text-xs mt-1">
                        Create your first invoice to get started.
                    </p>
                </div>
            )}

            {!isLoading && invoices.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50">
                                <TableHead className="text-slate-500 font-medium">Number</TableHead>
                                <TableHead className="text-slate-500 font-medium">Client</TableHead>
                                <TableHead className="text-slate-500 font-medium">Issue Date</TableHead>
                                <TableHead className="text-slate-500 font-medium">Due Date</TableHead>
                                <TableHead className="text-slate-500 font-medium">Total</TableHead>
                                <TableHead className="text-slate-500 font-medium">Status</TableHead>
                                <TableHead className="w-12" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow
                                    key={invoice.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <TableCell className="font-medium text-slate-900">
                                        {invoice.invoice_number}
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {invoice.client?.name ?? "—"}
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {new Date(invoice.issue_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {new Date(invoice.due_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">
                                        {invoice.currency} {invoice.total.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <InvoiceStatusBadge status={invoice.status as InvoiceStatus} />
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => router.push(`/invoices/${invoice.id}`)}
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View
                                                </DropdownMenuItem>
                                                {invoice.status === "draft" && (
                                                    <>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                router.push(`/invoices/${invoice.id}/edit`)
                                                            }
                                                        >
                                                            <Pencil className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600 focus:text-red-600"
                                                            onClick={() => {
                                                                if (confirm("Delete this invoice?")) {
                                                                    deleteInvoice(invoice.id);
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

        </div>
    );
}