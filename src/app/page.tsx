import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarPage from "@/app/(dashboard)/calendar/page";
import WorkersPage from "@/app/(dashboard)/workers/page";
import { Calendar, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="workers">Workers</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">{<CalendarPage />}</TabsContent>
        <TabsContent value="workers">{<WorkersPage />}</TabsContent>
      </Tabs>
    </>
  );
}
