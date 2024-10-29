import * as Yup from "yup";

export const useFormRegister = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email!"),
    password: Yup.string()
      .min(2, "Mật khẩu ít nhất phải 2 kí tự")
      .max(70, "Mậ khẩu không lớn hơn 70 kí tự")
      .matches(/[A-Z]/, "Mật khẩu cần có ít nhất một chữ in hoa")
      .matches(/[a-z]/, "Mật khẩu cần có ít nhất một chữ thường")
      .matches(/\d/, "Mật khẩu cần có ít nhất một chữ số")
      .matches(/[\W_]/, "Mật khẩu cần có ít nhất một ký tự đặc biệt")
      .required("Vui lòng điền mật khẩu"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng xác nhận mật khẩu"),
    first_name: Yup.string()
      .required("Vui lòng điền họ")
      .min(2, "Họ ít nhất phải hơn 1 kí tự"),
    last_name: Yup.string()
      .required("Vui lòng điền tên")
      .min(2, "Tên ít nhất phải hơn 1 kí tự"),
  });

  return { formSchema };
};
