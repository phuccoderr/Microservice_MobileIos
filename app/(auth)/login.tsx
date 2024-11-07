import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ShowHidePassword from "@/components/show-hide-password";
import { Formik } from "formik";
import { Login } from "@/types/auth.type";
import { useFormLogin } from "@/hooks/query-customers/useFormLogin";
import FieldInput from "@/components/field-input";
import { useLoginCustomer } from "@/hooks/query-customers/useLoginCustomer";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import { Link } from "expo-router";
import FieldInputError from "@/components/field-input-error";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
    <View
      style={[
        styles.flexCol,
        {
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 12,
        },
      ]}
    >
      <Text style={{ fontSize: 24 }}>Welcome to NStore 👋</Text>

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
          <View
            style={[
              styles.flexCol,
              { gap: 8, width: "100%", alignItems: "center" },
            ]}
          >
            <View
              style={[
                styles.flexRow,
                { width: "100%", justifyContent: "center" },
              ]}
            >
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
            {errors.email && <FieldInputError name="email" />}
            <ShowHidePassword
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              password={values.password}
            />
            {errors.password && <FieldInputError name="password" />}
            {errorMessage && (
              <View
                style={[
                  styles.flexRow,
                  { width: "90%", gap: 4, alignItems: "center" },
                ]}
              >
                <Text style={{ color: "red" }}>{errorMessage}</Text>
                <MaterialCommunityIcons
                  name="robot-dead-outline"
                  size={24}
                  color="red"
                />
              </View>
            )}
            <Button
              disabled={mutation.isPending}
              onPress={(event) => handleSubmit(event as any)}
              style={{
                marginTop: 8,
                width: "90%",
              }}
              mode="contained"
              buttonColor={mutation.isPending ? "#7dd3fc" : "#0ea5e9"}
              loading={mutation.isPending}
            >
              <Text style={{ color: "black" }}>Đăng nhập</Text>
            </Button>
          </View>
        )}
      </Formik>
      <View
        style={[
          styles.flexRow,
          {
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Link href={"/(auth)/register"}>
          <Text style={{ padding: 2 }}>Bạn chưa có tài khoản?</Text>
        </Link>
        <Link href={"/(auth)/forgot-password"}>
          <Text style={{ padding: 2 }}>Quên mật khẩu ?</Text>
        </Link>
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
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
});
