"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarPlus, UserCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ThemeToggle } from "@/components/ThemeToggle";

import { useAddWorkerModalStore } from "@/store/add-worker-modal.store";

export function Navbar() {
  // const { openModal: openAddWorkerModal } = useAddWorkerModalStore();
  const openAddWorkerModal = useAddWorkerModalStore((state) => state.openModal);

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
          <Button
            variant="default"
            className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
            onClick={openAddWorkerModal}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Worker
          </Button>

          <Button
            variant="outline"
            className="hidden sm:flex border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Mark Work Day
          </Button>

          {/* Mobile Icon Only Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openAddWorkerModal}
            className="sm:hidden"
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <CalendarPlus className="h-5 w-5" />
          </Button>

          <div className="h-8 w-[1px] bg-border mx-1" />
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-9 w-9 border-2 border-primary/10">
                  <AvatarImage src="/avatars/01.png" alt="@admin" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-medium">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@worktrackr.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
