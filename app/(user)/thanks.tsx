import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { router } from "expo-router";

const ThanksScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.heading}>
            Cảm ơn bạn đã mua hàng!
          </Text>
          <Text style={styles.bodyText}>
            Chúng tôi đã nhận được đơn hàng của bạn. Hãy kiểm tra lại email để
            biết thêm chi tiết.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            style={{}}
            mode="contained"
            buttonColor="#0ea5e9"
            onPress={() => router.replace("/(tabs)/")}
            icon={"keyboard-backspace"}
          >
            Trở lại trang chủ
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ThanksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
    margin: 16,
  },
  heading: {
    textAlign: "center",
    marginBottom: 12,
  },
  bodyText: {
    textAlign: "center",
    marginBottom: 20,
  },
});
