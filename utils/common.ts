export const formatVnd = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const calSale = (price: number, sale: number) => {
  return price - (price * sale) / 100;
};
