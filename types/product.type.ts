export type Product = {
  id: string;
  name: string;
  alias: string;
  description: string;
  status: boolean;
  cost: number;
  price: number;
  sale: number;
  stock: number;
  url: string;
  extra_images: { id: string; url: string }[];
  category_id: string;
  created_at: string;
  updated_at: string;
  average_rating: number;
  review_count: number;
};

export type InfoProduct = Omit<
  Product,
  | "id"
  | "alias"
  | "created_at"
  | "updated_at"
  | "url"
  | "extra_images"
  | "average_rating"
  | "review_count"
>;
