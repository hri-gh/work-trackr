import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";

export function TabNavigation() {
    return (
        <Tabs defaultValue="workers" className="w-full mb-2">
            <TabsList>
                <TabsTrigger value="workers" asChild>
                    <Link href="/workers">
                        <Users className="h-4 w-4 mr-2" />
                        Workers
                    </Link>
                </TabsTrigger>

                <TabsTrigger value="calendar" asChild>
                    <Link href="/calendar">
                        <Calendar className="h-4 w-4 mr-2" />
                        Calendar
                    </Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
