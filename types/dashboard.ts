export type RevenueStats = {
    this_month: number;
    total: number;
    by_month: number[];
};

export type InvoiceStats = {
    by_status: {
        draft: number;
        sent: number;
        paid: number;
        overdue: number;
    };
    pending_amount: number;
    overdue_amount: number;
};

export type TopClient = {
    id: number;
    name: string;
    company_name: string | null;
    total_revenue: number;
    invoice_count: number;
};

export type RecentInvoice = {
    id: number;
    invoice_number: string;
    status: string;
    total: number;
    currency: string;
    due_date: string;
    client: { name: string } | null;
};

export type DashboardStats = {
    revenue: RevenueStats;
    invoices: InvoiceStats;
    collection_rate: number;
    top_clients: TopClient[];
    recent_invoices: RecentInvoice[];
};