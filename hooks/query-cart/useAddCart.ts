import { cartsApi } from "@/api/cartsApi";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async ({
      quantity,
      product_id,
    }: {
      quantity: number;
      product_id: string;
    }) => {
      return (await cartsApi.addToCart(quantity, product_id)).data;
    },
  });
};
