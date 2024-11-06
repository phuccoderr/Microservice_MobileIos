import { StyleSheet, Text } from "react-native";

import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { Modal, PaperProvider, Portal } from "react-native-paper";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const ModalAddProduct = (props: Props) => {
  useEffect(() => {
    if (props.isOpen) {
      const timer = setTimeout(() => props.setIsOpen(false), 500);
      return () => clearTimeout(timer);
    }
  }, [props.isOpen]);

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={props.isOpen}
          onDismiss={() => props.setIsOpen(false)}
          contentContainerStyle={styles.container}
        >
          <Text>Thêm vào giỏ hàng thành công! 🥰</Text>
        </Modal>
      </Portal>
      {props.children}
    </PaperProvider>
  );
};

export default ModalAddProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#22d3ee",
    padding: 20,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 10,
  },
});
