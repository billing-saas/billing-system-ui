"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { DashboardStats } from "@/types/dashboard";

type InvoiceStatusChartProps = {
    byStatus: DashboardStats["invoices"]["by_status"];
};

const STATUS_CONFIG = [
    { key: "paid", label: "Paid", color: "#16a34a" },
    { key: "sent", label: "Sent", color: "#3b82f6" },
    { key: "draft", label: "Draft", color: "#94a3b8" },
    { key: "overdue", label: "Overdue", color: "#dc2626" },
];

export function InvoiceStatusChart({ byStatus }: InvoiceStatusChartProps) {
    const data = STATUS_CONFIG
        .map((s) => ({
            name: s.label,
            value: byStatus[s.key as keyof typeof byStatus],
            color: s.color,
        }))
        .filter((d) => d.value > 0);

    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (total === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-center h-64">
                <p className="text-sm text-slate-400">No invoice data yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-6">
                Invoice Status
            </h2>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [
                            typeof value === "number" ? value : 0,
                            "Invoices"
                        ]}
                        contentStyle={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                    />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(value) => (
                            <span style={{ fontSize: "12px", color: "#64748b" }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}