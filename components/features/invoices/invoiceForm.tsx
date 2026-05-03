"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema, InvoiceSchema } from "@/lib/validations/invoice.schema";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { InvoiceItemsEditor } from "./InvoiceItemsEditor";
import { InvoiceTotals } from "./InvoiceTotals";
import { useClients } from "@/hooks/useClients";
import { Loader2 } from "lucide-react";

type InvoiceFormProps = {
    defaultValues?: Partial<Invoice>;
    onSubmit: (data: InvoiceSchema) => void;
    isLoading?: boolean;
    submitLabel?: string;
};

export function InvoiceForm({
    defaultValues,
    onSubmit,
    isLoading = false,
    submitLabel = "Save",
}: InvoiceFormProps) {
    const { data: clientsData } = useClients();
    const clients = clientsData?.data?.data ?? [];

    const form = useForm<InvoiceSchema>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            client_id: defaultValues?.client?.id ?? 0,
            issue_date: defaultValues?.issue_date ?? new Date().toISOString().split("T")[0],
            due_date: defaultValues?.due_date ?? "",
            tax_rate: defaultValues?.tax_rate ?? 0,
            currency: defaultValues?.currency ?? "USD",
            notes: defaultValues?.notes ?? "",
            terms: defaultValues?.terms ?? "",
            items: defaultValues?.items?.map((item) => ({
                description: item.description,
                quantity: item.quantity,
                unit_price: item.unit_price,
            })) ?? [{ description: "", quantity: 1, unit_price: 0 }],
        },
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Section: Invoice Details */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">
                        Invoice Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Client */}
                        <FormField
                            control={form.control}
                            name="client_id"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="text-slate-700">
                                        Client <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <select
                                            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
                                            }
                                        >
                                            <option value={0}>Select a client...</option>
                                            {clients.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.name}
                                                    {client.company_name
                                                        ? ` — ${client.company_name}`
                                                        : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Issue Date */}
                        <FormField
                            control={form.control}
                            name="issue_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">
                                        Issue Date <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Due Date */}
                        <FormField
                            control={form.control}
                            name="due_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">
                                        Due Date <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Items */}
                <InvoiceItemsEditor />

                {/* Totals */}
                <InvoiceTotals />

                {/* Notes & Terms */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">
                        Additional Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Additional notes for the client..."
                                            className="border-slate-200 resize-none"
                                            rows={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">
                                        Terms & Conditions
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Payment terms and conditions..."
                                            className="border-slate-200 resize-none"
                                            rows={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-slate-200"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isLoading && (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        {submitLabel}
                    </Button>
                </div>

            </form>
        </FormProvider>
    );
}