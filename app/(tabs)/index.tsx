import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetAllProductsByCategory } from "@/hooks/query-products/useGetAllProductsByCate";
import useDebounce from "@/hooks/useDebounce";
import { calSale, formatVnd } from "@/utils/common";
import Entypo from "@expo/vector-icons/Entypo";

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
      <View className="w-full flex flex-col items-center">
        <View className="flex flex-row w-[90%] justify-between mt-4">
          <TextInput
            className="w-[80%] m-2 h-12 border-sky-500 rounded-xl border p-2 text-white"
            placeholder="Tìm kiếm..."
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
              <View className="border flex flex-col gap-4 border-stone-500  rounded-xl w-[48%] ">
                <Image
                  source={{
                    uri: item.url,
                  }}
                  height={200}
                  className="w-full rounded-t-lg"
                />
                <View className="p-2 flex flex-col gap-4">
                  <Text className="text-white text-xl font-bold ">
                    {item.name}
                  </Text>
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
                    <Text className="text-white text-xs">
                      {item.average_rating}
                    </Text>
                    <Entypo name="star" size={10} color="#eab308" />
                    <View className="h-8 border border-stone-300" />
                    <Text className="text-white text-xs">
                      {item.review_count} Đánh giá
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
