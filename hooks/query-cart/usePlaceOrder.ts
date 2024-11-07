import { cartsApi } from "@/api/cartsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: {
      payment_method: string;
      address: string;
      phone_number: string;
      note: string;
      sale: number;
    }) => {
      return (await cartsApi.placeOrder(body)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
};
