"use client";

import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function RefreshButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleRefresh = () => {
        startTransition(() => router.refresh());
        toast.success("Page refreshed successfully", { position: "top-center" });
    };

    return (
        <>
            {isPending && (
                <div className="fixed inset-0 z-50 bg-background/20 backdrop-blur-[1px] cursor-wait animate-in fade-in duration-300" />
            )}
            <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                <span className="md:block hidden">Refresh</span>
            </Button>
        </>
    );
}
