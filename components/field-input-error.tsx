import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ErrorMessage } from "formik";

interface FieldInputErrorProps {
  name: string;
}

const FieldInputError = ({ name }: FieldInputErrorProps) => {
  return (
    <View style={{ width: "90%" }}>
      <Text
        style={{
          color: "red",
          alignSelf: "flex-start",
          marginTop: 2,
          marginLeft: 5,
        }}
      >
        <ErrorMessage name={name} />
      </Text>
    </View>
  );
};

export default FieldInputError;

const styles = StyleSheet.create({});
