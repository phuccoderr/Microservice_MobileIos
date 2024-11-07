import { discountsAxiosClient } from "@/api/axiosClient";

export const discountsApi = {
  checkCode(code: string) {
    const url = `${code}`;
    return discountsAxiosClient.post(url);
  },
  applyCode(code: string) {
    const url = `apply/${code}`;
    return discountsAxiosClient.post(url);
  },
};
