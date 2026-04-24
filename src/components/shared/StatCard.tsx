import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
    title: string
    value: string | number
    icon?: React.ReactNode
    className?: string
    description?: string
}


// Reusable stat card component
export default function StatCard({ title, value, icon, className, description }: SummaryCardProps) {

    return (
        <Card className={cn("hover:shadow-md transition-all", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            </CardContent>
        </Card>

    )
}
