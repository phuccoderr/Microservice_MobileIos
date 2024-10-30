import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ShowHidePassword from "@/components/show-hide-password";
import { ErrorMessage, Formik } from "formik";
import { Login } from "@/types/auth.type";
import { useFormLogin } from "@/hooks/query-customers/useFormLogin";
import FieldInput from "@/components/field-input";
import { useLoginCustomer } from "@/hooks/query-customers/useLoginCustomer";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { ErrorResponse } from "@/types/error.type";

const LoginScreen = () => {
  const { formSchema } = useFormLogin();
  const mutation = useLoginCustomer();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (values: Login) => {
    mutation.mutate(values, {
      onError: (error: any) => {
        if (error.statusCode === 401) {
          setErrorMessage("tài khoản người dùng đã bị khoá");
        }

        if (error.statusCode === 400) {
          setErrorMessage("email hoặc mật khẩu không đúng");
        }

        if (error.statusCode === 404) {
          setErrorMessage("không tìm thấy tên đăng nhập");
        }
      },
    });
  };
  return (
    <View className="flex items-center justify-center h-full bg-black gap-6 ">
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
          <View className="flex items-center gap-4 w-full">
            <View className="flex flex-row w-full justify-center">
              <FieldInput
                width="90%"
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                errors={errors}
                fieldName={"email"}
              />
            </View>
            {errors.email && (
              <Text className="text-red-500 self-start ml-8">
                <ErrorMessage className="text-red-500" name="email" />
              </Text>
            )}
            <ShowHidePassword
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              password={values.password}
            />
            <Text className="text-red-500 self-start ml-8">
              <ErrorMessage name="password" />
            </Text>
            {errorMessage && (
              <Text className="text-red-500 self-start ml-8">
                {errorMessage}
              </Text>
            )}
            <TouchableOpacity
              disabled={mutation.isPending}
              onPress={(event) => handleSubmit(event as any)}
              className={`flex flex-row justify-center gap-4 w-[90%] p-4 rounded-lg items-center  ${
                mutation.isPending ? "  bg-sky-300 " : "bg-sky-500"
              }`}
            >
              <Text className="text-center">Đăng nhập</Text>
              {mutation.isPending && (
                <ActivityIndicator animating={true} color={MD2Colors.white} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View className="flex w-[90%] flex-row justify-between items-center">
        <Link href={"/(auth)/register"}>
          <Text className="text-white p-2">Bạn chưa có tài khoản?</Text>
        </Link>
        <Text className="text-white p-2">Quên mật khẩu ?</Text>
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
