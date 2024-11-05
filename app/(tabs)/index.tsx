import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetAllProductsByCategory } from "@/hooks/query-products/useGetAllProductsByCate";
import useDebounce from "@/hooks/useDebounce";
import { calSale, formatVnd } from "@/utils/common";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounce = useDebounce(searchKeyword, 1000);
  const { data: products } = useGetAllProductsByCategory({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: debounce,
    cate_id: "",
    sort_field: "",
  });
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f0f0f0"
        translucent={false}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Tìm kiếm..."
            placeholderTextColor={"black"}
            value={searchKeyword}
            onChangeText={(e) => setSearchKeyword(e)}
          />
          <TouchableOpacity style={styles.touchable}>
            <AntDesign name="filter" size={24} color="#0ea5e9" />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <FlatList
            data={products?.entities ?? []}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            renderItem={({ item }) => (
              <Link
                href={`/(user)/product/${item.id}`}
                style={[
                  styles.flexCol,
                  {
                    borderWidth: 1,
                    borderColor: "#d6d3d1",
                    borderRadius: 5,
                    width: "49%",
                  },
                ]}
              >
                <View>
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    height={250}
                    width={250}
                  />

                  <View style={[styles.flexCol, styles.itemFlatList]}>
                    <Text style={styles.textXl}>{item.name}</Text>
                    {item.sale > 0 ? (
                      <View style={[styles.flexRow, styles.titleCard]}>
                        <Text
                          style={{
                            color: "#ef4444",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          {formatVnd(calSale(item.price, item.sale))}{" "}
                        </Text>
                        <View
                          style={{
                            backgroundColor: "rgb(253 224 71)",
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: "#ef4444" }}>
                            -{item.sale}%
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Text
                        style={{
                          color: "rgb(239 68 68)",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        {formatVnd(item.price)}
                      </Text>
                    )}
                    <View style={[styles.flexRow, styles.cardFooter]}>
                      <Text>{item.average_rating}</Text>
                      <Entypo name="star" size={10} color="#eab308" />
                      <View style={{ height: 8 }} />
                      <Text>{item.review_count} Đánh giá</Text>
                    </View>
                  </View>
                </View>
              </Link>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 4,
    gap: 4,
  },
  inputSearch: {
    display: "flex",
    borderRadius: 10,
    borderColor: "#0ea5e9",
    padding: 8,
    color: "black",
    width: "90%",
    borderWidth: 1,
  },
  touchable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "15%",
    borderRadius: 10,
  },
  body: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: 4,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  itemFlatList: {
    padding: 2,
    gap: 8,
  },
  textXl: {
    fontSize: 1.25,
    lineHeight: 1.75,
  },
  titleCard: {
    gap: 2,
    alignItems: "center",
  },
  cardFooter: {
    gap: 2,
    alignItems: "center",
  },
});
