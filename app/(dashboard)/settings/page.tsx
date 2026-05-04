"use client";

import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileSchema } from "@/lib/validations/profile.schema";
import { Loader2, User, Building2, MapPin, Settings } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";

const CURRENCIES = ["USD", "EUR", "GBP", "MGA", "CAD", "AUD"];

export default function SettingsPage() {
    const { data, isLoading } = useProfile();
    const { mutate: updateProfile, isPending } = useUpdateProfile();
    const profile = data?.data;
    const user = useAuthStore((s) => s.user);

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            address: "",
            city: "",
            postal_code: "",
            country: "",
            company_name: "",
            tax_number: "",
            currency: "USD",
        },
    });

    // Populate form when data loads
    useEffect(() => {
        if (profile) {
            form.reset({
                first_name: profile.first_name ?? "",
                last_name: profile.last_name ?? "",
                phone: profile.phone ?? "",
                address: profile.address ?? "",
                city: profile.city ?? "",
                postal_code: profile.postal_code ?? "",
                country: profile.country ?? "",
                company_name: profile.company_name ?? "",
                tax_number: profile.tax_number ?? "",
                currency: profile.currency ?? "USD",
            });
        }
    }, [profile]);

    const onSubmit = (data: ProfileSchema) => {
        updateProfile(data);
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-48 bg-slate-100 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="Settings"
                description="Manage your account and billing preferences."
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Sidebar navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-3">
                        {[
                            { label: "Profile", icon: User },
                            { label: "Business", icon: Building2 },
                            { label: "Address", icon: MapPin },
                            { label: "Preferences", icon: Settings },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-colors"
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-3">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >

                            {/* Account Info */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-xl font-semibold text-blue-700">
                                            {profile?.first_name?.charAt(0).toUpperCase()}
                                            {profile?.last_name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            {profile?.full_name}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <h2 className="text-sm font-semibold text-slate-900 mb-4">
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-700">
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John"
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
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-700">
                                                    Last Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Doe"
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
                                                <FormLabel className="text-slate-700">
                                                    Phone
                                                </FormLabel>
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
                                </div>
                            </div>

                            {/* Business Info */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h2 className="text-sm font-semibold text-slate-900 mb-4">
                                    Business Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="company_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-700">
                                                    Company Name
                                                </FormLabel>
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

                            {/* Address */}
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
                                                <FormLabel className="text-slate-700">
                                                    City
                                                </FormLabel>
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
                                                <FormLabel className="text-slate-700">
                                                    Country
                                                </FormLabel>
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

                            {/* Preferences */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h2 className="text-sm font-semibold text-slate-900 mb-4">
                                    Preferences
                                </h2>
                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem className="max-w-xs">
                                            <FormLabel className="text-slate-700">
                                                Default Currency
                                            </FormLabel>
                                            <FormControl>
                                                <select
                                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                >
                                                    {CURRENCIES.map((c) => (
                                                        <option key={c} value={c}>
                                                            {c}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {isPending && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    )}
                                    Save Changes
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>

            </div>
        </div>
    );
}