import Link from "next/link";
import { AddWorkerButton } from "./AddWorkerButton";
import { MarkWorkDayButton } from "./MarkWorkDayButton";

import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/auth/UserMenu";
export function Navbar() {

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <Link
          href="/"
          className="font-bold text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text"
        >
          WorkTrackr
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Buttons to open the modal */}
          <AddWorkerButton />
          <MarkWorkDayButton />

          <div className="h-8 w-[1px] bg-border mx-1" />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
