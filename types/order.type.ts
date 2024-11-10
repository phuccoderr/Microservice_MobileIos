import { Product } from "@/types/product.type";

export type Order = {
  id: string;
  customer_id: string;
  email: string;
  name: string;
  address: string;
  phone_number: string;
  delivery_days: string;
  payment: string;
  total: number;
  product_cost: number;
  shipping_cost: number;
  status: string;
  created_at: string;
  order_details: OrderDetail[];
};

export type OrderDetail = {
  id: string;
  product_cost: number;
  product_id: string;
  product: Product;
  order_id: string;
  quantity: number;
  total: number;
  status?: string;
};
