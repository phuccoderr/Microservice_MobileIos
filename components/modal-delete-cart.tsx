import { StyleSheet, Text, View } from "react-native";

import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import {
  Button,
  Divider,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
  children: ReactNode;
};

const ModalDeleteProduct = (props: Props) => {
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={props.isOpen}
          onDismiss={() => props.setIsOpen(false)}
          contentContainerStyle={styles.container}
        >
          <Text style={{ padding: 10 }}>
            Bạn có chắc chắn muốn xoá sản phẩm này chứ!
          </Text>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Button onPress={() => props.setIsOpen(false)} style={{ flex: 1 }}>
              <Text style={{ color: "black" }}>Không</Text>
            </Button>
            <View
              style={{ height: "100%", width: 1, backgroundColor: "#a8a29e" }}
            />
            <Button onPress={() => props.handleDelete()} style={{ flex: 1 }}>
              <Text style={{ color: "#0ea5e9" }}>Có</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
      {props.children}
    </PaperProvider>
  );
};

export default ModalDeleteProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 10,
  },
});
