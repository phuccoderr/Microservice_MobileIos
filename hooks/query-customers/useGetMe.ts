import { customersApi } from "@/api/customersApi";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return (await customersApi.getMe()).data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
