"use client";

import { Modal } from "@/components/shared/Modal";
import { WorkEntryForm } from "./WorkEntryForm";
import { useWorkEntryModalStore } from "@/store/work-entry-modal.store";

export const WorkEntryModal = () => {
    const { open, close } = useWorkEntryModalStore();

    return (
        <Modal
            title="Add Work Entry"
            description="Create a new work entry"
            isOpen={open}
            onClose={close}
            className="max-w-1"
        >
            <WorkEntryForm onSuccess={close} />
        </Modal>
    );
};
