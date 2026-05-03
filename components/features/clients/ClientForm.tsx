"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clientSchema, ClientSchema } from "@/lib/validations/client.schema";
import { Client } from "@/types/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

type ClientFormProps = {
    defaultValues?: Partial<Client>;
    onSubmit: (data: ClientSchema) => void;
    isLoading?: boolean;
    submitLabel?: string;
};

export function ClientForm({
    defaultValues,
    onSubmit,
    isLoading = false,
    submitLabel = "Save",
}: ClientFormProps) {
    const form = useForm<ClientSchema>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            email: defaultValues?.email ?? "",
            phone: defaultValues?.phone ?? "",
            company_name: defaultValues?.company_name ?? "",
            tax_number: defaultValues?.tax_number ?? "",
            address: defaultValues?.address ?? "",
            city: defaultValues?.city ?? "",
            postal_code: defaultValues?.postal_code ?? "",
            country: defaultValues?.country ?? "",
            notes: defaultValues?.notes ?? "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Section: Main Information */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">
                        Main Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">
                                        Name <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">
                                        Email <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="+261 34 00 000 00"
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Company</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Acme Inc."
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tax_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">
                                        Tax Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="TAX-00000000"
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

                {/* Section: Address */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">
                        Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">
                                            Street Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="123 Main Street"
                                                className="border-slate-200"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">City</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Antananarivo"
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postal_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">
                                        Postal Code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="101"
                                            className="border-slate-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Madagascar"
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

                {/* Section: Notes */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">
                        Notes
                    </h2>
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Additional information about this client..."
                                        className="border-slate-200 resize-none"
                                        rows={4}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
        </Form>
    );
}