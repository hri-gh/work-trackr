"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages }: { page: number, totalPages: number }) {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    const goToPage = (p: number) => {
        const newParams = new URLSearchParams(params.toString());
        // if (p < 1 || p > totalPages) return;
        newParams.set("page", String(p));

        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className="flex gap-2">
            {/* Prev */}
            <Button
                size="sm"
                disabled={page === 1}
                variant="outline"
                onClick={() => goToPage(page - 1)}>
                <ChevronLeft className="h-4 w-4" /> Prev
            </Button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                    key={pageNum}
                    size="icon-sm"
                    variant={page === pageNum ? "default" : "outline"}
                    onClick={() => goToPage(pageNum)}
                    disabled={pageNum === page}
                >
                    {pageNum}
                </Button>
            ))}

            {/* Next */}
            <Button
                size="sm"
                variant="outline"
                onClick={() => goToPage(page + 1)}>
                Next <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
