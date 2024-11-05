import { customersApi } from "@/api/customersApi";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return await customersApi.forgotPassword(email);
    },
  });
};
