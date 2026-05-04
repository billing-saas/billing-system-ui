import { DashboardStats } from "@/types/dashboard";
import {
    TrendingUp,
    Clock,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";

type StatsCardsProps = {
    stats: DashboardStats;
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);

export function StatsCards({ stats }: StatsCardsProps) {
    const cards = [
        {
            title: "Revenue This Month",
            value: formatCurrency(stats.revenue.this_month),
            description: `${formatCurrency(stats.revenue.total)} total`,
            icon: <TrendingUp className="w-5 h-5" />,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Pending Amount",
            value: formatCurrency(stats.invoices.pending_amount),
            description: `${stats.invoices.by_status.sent} invoices pending`,
            icon: <Clock className="w-5 h-5" />,
            color: "bg-amber-50 text-amber-600",
        },
        {
            title: "Overdue Amount",
            value: formatCurrency(stats.invoices.overdue_amount),
            description: `${stats.invoices.by_status.overdue} invoices overdue`,
            icon: <AlertTriangle className="w-5 h-5" />,
            color: "bg-red-50 text-red-600",
        },
        {
            title: "Collection Rate",
            value: `${stats.collection_rate}%`,
            description: `${stats.invoices.by_status.paid} invoices paid`,
            icon: <CheckCircle className="w-5 h-5" />,
            color: "bg-green-50 text-green-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-500">
                            {card.title}
                        </span>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                            {card.icon}
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-900">
                        {card.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
    );
}