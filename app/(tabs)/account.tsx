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
    <View style={styles.container}>
      <Text onPress={handleLogout} style={{ color: "red" }}>
        AccountScreen
      </Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
