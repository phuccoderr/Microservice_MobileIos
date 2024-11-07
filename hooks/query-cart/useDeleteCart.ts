import { cartsApi } from "@/api/cartsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_id: string) => {
      return await cartsApi.deleteProduct(product_id);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
};
