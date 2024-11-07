import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, Paragraph, Title } from "react-native-paper";
import {
  TabsProvider,
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";

const AccountScreen = () => {
  const goTo = useTabNavigation();
  const index = useTabIndex();
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
    <SafeAreaView>
      <TabsProvider defaultIndex={0}>
        <View style={styles.container}>
          <View
            style={[
              styles.flexRow,
              {
                marginRight: 10,
                marginLeft: 10,
                height: 100,
                alignItems: "center",
                gap: 8,
              },
            ]}
          >
            <Avatar.Icon
              size={50}
              style={{ backgroundColor: "#0ea5e9" }}
              icon="account-circle"
            />
            <View
              style={[
                styles.flexCol,
                {
                  gap: 4,
                  justifyContent: "center",
                  height: "100%",
                },
              ]}
            >
              <Text style={{ fontSize: 18 }}>customer@gmail.com</Text>
              <Text style={{ fontSize: 14 }}>Nguyen Hoang Phuc</Text>
            </View>
            <Button
              style={{ marginLeft: "auto", backgroundColor: "#0ea5e9" }}
              onPress={handleLogout}
              mode="contained"
              icon={"logout"}
            >
              <Text>Logout</Text>
            </Button>
          </View>
          <Tabs>
            <TabScreen label="Thông tin">
              <View style={{ flex: 1 }}>
                <Title>Explore</Title>
                <Paragraph>Index: {index}</Paragraph>
                <Button onPress={() => goTo(1)}>Go to Flights</Button>
              </View>
            </TabScreen>
            <TabScreen label="Hoá đơn">
              <View style={{ flex: 1 }}>
                <Title>Explore</Title>
                <Paragraph>Index: {index}</Paragraph>
                <Button onPress={() => goTo(2)}>Go to Flights</Button>
              </View>
            </TabScreen>
          </Tabs>
        </View>
      </TabsProvider>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
});
