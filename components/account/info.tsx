import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Button, Text } from "react-native-paper";
import { useFormCustomer } from "@/hooks/query-customers/useFormCustomer";
import { Formik } from "formik";
import FieldInput from "@/components/field-input";
import FieldInputError from "@/components/field-input-error";
import { Customer, UpdateCustomer } from "@/types/customer.type";
import { useUpdateCustomer } from "@/hooks/query-customers/useUpdateCustomer";

interface InfoProps {
  me: Customer | undefined;
}

const Info = ({ me }: InfoProps) => {
  const { formSchema, initialValues, setInitialValues } = useFormCustomer();
  const mutation = useUpdateCustomer();

  const handleUpdateCustomer = (values: UpdateCustomer) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (me) {
      setInitialValues({
        first_name: me.first_name ?? "",
        last_name: me.last_name ?? "",
        address: me.address ?? "",
        phone_number: me.phone_number ?? "",
      });
    }
  }, [me]);

  return (
    <View
      style={{
        width: "100%",

        height: "100%",
      }}
    >
      <Text
        variant="headlineLarge"
        style={{ textAlign: "center", padding: 10, fontWeight: "bold" }}
      >
        Thông tin của bạn
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleUpdateCustomer}
        validationSchema={formSchema}
        enableReinitialize={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={[styles.flexCol, { gap: 10, alignItems: "center" }]}>
            <Button
              mode="contained-tonal"
              icon={"account-check-outline"}
              disabled
              style={{ width: "90%" }}
            >
              <Text>{me?.email}</Text>
            </Button>
            <FieldInput
              width="95%"
              label="Họ"
              value={values.first_name}
              onChangeText={handleChange("first_name")}
              onBlur={handleBlur("first_name")}
              errors={errors}
              fieldName={"first_name"}
            />
            {errors.first_name && <FieldInputError name="first_name" />}
            <FieldInput
              width="95%"
              label="Tên"
              value={values.last_name}
              onChangeText={handleChange("last_name")}
              onBlur={handleBlur("last_name")}
              errors={errors}
              fieldName={"last_name"}
            />
            {errors.last_name && <FieldInputError name="last_name" />}
            <FieldInput
              width="95%"
              label="Địa chỉ"
              value={values.address}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              errors={errors}
              fieldName={"address"}
            />
            {errors.address && <FieldInputError name="address" />}
            <FieldInput
              width="95%"
              label="Số điện thoại"
              value={values.phone_number}
              onChangeText={handleChange("phone_number")}
              onBlur={handleBlur("phone_number")}
              errors={errors}
              fieldName={"phone_number"}
            />
            {errors.phone_number && <FieldInputError name="phone_number" />}
            <Button
              style={{ backgroundColor: "#0ea5e9", width: "90%" }}
              mode="contained"
              onPress={(event) => handleSubmit(event as any)}
              loading={mutation.isPending}
            >
              Lưu lại
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
});
