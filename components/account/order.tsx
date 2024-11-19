import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Customer } from "@/types/customer.type";
import { useGetOrderMe } from "@/hooks/query-orders/useGetOrderMe";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Text } from "react-native-paper";
import { OrderDetail } from "@/types/order.type";
import { formatVnd } from "@/utils/common";
import ModalReview from "@/components/modal-review";
import { Link } from "expo-router";
import BadgeOrder from "@/components/badge-order";
import { RefreshControl } from "react-native-gesture-handler";

interface OrderProps {
  me: Customer | undefined;
}

const Order = ({ me }: OrderProps) => {
  const { data: orders, refetch } = useGetOrderMe();
  const [productId, setProductId] = useState("");
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const listItems: OrderDetail[] | undefined = orders?.flatMap((order) =>
    order.order_details.map((detail) => ({
      ...detail,
      status: order.status,
    }))
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleReview = (productId: string) => {
    setProductId(productId);
    setOpen(true);
  };

  return (
    <ModalReview
      customer_id={me?._id ?? ""}
      product_id={productId}
      isOpen={open}
      setIsOpen={setOpen}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          padding: 10,
        }}
      >
        <FlashList
          data={listItems ?? []}
          extraData={listItems}
          estimatedItemSize={200}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.flexRow,
                { marginBottom: 10, backgroundColor: "white" },
              ]}
            >
              <Link href={`/product/${item.product.id}`}>
                <Image
                  source={{ uri: item.product.url }}
                  width={100}
                  style={{ height: "100%" }}
                />
              </Link>
              <View style={{ flex: 1, padding: 10, gap: 10 }}>
                <Link
                  style={{ marginBottom: 5 }}
                  href={`/product/${item.product.id}`}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    {item.product.name}
                  </Text>
                </Link>
                <Text style={{ color: "black" }}>
                  số lượng: {item.quantity}
                </Text>
                <BadgeOrder status={item.status ?? ""} />
              </View>
              <View style={[styles.flexCol, { marginRight: 10 }]}>
                <IconButton
                  onPress={() => handleReview(item.product.id)}
                  icon={"tooltip-edit-outline"}
                  iconColor="black"
                  disabled={item.status === "pending"}
                />
                <Text style={{ color: "black" }}>{formatVnd(item.total)}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ModalReview>
  );
};

export default Order;

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
