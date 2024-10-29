import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useFormRegister } from "@/hooks/query-customers/useFormRegister";
import FieldInput from "@/components/field-input";
import ShowHidePassword from "@/components/show-hide-password";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useRegisterCustomer } from "@/hooks/query-customers/useRegisterCustomer";
import { Register } from "@/types/auth.type";
import { Link } from "expo-router";

const RegisterScreen = () => {
  const { formSchema } = useFormRegister();
  const mutation = useRegisterCustomer();

  const handleRegister = (values: Register) => {
    const { confirm_password, ...data } = values;
    mutation.mutate(data);
  };
  return (
    <View className="flex items-center justify-center h-full bg-black gap-8">
      <Text className="text-3xl text-white">Đăng ký tài khoản NStore</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirm_password: "",
          first_name: "",
          last_name: "",
        }}
        onSubmit={handleRegister}
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
            <View className="flex flex-row justify-center gap-6">
              <View className="flex flex-col w-[42%] ">
                <FieldInput
                  width="100%"
                  label="Họ"
                  value={values.first_name}
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  errors={errors}
                  fieldName={"first_name"}
                />
                {errors.first_name && (
                  <Text className="text-red-500 self-start mt-2">
                    <ErrorMessage name="first_name" />
                  </Text>
                )}
              </View>
              <View className="flex flex-col w-[42%] ">
                <FieldInput
                  width="100%"
                  label="Họ"
                  value={values.last_name}
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  errors={errors}
                  fieldName={"last_name"}
                />
                {errors.last_name && (
                  <Text className="text-red-500 self-start mt-2">
                    <ErrorMessage name="last_name" />
                  </Text>
                )}
              </View>
            </View>
            <FieldInput
              width="90%"
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              errors={errors}
              fieldName={"email"}
            />
            {errors.email && (
              <Text className="text-red-500 self-start mt-2 ml-6">
                <ErrorMessage name="email" />
              </Text>
            )}
            <ShowHidePassword
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              password={values.password}
            />
            {errors.password && (
              <Text className="text-red-500 self-start ml-6">
                <ErrorMessage name="password" />
              </Text>
            )}
            <ShowHidePassword
              label="Xác nhận password"
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              password={values.confirm_password}
            />
            {errors.confirm_password && (
              <Text className="text-red-500 self-start ml-6">
                <ErrorMessage name="confirm_password" />
              </Text>
            )}
            <TouchableOpacity
              disabled={mutation.isPending}
              onPress={(event) => handleSubmit(event as any)}
              className={`flex flex-row justify-center gap-4 w-[90%] p-4 rounded-lg items-center mt-2 ${
                mutation.isPending ? "  bg-sky-300 " : "bg-sky-500"
              }`}
            >
              <Text className="text-center">Đăng ký</Text>
              {mutation.isPending && (
                <ActivityIndicator animating={true} color={MD2Colors.white} />
              )}
            </TouchableOpacity>
            <View className="flex w-[90%] flex-row justify-between items-center mt-2">
              <Text className="text-white p-2">Bạn đã có tài khoản ?</Text>
              <Link href="/">
                <Text className="text-sky-500 p-2">Đăng nhập</Text>
              </Link>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
