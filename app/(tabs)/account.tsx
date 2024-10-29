import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      router.push("/(auth)/login");
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
  };
  return (
    <View className="w-full flex flex-row justify-center items-center h-full">
      <Text onPress={handleLogout} className="text-red-500">
        AccountScreen
      </Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
