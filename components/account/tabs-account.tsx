import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TabsProvider,
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import { Button, Paragraph, Title } from "react-native-paper";

const TabsAccount = () => {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <TabsProvider defaultIndex={0}>
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
    </TabsProvider>
  );
};

export default TabsAccount;

const styles = StyleSheet.create({});
