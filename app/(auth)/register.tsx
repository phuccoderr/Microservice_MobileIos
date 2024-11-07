import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useFormRegister } from "@/hooks/query-customers/useFormRegister";
import FieldInput from "@/components/field-input";
import ShowHidePassword from "@/components/show-hide-password";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import { useRegisterCustomer } from "@/hooks/query-customers/useRegisterCustomer";
import { Register } from "@/types/auth.type";
import { Link } from "expo-router";
import FieldInputError from "@/components/field-input-error";

const RegisterScreen = () => {
  const { formSchema } = useFormRegister();
  const mutation = useRegisterCustomer();

  const handleRegister = (values: Register) => {
    const { confirm_password, ...data } = values;
    mutation.mutate(data);
  };
  return (
    <View
      style={[
        styles.flexCol,
        {
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        },
      ]}
    >
      <Text style={{ fontSize: 24 }}>Đăng ký tài khoản NStore</Text>
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
          <View
            style={[
              styles.flexCol,
              { alignItems: "center", gap: 4, width: "100%" },
            ]}
          >
            <View
              style={[styles.flexRow, { justifyContent: "center", gap: 6 }]}
            >
              <View style={[styles.flexCol, { width: "44%" }]}>
                <FieldInput
                  width="100%"
                  label="Họ"
                  value={values.first_name}
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  errors={errors}
                  fieldName={"first_name"}
                />
                {errors.first_name && <FieldInputError name="first_name" />}
              </View>
              <View style={[styles.flexCol, { width: "44%" }]}>
                <FieldInput
                  width="100%"
                  label="Tên"
                  value={values.last_name}
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  errors={errors}
                  fieldName={"last_name"}
                />
                {errors.last_name && <FieldInputError name="last_name" />}
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
            {errors.email && <FieldInputError name="email" />}
            <ShowHidePassword
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              password={values.password}
            />
            {errors.password && <FieldInputError name="password" />}
            <ShowHidePassword
              label="Xác nhận password"
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              password={values.confirm_password}
            />
            {errors.confirm_password && (
              <FieldInputError name="confirm_password" />
            )}
            <Button
              disabled={mutation.isPending}
              onPress={(event) => handleSubmit(event as any)}
              style={[
                styles.flexRow,
                {
                  justifyContent: "center",
                  width: "90%",
                  padding: 4,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 2,
                  backgroundColor: mutation.isPending ? "#7dd3fc" : "#0ea5e9",
                },
              ]}
            >
              <Text style={{ color: "black" }}>Đăng ký</Text>
              {mutation.isPending && (
                <ActivityIndicator animating={true} color={MD2Colors.white} />
              )}
            </Button>
            <View
              style={[
                styles.flexRow,
                {
                  justifyContent: "space-between",
                  width: "90%",
                  marginTop: 2,
                  alignItems: "center",
                },
              ]}
            >
              <Link href="/login">
                <Text style={{ padding: 2 }}>Trở lại Đăng nhập</Text>
              </Link>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
});
