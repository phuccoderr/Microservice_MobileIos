import { Cart } from "@/types/cart.type";

export const formatVnd = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const calSale = (price: number, sale: number) => {
  return price - (price * sale) / 100;
};

export const getTotal = (carts: Cart[]) => {
  let total = 0;
  carts.forEach((cart) => {
    let sale = calSale(cart.product_id.price, cart.product_id.sale);
    total += sale * cart.quantity;
  });
  return total;
};
