import { StyleSheet, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

const TabLayout = () => {
  const getIcons = (routeName: string, focused: boolean, size: number) => {
    if (routeName === "index") {
      return focused ? (
        <FontAwesome5 name="home" size={18} color="#0ea5e9" />
      ) : (
        <FontAwesome5 name="home" size={18} color="#9ca3af" />
      );
    }
    if (routeName === "account") {
      return focused ? (
        <MaterialCommunityIcons name="account" size={18} color="#0ea5e9" />
      ) : (
        <MaterialCommunityIcons name="account" size={18} color="#9ca3af" />
      );
    }
    if (routeName === "chat") {
      return focused ? (
        <Entypo name="chat" size={18} color="#0ea5e9" />
      ) : (
        <Entypo name="chat" size={18} color="#9ca3af" />
      );
    }
    if (routeName === "cart") {
      return focused ? (
        <FontAwesome5 name="shopping-cart" size={18} color="#0ea5e9" />
      ) : (
        <FontAwesome5 name="shopping-cart" size={18} color="#9ca3af" />
      );
    }
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getIcons(route.name, focused, size);
        },
        headerShown: false,
        tabBarLabelStyle: { paddingBottom: 3 },
        tabBarLabel: (props) =>
          props.focused ? (
            <Text style={{ color: "#0ea5e9", fontSize: 12 }}>
              {props.children}
            </Text>
          ) : (
            <Text style={{ color: "#9ca3af", fontSize: 12 }}>
              {props.children}
            </Text>
          ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={({ route }) => ({
          title: "Tin nhắn",
          tabBarStyle: {
            display: "flex",
          },
        })}
      />
      <Tabs.Screen name="cart" options={{ title: "Giỏ hàng" }} />
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
