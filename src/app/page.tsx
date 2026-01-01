import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarPage } from "./(dashboard)/calendar/page";
import { WorkersPage } from "./(dashboard)/workers/page";

export default function Home() {
  return (
    <>
      <Tabs defaultValue="calendar" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="workers">Workers</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">{<CalendarPage />}</TabsContent>
        <TabsContent value="workers"><WorkersPage /></TabsContent>
      </Tabs>
    </>
  );
}
