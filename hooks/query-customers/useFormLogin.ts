import * as Yup from "yup";

export const useFormLogin = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email!"),
    password: Yup.string()
      .min(2, "Mật khẩu ít nhất phải 2 kí tự")
      .max(70, "Mậ khẩu không lớn hơn 70 kí tự")
      .required("Vui lòng điền mật khẩu"),
  });

  return { formSchema };
};

// .matches(/[A-Z]/, "Mật khẩu cần có ít nhất một chữ in hoa")
//     .matches(/[a-z]/, "Mật khẩu cần có ít nhất một chữ thường")
//     .matches(/\d/, "Mật khẩu cần có ít nhất một chữ số")
//     .matches(/[\W_]/, "Mật khẩu cần có ít nhất một ký tự đặc biệt")
