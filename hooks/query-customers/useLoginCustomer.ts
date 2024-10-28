import { customersApi } from "@/api/customersApi";
import { Login } from "@/types/login.type";
import { useMutation } from "@tanstack/react-query";

export const useLoginCustomer = () => {
  return useMutation({
    mutationFn: async (body: Login) => {
      return (await customersApi.login(body)).data;
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
