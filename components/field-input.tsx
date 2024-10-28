import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

interface FieldInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errors: any;
  fieldName: string;
}

const FieldInput = ({
  value,
  onChangeText,
  onBlur,
  errors,
  fieldName,
}: FieldInputProps) => {
  return (
    <View className="flex flex-row w-full justify-center">
      <TextInput
        label={"Email"}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        style={styles.text}
        textColor="white"
        underlineColor="white"
        activeUnderlineColor="#0ea5e9"
        error={Boolean(errors[fieldName])}
      />
    </View>
  );
};

export default FieldInput;

const styles = StyleSheet.create({
  text: {
    color: "white",
    width: "90%",
    backgroundColor: "black",
    height: 64,
  },
});
