"use client";

import { useEffect, useState } from "react";
import { AddWorkerModal } from "@/components/workers/AddWorkerModal";
import { WorkEntryModal } from "@/components/work-entries/WorkEntryModal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {/* Future modals */}
      <AddWorkerModal />
      <WorkEntryModal />
    </>
  );
};
