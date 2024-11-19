import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button } from "react-native-paper";
import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import Info from "@/components/account/info";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import Order from "@/components/account/order";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AccountScreen = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
  };

  return (
    <SafeAreaView>
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
            <Text style={{ fontSize: 18 }}>{me?.email}</Text>
            <Text
              style={{ fontSize: 14 }}
            >{`${me?.first_name} ${me?.last_name}`}</Text>
          </View>
          <Button
            style={{ marginLeft: "auto", backgroundColor: "#0ea5e9" }}
            onPress={handleLogout}
            mode="contained"
            icon={"logout"}
          >
            <Text>Đăng xuất</Text>
          </Button>
        </View>
        <View style={{ height: 670 }}>
          <TabsProvider defaultIndex={0}>
            <Tabs
              uppercase
              showTextLabel
              iconPosition="leading"
              showLeadingSpace
            >
              <TabScreen label="Thông tin">
                <Info me={me} />
              </TabScreen>
              <TabScreen label="Hoá đơn">
                <Order me={me} />
              </TabScreen>
            </Tabs>
          </TabsProvider>
        </View>
      </View>
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
