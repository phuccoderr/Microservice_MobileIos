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
