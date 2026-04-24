import { api } from "@/lib/api/client";

export const fetcher = (url: string) => api.get(url).then((res) => res.data.data);
