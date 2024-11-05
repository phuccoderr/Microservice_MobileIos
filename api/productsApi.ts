import { productsAxiosClient } from "@/api/axiosClient";
import { ParamPaginationProduct } from "@/types/pagination.type";

export const productsApi = {
  getAllByCategory: (params: ParamPaginationProduct) => {
    const url = "category";
    return productsAxiosClient.get(url, { params });
  },
  get: (id: string) => {
    const url = `${id}`;
    return productsAxiosClient.get(url);
  },
};
