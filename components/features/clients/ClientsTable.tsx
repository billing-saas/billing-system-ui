"use client";

import { Client } from "@/types/client";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteClient } from "@/hooks/useClients";

type ClientsTableProps = {
    clients: Client[];
};

export function ClientsTable({ clients }: ClientsTableProps) {
    const router = useRouter();
    const { mutate: deleteClient } = useDeleteClient();

    if (clients.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500 text-sm">No customers found.</p>
                <p className="text-slate-400 text-xs mt-1">
                    Create your first customer to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="text-slate-500 font-medium">Name</TableHead>
                        <TableHead className="text-slate-500 font-medium">Email</TableHead>
                        <TableHead className="text-slate-500 font-medium">Company</TableHead>
                        <TableHead className="text-slate-500 font-medium">City</TableHead>
                        <TableHead className="text-slate-500 font-medium">Phone</TableHead>
                        <TableHead className="w-12" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow
                            key={client.id}
                            className="hover:bg-slate-50 transition-colors"
                        >
                            <TableCell className="font-medium text-slate-900">
                                {client.name}
                            </TableCell>
                            <TableCell className="text-slate-500">
                                {client.email}
                            </TableCell>
                            <TableCell className="text-slate-500">
                                {client.company_name ?? "—"}
                            </TableCell>
                            <TableCell className="text-slate-500">
                                {client.city ?? "—"}
                            </TableCell>
                            <TableCell className="text-slate-500">
                                {client.phone ?? "—"}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => router.push(`/clients/${client.id}`)}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => router.push(`/clients/${client.id}/edit`)}
                                        >
                                            <Pencil className="w-4 h-4 mr-2" />
                                            Edit Customer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => {
                                                if (confirm("Delete this customer ?")) {
                                                    deleteClient(client.id);
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Customer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}