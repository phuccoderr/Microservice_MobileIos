import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { calSale, formatVnd } from "@/utils/common";
import { Button, IconButton } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import ModalAddProduct from "@/components/modal-add-product";
import { useAddToCart } from "@/hooks/query-cart/useAddCart";

const ProductDetail = () => {
  const width = Dimensions.get("window").width;
  const [quantity, setQuantity] = useState(1);
  const id = useLocalSearchParams().id.toString() ?? "";
  const { data: product } = useGetProduct(id);
  const navigation = useNavigation();
  const [indexImage, setIndexImage] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const mutation = useAddToCart();

  const images: string[] = [];
  images.push(product?.url ?? "");
  product?.extra_images.forEach((item) => {
    images.push(item.url);
  });

  const handleQuantity = (quantity: number) => {
    if (quantity >= 1) {
      setQuantity(quantity);
    }
  };

  const handleAddProduct = () => {
    setVisible(true);
    mutation.mutate({
      quantity,
      product_id: id,
    });
  };

  return (
    <ModalAddProduct setIsOpen={setVisible} isOpen={visible}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ position: "relative" }}>
            <Carousel
              loop
              width={width}
              height={width / 2}
              data={images}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => setIndexImage(index)}
              style={{ height: 300 }}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item }}
                    style={{ width: "100%", height: 400 }}
                  />
                </View>
              )}
            />
            <Button
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#78716c",
              }}
            >
              <Text>
                {indexImage + 1}/{images.length}
              </Text>
            </Button>
            <IconButton
              animated
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", top: 60, left: 10 }}
            />
          </View>
          <View style={[styles.flexCol, { padding: 10, height: "100%" }]}>
            <View style={[styles.flexCol, { marginTop: 10, gap: 8 }]}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {product?.name}
              </Text>
              <Text>Số lượng: {product?.stock}</Text>
            </View>
            {product && product?.sale > 0 ? (
              <View style={[styles.flexRow, styles.titleCard]}>
                <Text
                  style={{
                    color: "#ef4444",
                    fontWeight: "bold",
                    fontSize: 36,
                  }}
                >
                  {formatVnd(calSale(product.price, product.sale))}{" "}
                </Text>
                <View
                  style={{
                    backgroundColor: "rgb(253 224 71)",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "#ef4444", fontSize: 20 }}>
                    -{product.sale}%
                  </Text>
                </View>
              </View>
            ) : (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 36,
                  marginTop: 24,
                }}
              >
                {formatVnd(product?.price ?? 0)}
              </Text>
            )}
            <View style={[styles.flexCol, { marginTop: 36, gap: 8 }]}>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>Mô tả:</Text>
              <Text style={{ color: "#71717a", fontSize: 18 }}>
                {product?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            styles.flexRow,
            {
              justifyContent: "space-between",
              marginBottom: 30,
              width: "90%",
              margin: "auto",
            },
          ]}
        >
          <View style={[styles.flexRow, { gap: 4, alignItems: "center" }]}>
            <IconButton
              animated
              icon="plus"
              size={24}
              onPress={() => handleQuantity(quantity + 1)}
            />
            <Text style={{ fontSize: 20 }}>{quantity}</Text>
            <IconButton
              icon="minus"
              size={24}
              onPress={() => handleQuantity(quantity - 1)}
            />
          </View>
          <Button onPress={handleAddProduct} buttonColor="#ef4444">
            <Text>Thêm vào giỏ hàng</Text>
          </Button>
        </View>
      </View>
    </ModalAddProduct>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  titleCard: {
    marginTop: 24,
    gap: 2,
    alignItems: "center",
  },
});
