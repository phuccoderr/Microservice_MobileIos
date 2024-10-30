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
      <View className="w-full flex flex-col items-center">
        <View className="flex flex-row w-[95%] justify-between mt-4">
          <TextInput
            className="w-[90%]  h-12  rounded-xl border p-2 text-black"
            placeholder="Tìm kiếm..."
            placeholderTextColor={"black"}
            value={searchKeyword}
            onChangeText={(e) => setSearchKeyword(e)}
          />
          <TouchableOpacity
            className={`flex justify-center items-center w-[15%]   rounded-lg `}
          >
            <AntDesign name="filter" size={24} color="#0ea5e9" />
          </TouchableOpacity>
        </View>
        <View className="flex justify-center w-[98%] mt-4">
          <FlatList
            data={products?.entities ?? []}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperClassName="flex-row justify-between"
            renderItem={({ item }) => (
              <Link
                href={`/(user)/product/${item.id}`}
                className="border flex flex-col gap-4 border-stone-300  rounded-xl w-[48%] "
              >
                <View>
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    height={200}
                    className="w-full rounded-t-lg"
                  />
                  <View className="p-2 flex flex-col gap-4">
                    <Text className=" text-xl font-bold ">{item.name}</Text>
                    {item.sale > 0 ? (
                      <View className="flex flex-row items-center gap-2">
                        <Text className=" text-red-500">
                          {formatVnd(calSale(item.price, item.sale))}{" "}
                        </Text>
                        <View className="bg-yellow-300 rounded-xl">
                          <Text className="text-red-400">-{item.sale}%</Text>
                        </View>
                      </View>
                    ) : (
                      <Text className="font-bold text-red-500 ">
                        {formatVnd(item.price)}
                      </Text>
                    )}
                    <View className="flex flex-row gap-2 items-center items-end">
                      <Text className=" text-xs">{item.average_rating}</Text>
                      <Entypo name="star" size={10} color="#eab308" />
                      <View className="h-8 border border-stone-300" />
                      <Text className=" text-xs">
                        {item.review_count} Đánh giá
                      </Text>
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

const styles = StyleSheet.create({});
