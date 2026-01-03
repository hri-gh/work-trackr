import { create } from "zustand";

interface AddWorkerModalState {
    open: boolean;
    openModal: () => void;
    close: () => void;
}

export const useAddWorkerModalStore = create<AddWorkerModalState>((set) => ({
    open: false,
    openModal: () => set({ open: true }),
    close: () => set({ open: false }),
}));
