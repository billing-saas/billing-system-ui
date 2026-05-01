import { cn } from "@/lib/utils";

type Status = "draft" | "sent" | "paid" | "overdue";

const statusConfig: Record<Status, { label: string; className: string }> = {
    draft: {
        label: "Brouillon",
        className: "bg-slate-100 text-slate-600",
    },
    sent: {
        label: "Envoyée",
        className: "bg-blue-50 text-blue-700",
    },
    paid: {
        label: "Payée",
        className: "bg-green-50 text-green-700",
    },
    overdue: {
        label: "En retard",
        className: "bg-red-50 text-red-700",
    },
};

type StatusBadgeProps = {
    status: Status;
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                config.className
            )}
        >
            {config.label}
        </span>
    );
}