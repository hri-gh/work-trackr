import { create } from "zustand";

interface WorkEntryModalState {
    open: boolean;
    openModal: () => void;
    close: () => void;
}

export const useWorkEntryModalStore = create<WorkEntryModalState>((set) => ({
    open: false,
    openModal: () => set({ open: true }),
    close: () => set({ open: false }),
}));
