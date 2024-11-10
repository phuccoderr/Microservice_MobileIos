import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { FlashList } from "@shopify/flash-list";
import { calSale, formatVnd, getTotal } from "@/utils/common";
import { Button, Divider, IconButton } from "react-native-paper";
import { useAddToCart } from "@/hooks/query-cart/useAddCart";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDeleteCart } from "@/hooks/query-cart/useDeleteCart";
import ModalDeleteProduct from "@/components/modal-delete-cart";
import { Link, router } from "expo-router";

const CartScreen = () => {
  const { data: carts } = useGetCart();
  const mutationAdd = useAddToCart();
  const mutationDelete = useDeleteCart();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const handleQuantity = (product_id: string, quantity: number) => {
    mutationAdd.mutate({
      quantity,
      product_id,
    });
  };

  const handleDeleteCart = () => {
    mutationDelete.mutate(productId);
    setOpen(false);
  };

  return (
    <ModalDeleteProduct
      handleDelete={handleDeleteCart}
      isOpen={open}
      setIsOpen={setOpen}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                flexDirection: "row",
              },
            ]}
          >
            <Text
              style={{
                color: "black",
                margin: 10,
                fontSize: 20,
                fontFamily: "Inter-SemiBold",
              }}
            >
              Giỏ hàng của tôi
            </Text>
            <MaterialCommunityIcons
              name="cart-variant"
              size={24}
              color="black"
            />
          </View>
          <View
            style={[
              {
                height: 610,
                width: "100%",
                justifyContent: "center",
              },
            ]}
          >
            {carts && carts.length > 0 ? (
              <FlashList
                data={carts ?? []}
                extraData={carts}
                estimatedItemSize={400}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.flexRow,
                      {
                        padding: 10,
                        margin: 10,
                        gap: 10,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: item.product_id.url }}
                      height={100}
                      width={100}
                      style={{ borderRadius: 10 }}
                    />
                    <View style={[styles.flexCol, { gap: 8 }]}>
                      <Link href={`/product/${item.product_id.id}`}>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          {item.product_id.name}
                        </Text>
                      </Link>
                      <View
                        style={[
                          styles.flexRow,
                          {
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#a8a29e",
                            borderRadius: 10,
                            marginRight: "auto",
                            height: 30,
                          },
                        ]}
                      >
                        <IconButton
                          icon="minus"
                          size={12}
                          onPress={() => handleQuantity(item.product_id.id, -1)}
                        />
                        <Text style={{ fontSize: 12 }}>{item.quantity}</Text>

                        <IconButton
                          animated
                          icon="plus"
                          size={12}
                          onPress={() => handleQuantity(item.product_id.id, 1)}
                        />
                      </View>
                      <Text style={{ color: "#57534e", fontSize: 16 }}>
                        {formatVnd(
                          calSale(item.product_id.price, item.product_id.sale)
                        )}
                      </Text>
                    </View>
                    <IconButton
                      icon="delete"
                      onPress={() => {
                        setOpen(true);
                        setProductId(item.product_id.id);
                      }}
                      iconColor="#fb7185"
                      style={{ marginLeft: "auto" }}
                    />
                  </View>
                )}
              />
            ) : (
              <View
                style={[
                  styles.flexRow,
                  {
                    width: "100%",
                    justifyContent: "center",
                    marginTop: 200,
                    gap: 4,
                  },
                ]}
              >
                <Text style={{ fontSize: 18 }}>
                  Hiện giỏ hàng của bạn đang trống{" "}
                </Text>
                <FontAwesome6 name="sad-tear" size={20} color="black" />
              </View>
            )}
          </View>
          {carts && carts.length > 0 && (
            <View
              style={{
                width: "100%",
                height: 100,
                flexDirection: "column",
                marginBottom: "auto",
                padding: 10,
                gap: 10,
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
                  style={{ fontSize: 22, fontWeight: "bold", color: "#78716c" }}
                >
                  Giá tiền:
                </Text>
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", color: "#78716c" }}
                >
                  {formatVnd(getTotal(carts ?? []))}
                </Text>
              </View>
              <Divider style={{ backgroundColor: "#a8a29e" }} />
              <Button
                mode="contained-tonal"
                icon="archive-outline"
                buttonColor="#0ea5e9"
                onPress={() => router.push("/checkout")}
              >
                <Text>Thanh toán</Text>
              </Button>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ModalDeleteProduct>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
