import { cartsAxiosClient } from "@/api/axiosClient";

export const cartsApi = {
  get: () => {
    const url = "";
    return cartsAxiosClient.get(url);
  },
  addToCart: (quantity: number, product_id: string) => {
    const url = "add";
    return cartsAxiosClient.post(url, { quantity, product_id });
  },
  deleteProduct: (product_id: string) => {
    const url = `product/${product_id}`;
    return cartsAxiosClient.delete(url);
  },
  placeOrder: (body: {
    payment_method: string;
    address: string;
    phone_number: string;
    note: string;
    sale: number;
  }) => {
    const url = "/place_order";
    return cartsAxiosClient.post(url, body);
  },
};
