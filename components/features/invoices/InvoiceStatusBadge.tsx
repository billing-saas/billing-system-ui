import { InvoiceStatus } from "@/types/invoice";
import { cn } from "@/lib/utils";

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
    draft: {
        label: "Draft",
        className: "bg-slate-100 text-slate-600",
    },
    sent: {
        label: "Sent",
        className: "bg-blue-50 text-blue-700",
    },
    paid: {
        label: "Paid",
        className: "bg-green-50 text-green-700",
    },
    overdue: {
        label: "Overdue",
        className: "bg-red-50 text-red-700",
    },
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
    const config = statusConfig[status];
    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            config.className
        )}>
            {config.label}
        </span>
    );
}