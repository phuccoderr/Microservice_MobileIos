import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, IconButton, TextInput } from "react-native-paper";
import { useFormCheckout } from "@/hooks/query-cart/useFormCheckout";
import { Formik } from "formik";
import FieldInput from "@/components/field-input";
import { router } from "expo-router";
import FieldInputError from "@/components/field-input-error";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { calSale, formatVnd, getTotal } from "@/utils/common";
import { useCheckDiscount } from "@/hooks/query-discounts/useCheckDiscounts";
import { usePlaceOrder } from "@/hooks/query-cart/usePlaceOrder";
import { useApplyCode } from "@/hooks/query-cart/useApplyCode";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CheckoutScreen = () => {
  const { formSchema } = useFormCheckout();
  const mutationCheckDiscount = useCheckDiscount();
  const mutationPlaceOrder = usePlaceOrder();
  const mutationApplyCode = useApplyCode();
  const [discountMessage, setDiscountMessage] = useState("");
  const [discountIcon, setDiscountIcon] = useState(false);

  const [sale, setSale] = useState(0);
  const [code, setCode] = useState("");
  const [initialValues, setInitialValues] = useState({
    payment_method: "COD",
    address: "",
    phone_number: "",
    note: "",
    sale: sale,
  });
  const { data: carts } = useGetCart();
  const { data: me } = useGetMe();

  const handleSetCode = (value: string) => {
    setCode(value);

    if (value === "") {
      setSale(0);
      setDiscountMessage("");
    }
  };

  const handleCheckDiscount = () => {
    mutationCheckDiscount.mutate(code, {
      onSuccess: (data) => {
        setSale(data.sale);
        setCode(data.code);
        setDiscountMessage("Mã giảm giá hợp lệ");
        setDiscountIcon(true);
      },
      onError: () => {
        setDiscountMessage("Mã giảm giá không hợp lệ");
        setDiscountIcon(false);
      },
    });
  };

  const handleApplyDiscount = (values: {
    payment_method: string;
    address: string;
    phone_number: string;
    note: string;
    sale: number;
  }) => {
    mutationPlaceOrder.mutate(values, {
      onSuccess: (data) => {
        code && mutationApplyCode.mutate(code);
        router.push(`/(user)/thanks`);
      },
    });
  };

  useEffect(() => {
    if (me) {
      setInitialValues({
        payment_method: "COD",
        address: me.address,
        phone_number: me.phone_number,
        note: "",
        sale: sale,
      });
    }
  }, [me]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            height: 50,
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <IconButton
            onPress={() => router.back()}
            iconColor="black"
            icon="arrow-left"
            size={30}
          />
          <Text
            style={{
              color: "#0ea5e9",
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 70,
            }}
          >
            THANH TOÁN
          </Text>
        </View>
        {mutationPlaceOrder.isError && (
          <View style={{ height: 16, margin: 10 }}>
            <Text style={{ textAlign: "center", color: "red" }}>
              Lỗi không thể thanh toán
            </Text>
          </View>
        )}
        <Formik
          onSubmit={handleApplyDiscount}
          initialValues={initialValues}
          validationSchema={formSchema}
          enableReinitialize={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => {
            return (
              <View
                style={[
                  styles.flexCol,
                  {
                    gap: 4,
                    alignItems: "center",
                    width: "100%",
                    height: 700,
                  },
                ]}
              >
                <Button
                  mode="contained-tonal"
                  disabled
                  style={{ width: "90%" }}
                >
                  <Text>{me?.email}</Text>
                </Button>
                <FieldInput
                  width="90%"
                  label="Địa chỉ"
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  errors={errors}
                  fieldName={"address"}
                />
                {errors.address && <FieldInputError name="address" />}
                <FieldInput
                  width="90%"
                  label="Số điện thoại"
                  value={values.phone_number}
                  onChangeText={handleChange("phone_number")}
                  onBlur={handleBlur("phone_number")}
                  errors={errors}
                  fieldName={"phone_number"}
                />
                {errors.phone_number && <FieldInputError name="phone_number" />}
                <TextInput
                  label={"Nội dung ghi chú"}
                  value={values.note}
                  onBlur={handleBlur("note")}
                  onChangeText={handleChange("note")}
                  style={{
                    backgroundColor: "transparent",
                    height: 64,
                    width: "90%",
                  }}
                  textColor="black"
                  underlineColor="black"
                  activeUnderlineColor="#0ea5e9"
                  error={Boolean(errors.note)}
                />
                {errors.note && <FieldInputError name="note" />}
                <View
                  style={[
                    styles.flexRow,
                    { gap: 4, width: "90%", alignItems: "flex-end" },
                  ]}
                >
                  <TextInput
                    label={"Mã khuyến mãi"}
                    style={{
                      backgroundColor: "transparent",
                      height: 64,
                      flex: 1,
                    }}
                    onChangeText={handleSetCode}
                  />
                  <Button
                    onPress={() => handleCheckDiscount()}
                    icon={"sale"}
                    mode="contained"
                  >
                    <Text>Nhập mã</Text>
                  </Button>
                </View>
                {discountMessage && (
                  <View
                    style={[
                      styles.flexRow,
                      {
                        alignSelf: "flex-start",
                        marginLeft: 30,
                        alignItems: "center",
                        gap: 8,
                      },
                    ]}
                  >
                    <Text style={{ color: "black" }}>{discountMessage}</Text>
                    {discountIcon ? (
                      <MaterialCommunityIcons
                        name="robot-happy-outline"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="robot-dead-outline"
                        size={24}
                        color="black"
                      />
                    )}
                  </View>
                )}
                {carts && carts.length > 0 && (
                  <View
                    style={{
                      width: "100%",
                      height: 200,
                      flexDirection: "column",
                      padding: 10,
                      gap: 10,
                      marginTop: "auto",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        Giá tiền:
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        {formatVnd(getTotal(carts ?? []))}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        Khuyến mãi:
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        {sale}%
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        Phí ship:
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        {formatVnd(30000)}
                      </Text>
                    </View>

                    <Divider style={{ backgroundColor: "#a8a29e" }} />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        Tổng cộng:
                      </Text>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#78716c",
                        }}
                      >
                        {formatVnd(
                          calSale(getTotal(carts ?? []), sale) + 30000
                        )}
                      </Text>
                    </View>

                    <Button
                      loading={mutationPlaceOrder.isPending}
                      mode="contained-tonal"
                      icon="archive-outline"
                      buttonColor="#0ea5e9"
                      onPress={(event) => handleSubmit(event as any)}
                    >
                      <Text>Đặt hàng</Text>
                    </Button>
                  </View>
                )}
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
});
