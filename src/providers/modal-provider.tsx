"use client";

import { useEffect, useState } from "react";
import { AddWorkerModal } from "@/components/workers/AddWorkerModal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <AddWorkerModal />
      {/* Future modals */}
    </>
  );
};
