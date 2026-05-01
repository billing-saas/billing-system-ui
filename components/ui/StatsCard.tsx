type StatsCardProps = {
    title: string;
    value: string;
    description?: string;
    icon: React.ReactNode;
    trend?: {
        value: string;
        positive: boolean;
    };
};

export function StatsCard({
    title,
    value,
    description,
    icon,
    trend,
}: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">
                    {title}
                </span>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    {icon}
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-2xl font-semibold text-slate-900">
                        {value}
                    </p>
                    {description && (
                        <p className="text-xs text-slate-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>
                {trend && (
                    <span
                        className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            trend.positive
                                ? "text-green-700 bg-green-50"
                                : "text-red-700 bg-red-50"
                        )}
                    >
                        {trend.value}
                    </span>
                )}
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";