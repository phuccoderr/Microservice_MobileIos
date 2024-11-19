import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetAllProductsByCategory } from "@/hooks/query-products/useGetAllProductsByCate";
import useDebounce from "@/hooks/useDebounce";
import { calSale, formatText, formatVnd } from "@/utils/common";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import { Button, Searchbar } from "react-native-paper";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";

const Home = () => {
  const [cate, setCate] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounce = useDebounce(searchKeyword, 1000);
  const { data: products, refetch } = useGetAllProductsByCategory({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: debounce,
    cate_id: cate,
    sort_field: "",
  });
  const { data: categories } = useGetAllCategories();
  const [refreshing, setRefreshing] = useState(false);

  const listItemCategories: { id: string; name: string }[] = [];
  listItemCategories.push({ id: "", name: "Tất cả" });
  listItemCategories.push(...(categories ?? []));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f0f0f0"
        translucent={false}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Searchbar
            style={styles.inputSearch}
            placeholder="Tìm kiếm..."
            placeholderTextColor={"black"}
            value={searchKeyword}
            onChangeText={(e) => setSearchKeyword(e)}
            inputStyle={{
              minHeight: 0,
            }}
          />
          <TouchableOpacity style={styles.touchable}>
            <AntDesign name="filter" size={24} color="#0ea5e9" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.flexRow,
            {
              width: "100%",
              height: 60,
              alignItems: "center",
            },
          ]}
        >
          <FlashList
            data={listItemCategories ?? []}
            estimatedItemSize={200}
            horizontal
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
              <Button
                style={{
                  backgroundColor: "#0ea5e9",
                  marginHorizontal: 8,
                  borderRadius: 10,
                }}
                onPress={() => setCate(item.id)}
              >
                <Text style={{ color: "white" }}>{item.name}</Text>
              </Button>
            )}
          />
        </View>
        <View style={[{ flexGrow: 1, width: "100%", height: "91%" }]}>
          <FlashList
            data={products?.entities ?? []}
            extraData={products?.entities}
            numColumns={2}
            estimatedItemSize={200}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item, index }) => (
              <Link
                href={`/(user)/product/${item.id}`}
                style={[
                  styles.flexCol,
                  {
                    borderWidth: 1,
                    borderColor: "#d6d3d1",
                    borderRadius: 5,
                    width: "95%",
                    overflow: "hidden",
                    marginRight: index % 2 === 0 ? "auto" : undefined,
                    marginLeft: index % 2 === 1 ? "auto" : undefined,
                  },
                ]}
              >
                {!!item.url && (
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    style={{
                      width: 210,
                      height: 200,
                    }}
                  />
                )}

                <View style={[styles.flexCol, styles.itemFlatList]}>
                  <Text style={styles.textXl}>{formatText(item.name)}</Text>
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
                        <Text style={{ color: "#ef4444" }}>-{item.sale}%</Text>
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
    borderRadius: 10,
    borderColor: "#0ea5e9",
    backgroundColor: "transparent",
    color: "black",
    borderWidth: 1,
    width: "90%",

    height: 40,
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
    padding: 10,
    gap: 8,
  },
  textXl: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#57534e",
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
