import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { FlashList } from "@shopify/flash-list";
import { calSale } from "@/utils/common";

const CartScreen = () => {
  const { data: carts } = useGetCart();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={[
            styles.flexRow,
            {
              alignItems: "center",
              justifyContent: "center",
              height: 50,
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
          <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
        </View>
        <View
          style={[
            styles.flexRow,
            { height: 1000, width: "100%", alignItems: "center" },
          ]}
        >
          <FlashList
            data={carts}
            estimatedItemSize={200}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.flexRow,
                  { backgroundColor: "#ccfbf1", padding: 10, margin: 10 },
                ]}
              >
                <Image
                  source={{ uri: item.product_id.url }}
                  height={100}
                  width={100}
                  style={{ borderRadius: 10 }}
                />
                <View style={[styles.flexCol, { gap: 4 }]}>
                  <Text style={{ color: "black", fontSize: 14 }}>
                    {item.product_id.name}
                  </Text>
                  <Text style={{ color: "#d4d4d8", fontSize: 14 }}>
                    {calSale(item.product_id.price, item.product_id.sale)}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
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
