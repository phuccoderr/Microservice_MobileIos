import { discountsApi } from "@/api/discountsApi";
import { useMutation } from "@tanstack/react-query";

export const useCheckDiscount = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      return (await discountsApi.checkCode(code)).data;
    },
  });
};
