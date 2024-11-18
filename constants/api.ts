const ipconfig = "192.168.1.249";

export const URL_CONSTANST = {
  CUSTOMERS: `http://${ipconfig}:9150/api/v1/customers`,
  PRODUCTS: `http://${ipconfig}:9140/api/v1/products`,
  CATEGORIES: `http://${ipconfig}:9130/api/v1/categories`,
  CART: `http://${ipconfig}:9160/api/v1/cart`,
  DISCOUNTS: `http://${ipconfig}:9140/api/v1/discounts`,
  ORDERS: `http://${ipconfig}:9170/api/v1/orders`,
  REVIEWS: `http://${ipconfig}:9180/api/v1/reviews`,
  CHATS: `http://${ipconfig}:9190/api/v1/chats`,

  CHAT_SOCKET: `http://${ipconfig}:9190`,
};
