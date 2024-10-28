import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

interface ShowHidePasswordProps {
  password: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const ShowHidePassword = ({
  password,
  onChangeText,
  onBlur,
}: ShowHidePasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex flex-row w-full justify-center">
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        label={"Password"}
        value={password}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.text}
        underlineColor="white"
        textColor="white"
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
    backgroundColor: "black",
    height: 64,
  },
});
