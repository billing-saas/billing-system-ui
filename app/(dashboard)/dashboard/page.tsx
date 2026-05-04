"use client";

import { useDashboardStats } from "@/hooks/useDashboard";
import { StatsCards } from "@/components/features/dashboard/StatsCards";
import { RevenueChart } from "@/components/features/dashboard/RevenueChart";
import { InvoiceStatusChart } from "@/components/features/dashboard/InvoiceStatusChart";
import { TopClientsList } from "@/components/features/dashboard/TopClientsList";
import { RecentInvoices } from "@/components/features/dashboard/RecentInvoices";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const { data, isLoading, isError } = useDashboardStats();
    const stats = data?.data;

    if (isLoading) {
        return (
            <div>
                <PageHeader
                    title="Dashboard"
                    description="Welcome back to Facturo."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-32 bg-slate-100 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
                <div className="h-72 bg-slate-100 rounded-xl animate-pulse mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-64 bg-slate-100 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="text-center py-16">
                <p className="text-red-500 text-sm">
                    Error loading dashboard.
                </p>
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="Dashboard"
                description={`Welcome back! Here's what's happening — ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`}
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

            {/* KPI Cards */}
            <StatsCards stats={stats} />

            {/* Revenue Chart */}
            <RevenueChart byMonth={stats.revenue.by_month} />

            {/* Bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <InvoiceStatusChart byStatus={stats.invoices.by_status} />
                </div>
                <div className="lg:col-span-1">
                    <TopClientsList clients={stats.top_clients} />
                </div>
                <div className="lg:col-span-1">
                    <RecentInvoices invoices={stats.recent_invoices} />
                </div>
            </div>

        </div>
    );
}