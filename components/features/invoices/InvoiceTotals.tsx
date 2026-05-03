"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { InvoiceSchema } from "@/lib/validations/invoice.schema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function InvoiceTotals() {
    const form = useFormContext<InvoiceSchema>();

    const items = useWatch({ control: form.control, name: "items" }) ?? [];
    const taxRate = useWatch({ control: form.control, name: "tax_rate" }) ?? 0;

    const subtotal = items.reduce(
        (sum, item) => sum + (item.quantity ?? 0) * (item.unit_price ?? 0),
        0
    );
    const taxAmount = subtotal * ((taxRate ?? 0) / 100);
    const total = subtotal + taxAmount;

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Summary
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-start">

                {/* Tax rate + Currency */}
                <div className="flex gap-4 flex-1">
                    <FormField
                        control={form.control}
                        name="tax_rate"
                        render={({ field }) => (
                            <FormItem className="w-32">
                                <FormLabel className="text-slate-700">
                                    Tax Rate (%)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="border-slate-200"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(parseFloat(e.target.value) || 0)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                            <FormItem className="w-24">
                                <FormLabel className="text-slate-700">
                                    Currency
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="USD"
                                        maxLength={3}
                                        className="border-slate-200 uppercase"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Totaux */}
                <div className="w-full md:w-64 space-y-2 bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="text-slate-900 font-medium">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">
                            Tax ({taxRate ?? 0}%)
                        </span>
                        <span className="text-slate-900 font-medium">
                            ${taxAmount.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold border-t border-slate-200 pt-2 mt-2">
                        <span className="text-slate-900">Total</span>
                        <span className="text-blue-600 text-base">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}