import { Customer } from "@/types/customer.type";
import { Product } from "@/types/product.type";

export type Cart = {
  product_id: Product;
  customer_id: Pick<Customer, "_id" | "email"> & { name: string };
  quantity: number;
};
