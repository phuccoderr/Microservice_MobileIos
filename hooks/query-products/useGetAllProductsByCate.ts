import { productsApi } from "@/api/productsApi";
import {
  PaginationResponse,
  ParamPaginationProduct,
} from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProductsByCategory = (params: ParamPaginationProduct) => {
  const { sort, keyword, cate_id, sort_field } = params;
  return useQuery<PaginationResponse<Product>>({
    queryKey: ["products-home", sort, keyword, cate_id, sort_field],
    queryFn: async () => {
      return (await productsApi.getAllByCategory(params)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
