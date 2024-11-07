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
import Info from "@/components/account/info";

const AccountScreen = () => {
  const router = useRouter();
  const [showIcons, setShowIcons] = React.useState<boolean>(true);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      router.push("/(auth)/login");
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
  };

  function handleChangeIndex(index: number) {
    console.log("Tab Index:", index);
  }

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
        <View style={{ height: 670 }}>
          <TabsProvider defaultIndex={0} onChangeIndex={handleChangeIndex}>
            <Tabs
              uppercase
              showTextLabel
              iconPosition="leading"
              showLeadingSpace
            >
              <TabScreen
                label="Thông tin"
                onPressIn={() => {
                  console.log("onPressIn explore");
                }}
              >
                <Info />
              </TabScreen>
              <TabScreen label="Hoá đơn">
                <View style={{ backgroundColor: "black", flex: 1 }} />
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
