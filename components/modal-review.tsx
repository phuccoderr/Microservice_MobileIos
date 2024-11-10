import { StyleSheet, View } from "react-native";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  TextInput,
} from "react-native-paper";
import { Rating } from "react-native-ratings";
import { useCanReview } from "@/hooks/query-reviews/useCanReview";
import { usePostReviews } from "@/hooks/query-reviews/usePostReviews";
import { isEmpty } from "@/utils/common";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  customer_id: string;
  product_id: string;
};

const ModalReview = (props: Props) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [headline, setHeadline] = useState("");
  const mutation = usePostReviews();

  const ratingCompleted = (rating: number) => {
    setRating(rating);
  };

  const handleClose = () => {
    props.setIsOpen(false);
    setRating(1);
    setComment("");
    setHeadline("");
  };

  const { data: review } = useCanReview(props.customer_id, props.product_id);

  const handlePostRevew = () => {
    mutation.mutate(
      {
        proId: props.product_id,
        body: {
          headline,
          comment,
          rating,
        },
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  return (
    <PaperProvider>
      <Portal>
        <Dialog
          style={styles.container}
          visible={props.isOpen}
          onDismiss={handleClose}
        >
          {isEmpty(review ?? {}) ? (
            <>
              <Dialog.Title style={{ color: "black" }}>
                Đánh giá của bạn
              </Dialog.Title>
              <Dialog.Content>
                <Rating
                  startingValue={rating}
                  imageSize={30}
                  onFinishRating={ratingCompleted}
                />
                <TextInput
                  mode="flat"
                  label="tiêu đề"
                  style={{ backgroundColor: "white" }}
                  textColor="black"
                  underlineColor="#0ea5e9"
                  activeUnderlineColor="#0ea5e9"
                  value={headline}
                  onChangeText={(text) => setHeadline(text)}
                />
                <TextInput
                  mode="flat"
                  label="nội dung"
                  textColor="black"
                  underlineColor="#0ea5e9"
                  activeUnderlineColor="#0ea5e9"
                  style={{ backgroundColor: "white" }}
                  value={comment}
                  onChangeText={(text) => setComment(text)}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handlePostRevew} textColor="#0ea5e9">
                  Lưu
                </Button>
              </Dialog.Actions>
            </>
          ) : (
            <>
              <Dialog.Title style={{ color: "black" }}>
                Sản phẩm này bạn đã đánh giá
              </Dialog.Title>
              <Dialog.Content>
                <Rating
                  readonly
                  startingValue={review?.rating}
                  imageSize={30}
                  onFinishRating={ratingCompleted}
                />
                <TextInput
                  mode="flat"
                  readOnly
                  label="tiêu đề"
                  style={{ backgroundColor: "white" }}
                  value={review?.headline}
                  onChangeText={(text) => setHeadline(text)}
                />
                <TextInput
                  mode="flat"
                  label="nội dung"
                  readOnly
                  style={{ backgroundColor: "white" }}
                  value={review?.comment}
                  onChangeText={(text) => setComment(text)}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => props.setIsOpen(false)} textColor="red">
                  Thoát
                </Button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </Portal>
      {props.children}
    </PaperProvider>
  );
};

export default ModalReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 10,
  },
});
