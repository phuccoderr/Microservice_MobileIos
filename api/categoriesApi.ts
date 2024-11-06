import { categoriesAxiosClient } from "@/api/axiosClient";

export const categoriesApi = {
  getAll: () => {
    const url = "all";
    return categoriesAxiosClient.get(url);
  },
};
