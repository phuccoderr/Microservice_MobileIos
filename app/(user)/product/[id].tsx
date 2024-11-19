import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { calSale, formatDate, formatVnd } from "@/utils/common";
import { Avatar, Button, Divider, IconButton, Text } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import ModalAddProduct from "@/components/modal-add-product";
import { useAddToCart } from "@/hooks/query-cart/useAddCart";
import { Rating } from "react-native-ratings";
import { useGetRatings } from "@/hooks/query-reviews/useGetRatings";
import { FlashList } from "@shopify/flash-list";

const ProductDetail = () => {
  const width = Dimensions.get("window").width;
  const [quantity, setQuantity] = useState(1);
  const id = useLocalSearchParams().id.toString() ?? "";
  const { data: product } = useGetProduct(id);
  const navigation = useNavigation();
  const [indexImage, setIndexImage] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const mutation = useAddToCart();
  const { data: reviews } = useGetRatings(id);

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
                  {!!item && (
                    <Image
                      source={{ uri: item }}
                      style={{ width: "100%", height: 400 }}
                    />
                  )}
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
              <Text style={{ color: "black" }}>
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
          <View style={[styles.flexCol, { padding: 10 }]}>
            <View style={[styles.flexCol, { marginTop: 10, gap: 8 }]}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
              >
                {product?.name}
              </Text>
              <Text style={{ color: "black" }}>Số lượng: {product?.stock}</Text>
            </View>
            {product && product?.sale > 0 ? (
              <View style={[styles.flexCol]}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 28,
                    color: "black",
                    textDecorationLine: "line-through",
                  }}
                >
                  {formatVnd(product?.price ?? 0)}
                </Text>
                <View style={[styles.flexRow, styles.titleCard]}>
                  <Text
                    style={{
                      color: "#ef4444",
                      fontWeight: "bold",
                      fontSize: 28,
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
              </View>
            ) : (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 28,
                  marginTop: 24,
                  color: "black",
                }}
              >
                {formatVnd(product?.price ?? 0)}
              </Text>
            )}
            <View style={[styles.flexCol, { marginTop: 36, gap: 8 }]}>
              <Text style={{ fontSize: 24, fontWeight: "500", color: "black" }}>
                Mô tả:
              </Text>
              <Text style={{ color: "#71717a", fontSize: 18 }}>
                {product?.description}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.flexCol,
              { backgroundColor: "#fff", height: 500, width: "100%" },
            ]}
          >
            <View style={[styles.flexRow, { gap: 8 }]}>
              <View style={[styles.flexCol, { gap: 4, padding: 10 }]}>
                <Text style={{ color: "black" }}>Đánh giá sản phẩm</Text>
                <View
                  style={[styles.flexRow, { gap: 4, alignItems: "center" }]}
                >
                  <Rating
                    startingValue={product?.average_rating}
                    imageSize={20}
                    readonly
                    style={{ alignItems: "flex-start" }}
                  />
                  <Text style={{ color: "black" }}>
                    {product?.average_rating}/5
                  </Text>
                  <Text style={{ color: "black" }}>
                    ({product?.review_count} đánh giá)
                  </Text>
                </View>
              </View>
            </View>
            <Divider
              style={{ marginHorizontal: 10, backgroundColor: "#d4d4d8" }}
            />
            <FlashList
              data={reviews?.entities ?? []}
              extraData={reviews?.entities}
              estimatedItemSize={100}
              renderItem={({ item }) => (
                <>
                  <View style={[styles.flexRow, { padding: 10, gap: 18 }]}>
                    <Avatar.Image
                      size={32}
                      source={require("@/assets/images/user-avatar.jpg")}
                    />
                    <View style={[styles.flexCol, { gap: 4 }]}>
                      <Text style={{ fontSize: 16, color: "black" }}>
                        {item.name ?? "Unknown"}
                      </Text>
                      <Rating
                        startingValue={item.rating}
                        ratingImage
                        imageSize={10}
                        readonly
                        style={{ alignItems: "flex-start" }}
                      />
                      <Text style={{ color: "black" }}>
                        Tiêu đề: {item.headline}
                      </Text>
                      <Text style={{ color: "black" }}> {item.comment}</Text>
                      <Text style={{ color: "black" }}>
                        Thời gian: {formatDate(item.created_at)}
                      </Text>
                    </View>
                  </View>
                  <Divider
                    style={{
                      marginHorizontal: 20,
                      height: 2,
                      borderRadius: 10,
                      backgroundColor: "#d4d4d8",
                    }}
                  />
                </>
              )}
            />
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
            <Text style={{ fontSize: 20, color: "black" }}>{quantity}</Text>
            <IconButton
              icon="minus"
              size={24}
              onPress={() => handleQuantity(quantity - 1)}
            />
          </View>
          <Button
            onPress={handleAddProduct}
            buttonColor="#ef4444"
            textColor="#fff"
            labelStyle={{ fontWeight: "bold" }}
            contentStyle={{ alignContent: "center", padding: 10 }}
            loading={mutation.isPending}
          >
            Thêm vào giỏ hàng
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
    marginTop: 12,
    gap: 2,
    alignItems: "center",
  },
});
