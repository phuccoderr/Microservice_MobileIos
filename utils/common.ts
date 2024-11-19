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

export const formatDate = (date: string) => {
  return new Date(date).toISOString().split("T")[0];
};

export const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// kí tự dài hơn 25 sẽ thành ...
export const formatText = (text: string) => {
  if (text.length > 25) {
    return text.slice(0, 23) + "...";
  }
  return text;
};
