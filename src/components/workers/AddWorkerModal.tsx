"use client";

import { Modal } from "@/components/shared/Modal";
import { AddWorkerForm } from "./AddWorkerForm";
import { useAddWorkerModalStore } from "@/store/add-worker-modal.store";

export const AddWorkerModal = () => {
    const { open, close } = useAddWorkerModalStore();

    return (
        <Modal
            title="Add Worker"
            description="Create a new worker"
            isOpen={open}
            onClose={close}
            className="max-w-xl"
        >
            <AddWorkerForm onSuccess={close} />
        </Modal>
    );
};
