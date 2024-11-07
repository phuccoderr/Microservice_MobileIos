import { useState } from "react";
import * as Yup from "yup";

export const useFormCheckout = () => {
  const formSchema = Yup.object().shape({
    payment_method: Yup.string(),
    address: Yup.string().required("Vui lòng điền địa chỉ"),
    phone_number: Yup.string()
      .min(10, "Sđt phải hơn 10 kí tự")
      .required("Vui lòng điền sđt"),
    note: Yup.string(),
    sale: Yup.number(),
  });

  return { formSchema };
};
