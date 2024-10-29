import {
  DimensionValue,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

interface FieldInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errors: any;
  fieldName: string;
  width: DimensionValue;
}

const FieldInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  errors,
  fieldName,
  width,
}: FieldInputProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
      style={[styles.text, { width: width }]}
      textColor="white"
      underlineColor="white"
      activeUnderlineColor="#0ea5e9"
      error={Boolean(errors[fieldName])}
    />
  );
};

export default FieldInput;

const styles = StyleSheet.create({
  text: {
    color: "white",
    backgroundColor: "black",
    height: 64,
  },
});
