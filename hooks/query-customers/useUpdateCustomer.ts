import { customersApi } from "@/api/customersApi";
import { UpdateCustomer } from "@/types/customer.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCustomer) => {
      return (await customersApi.update(data)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      return error;
    },
  });
};
