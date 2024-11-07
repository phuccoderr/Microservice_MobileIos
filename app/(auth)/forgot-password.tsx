import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useForgotPassword } from "@/hooks/query-customers/useForgotPassword";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useForgotPassword();

  const handleForgotPassword = () => {
    mutation.mutate(email, {
      onError: (error: any) => {
        if (error.statusCode == 404) {
          setErrorMessage("không tìm thấy tên đăng nhập");
          return;
        }
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <View style={{ height: "100%", marginTop: 40 }}>
      <Link href="/login" style={{ marginTop: 40, marginLeft: 20, width: 50 }}>
        <Ionicons
          name="arrow-back-circle"
          size={50}
          style={{ color: "#4b5563" }}
        />
      </Link>

      <View
        style={[
          styles.container,
          {
            marginTop: 100,
            gap: 18,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 24 }}>Quên mật khẩu</Text>
        {mutation.isSuccess && (
          <Text style={{ color: "#0ea5e9", width: "90%", textAlign: "center" }}>
            Yêu cầu đổi mật khẩu thành công, Vui lòng kiểm tra email của bạn
          </Text>
        )}
        {mutation.isError && (
          <Text style={{ color: "red", width: "90%", textAlign: "center" }}>
            {errorMessage}
          </Text>
        )}
        <TextInput
          style={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "transparent",
          }}
          onChangeText={(e) => setEmail(e)}
          label={"Email"}
          value={email}
          textColor="black"
          underlineColor="black"
          activeUnderlineColor="#0ea5e9"
        />
        <Button
          disabled={mutation.isPending}
          style={{
            width: "90%",
            backgroundColor: "#0ea5e9",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleForgotPassword}
          icon={"email-fast-outline"}
          textColor="black"
        >
          <Text>Đặt lại mật khẩu</Text>
        </Button>
        <Link
          href="/login"
          style={{
            alignSelf: "flex-start",
            marginLeft: 24,
            alignItems: "center",
            gap: 20,
          }}
        >
          <View
            style={[
              styles.flexRow,
              {
                alignSelf: "flex-start",
                marginLeft: 24,
                alignItems: "center",
                gap: 6,
              },
            ]}
          >
            <Text>Trở lại đăng nhập</Text>
            <AntDesign name="back" size={16} color="black" />
          </View>
        </Link>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
});
