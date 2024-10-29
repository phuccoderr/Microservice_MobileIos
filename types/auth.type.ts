export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  confirm_password?: string;
};
