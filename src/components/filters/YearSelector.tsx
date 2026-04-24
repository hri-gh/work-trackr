"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface YearSelectorProps {
    value: number;
    onChange: (year: number) => void;
    startYear?: number;
    endYear?: number;
}

export function YearSelector({
    value,
    onChange,
    startYear = 2020,
    endYear = new Date().getFullYear(),
}: YearSelectorProps) {
    const years = [];

    for (let y = endYear; y >= startYear; y--) {
        years.push(y);
    }

    return (
        <Select
            value={String(value)}
            onValueChange={(val) => onChange(Number(val))}
        >
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select year" />
            </SelectTrigger>

            <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
