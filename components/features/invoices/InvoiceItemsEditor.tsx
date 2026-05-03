"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { InvoiceSchema } from "@/lib/validations/invoice.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";

export function InvoiceItemsEditor() {
    const form = useFormContext<InvoiceSchema>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const watchItems = form.watch("items");

    const getLineTotal = (index: number) => {
        const item = watchItems[index];
        if (!item) return 0;
        return (item.quantity ?? 0) * (item.unit_price ?? 0);
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Invoice Items
            </h2>

            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-3 mb-2 px-1">
                <div className="col-span-5 text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Description
                </div>
                <div className="col-span-2 text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Qty
                </div>
                <div className="col-span-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Unit Price
                </div>
                <div className="col-span-2 text-xs font-medium text-slate-400 uppercase tracking-wide text-right">
                    Total
                </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="grid grid-cols-12 gap-3 items-start p-3 bg-slate-50 rounded-lg"
                    >
                        {/* Description */}
                        <div className="col-span-12 md:col-span-5">
                            <FormField
                                control={form.control}
                                name={`items.${index}.description`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Service description..."
                                                className="bg-white border-slate-200"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Quantity */}
                        <div className="col-span-4 md:col-span-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.quantity`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1"
                                                className="bg-white border-slate-200"
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
                        </div>

                        {/* Unit Price */}
                        <div className="col-span-5 md:col-span-3">
                            <FormField
                                control={form.control}
                                name={`items.${index}.unit_price`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                className="bg-white border-slate-200"
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
                        </div>

                        {/* Total + Delete */}
                        <div className="col-span-3 md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                            <span className="text-sm font-medium text-slate-900">
                                ${getLineTotal(index).toFixed(2)}
                            </span>
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add item */}
            <Button
                type="button"
                variant="outline"
                className="mt-4 border-dashed border-slate-300 text-slate-500 hover:text-slate-700 w-full"
                onClick={() => append({ description: "", quantity: 1, unit_price: 0 })}
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
            </Button>
        </div>
    );
}