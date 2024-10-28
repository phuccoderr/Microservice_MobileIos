import { customersAxiosClient } from "@/api/axiosClient";
import { Login } from "@/types/login.type";

export const customersApi = {
  login: (data: Login) => {
    const url = `auth/login`;
    return customersAxiosClient.post(url, data);
  },
};
