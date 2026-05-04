import { TopClient } from "@/types/dashboard";
import { useRouter } from "next/navigation";

type TopClientsListProps = {
    clients: TopClient[];
};

export function TopClientsList({ clients }: TopClientsListProps) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Top Clients
            </h2>
            {clients.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">
                    No data yet.
                </p>
            ) : (
                <div className="space-y-3">
                    {clients.map((client, index) => (
                        <div
                            key={client.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => router.push(`/clients/${client.id}`)}
                        >
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-blue-700">
                                    {index + 1}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                    {client.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    {client.invoice_count} invoice{client.invoice_count > 1 ? "s" : ""}
                                </p>
                            </div>
                            <span className="text-sm font-semibold text-slate-900 flex-shrink-0">
                                ${parseFloat(String(client.total_revenue)).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}