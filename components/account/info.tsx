import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Paragraph, Title } from "react-native-paper";
import { useTabIndex, useTabNavigation } from "react-native-paper-tabs";

const Info = () => {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "red",
        height: "100%",
      }}
    >
      <Title style={{ color: "black" }}>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({});
