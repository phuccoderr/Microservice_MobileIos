import { useState } from "react";
import * as Yup from "yup";

export const useFormCustomer = () => {
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
  });

  const formSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(1, "Họ phải có ít nhất 1 ký tự")
      .required("Vui lòng điền họ"),
    last_name: Yup.string()
      .min(1, "Tên phải có ít nhất 1 ký tự")
      .required("Vui lòng điền tên"),
    address: Yup.string(),
    phone_number: Yup.string().min(
      10,
      "Số điện thoại phải có ít nhất 10 ký tự"
    ),
  });

  return { formSchema, initialValues, setInitialValues };
};
