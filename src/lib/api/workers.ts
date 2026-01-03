import { api } from "@/lib/api";

import type {
    CreateWorkerInput,
    UpdateWorkerInput,
} from "@/schemas/worker.schema";

export const createWorker = (data: CreateWorkerInput) => {
    return api.post("/workers", data);
};

export const getWorkers = () => {
    return api.get("/workers");
};

export const updateWorker = (id: string, data: UpdateWorkerInput) => {
    return api.patch(`/workers/${id}`, data);
};

export const deleteWorker = (id: string) => {
    return api.delete(`/workers/${id}`);
};
