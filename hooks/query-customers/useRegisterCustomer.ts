import { customersApi } from "@/api/customersApi";
import { Register } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";

export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: async (body: Register) => {
      return (await customersApi.register(body)).data;
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
