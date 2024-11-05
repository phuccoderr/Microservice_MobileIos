import { customersAxiosClient } from "@/api/axiosClient";
import { Login, Register } from "@/types/auth.type";

export const customersApi = {
  login: (data: Login) => {
    const url = `auth/login`;
    return customersAxiosClient.post(url, data);
  },
  register: (data: Register) => {
    const url = `auth/register`;
    return customersAxiosClient.post(url, data);
  },
  getMe: () => {
    const url = `account`;
    return customersAxiosClient.get(url);
  },
  forgotPassword: (email: string) => {
    const url = `auth/forgot_password`;
    return customersAxiosClient.post(url, {}, { params: { email } });
  },
};
