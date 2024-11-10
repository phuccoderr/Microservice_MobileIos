export type Customer = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  status: boolean;
  verification_code: string;
  authentication_type: string;
  address: string;
  phone_number: string;
  image_id: string;
  reset_password_token: string;
};

export type UpdateCustomer = Pick<
  Customer,
  "first_name" | "last_name" | "phone_number" | "address"
>;
