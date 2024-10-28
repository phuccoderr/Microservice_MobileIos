import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import ShowHidePassword from "@/components/show-hide-password";
import { ErrorMessage, Formik } from "formik";
import { Login } from "@/types/login.type";
import { useFormLogin } from "@/hooks/query-customers/useFormLogin";
import FieldInput from "@/components/field-input";
import { useLoginCustomer } from "@/hooks/query-customers/useLoginCustomer";

const LoginScreen = () => {
  const { formSchema } = useFormLogin();
  const mutation = useLoginCustomer();

  console.log(mutation.data);

  const handleLogin = (values: Login) => {
    mutation.mutate(values);
  };
  return (
    <View className="flex items-center justify-center h-full bg-black gap-8">
      <Text className="text-3xl text-white">Welcome to NStore 👋</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={formSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="flex items-center gap-8 w-full">
            <View className="flex flex-row w-full justify-center">
              <FieldInput
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                errors={errors}
                fieldName={"email"}
              />
            </View>
            <Text className="text-red-500 self-start ml-8">
              <ErrorMessage name="email" />
            </Text>
            <ShowHidePassword
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              password={values.password}
            />
            <TouchableOpacity
              onPress={(event) => handleSubmit(event as any)}
              className="bg-sky-500 w-[90%] p-4 rounded-lg "
            >
              <Text className="text-center">Đăng nhập</Text>
            </TouchableOpacity>
            {/* {login ? (
              <TouchableOpacity
                onPress={() => setLogin(!login)}
                className="bg-sky-500 w-[90%] p-4 rounded-lg "
              >
                <Text className="text-center">Đăng nhập</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled
                onPress={() => setLogin(!login)}
                className="bg-slate-600 w-[90%] p-4 rounded-lg "
              >
                <ActivityIndicator animating={true} color={MD2Colors.red800} />
              </TouchableOpacity>
            )} */}
          </View>
        )}
      </Formik>

      <View className="flex w-[90%] flex-row justify-between">
        <View>
          <Text className="text-white">Bạn chưa có tài khoản?</Text>
        </View>
        <View>
          <Text className="text-white">Quên mật khẩu ?</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  text: {
    color: "white",
    width: "90%",
    backgroundColor: "black",
    height: 64,
  },
});
