import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

interface ShowHidePasswordProps {
  label?: string;
  password: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const ShowHidePassword = ({
  label,
  password,
  onChangeText,
  onBlur,
}: ShowHidePasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        label={label ?? "Password"}
        value={password}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.text}
        underlineColor="black"
        textColor="black"
        activeUnderlineColor="#0ea5e9"
      />
    </View>
  );
};

export default ShowHidePassword;

const styles = StyleSheet.create({
  text: {
    color: "white",
    width: "90%",
    backgroundColor: "transparent",
    height: 64,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
});
