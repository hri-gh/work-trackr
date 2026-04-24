import { format } from "date-fns";

interface WorkEntry {
    id: string;
    workerId: string;
    date: string; // ISO string from API
    riceKg: number;
    amount: number;
    note?: string;
    paid: boolean;
    createdAt: string;
    worker: {
        id: string;
        name: string;
    };
}


export interface GroupedEntry {
    date: string;
    count: number;
    entries: WorkEntry[];
    workerIds: string[];
}

export type GroupedEntriesMap = Record<string, GroupedEntry>;

export function groupEntriesByDate(
    entries: WorkEntry[]
): GroupedEntriesMap {
    const map: GroupedEntriesMap = {};

    for (const entry of entries) {
        // ✅ Normalize date (VERY IMPORTANT)
        const dateKey = format(new Date(entry.date), "yyyy-MM-dd");

        if (!map[dateKey]) {
            map[dateKey] = {
                date: dateKey,
                count: 0,
                entries: [],
                workerIds: [],
            };
        }

        map[dateKey].count += 1;
        map[dateKey].entries.push(entry);
        map[dateKey].workerIds.push(entry.workerId);
    }

    return map;
}
