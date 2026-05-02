"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type ClientsPaginationProps = {
    currentPage: number;
    lastPage: number;
    total: number;
};

export function ClientsPagination({
    currentPage,
    lastPage,
    total,
}: ClientsPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    if (lastPage <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-500">
                {total} client{total > 1 ? "s" : ""} au total
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-slate-200"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-slate-600">
                    Page {currentPage} sur {lastPage}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="border-slate-200"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}