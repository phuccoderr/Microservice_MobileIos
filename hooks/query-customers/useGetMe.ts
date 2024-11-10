import { customersApi } from "@/api/customersApi";
import { Customer } from "@/types/customer.type";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery<Customer>({
    queryKey: ["me"],
    queryFn: async () => {
      return (await customersApi.getMe()).data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
