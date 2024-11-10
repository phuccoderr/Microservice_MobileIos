import { ordersAxiosClient } from "@/api/axiosClient";

export const ordersApi = {
  me() {
    const url = "details";
    return ordersAxiosClient.get(url);
  },
  getOne(id: string) {
    const url = `${id}`;
    return ordersAxiosClient.get(url);
  },
};
