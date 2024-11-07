import { discountsApi } from "@/api/discountsApi";
import { useMutation } from "@tanstack/react-query";

export const useApplyCode = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      return (await discountsApi.applyCode(code)).data;
    },
  });
};
