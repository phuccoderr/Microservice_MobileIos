import { categoriesApi } from "@/api/categoriesApi";
import { Category } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      return (await categoriesApi.getAll()).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
