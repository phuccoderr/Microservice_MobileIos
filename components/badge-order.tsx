import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

interface BadgeStatusProps {
  status: string;
  children?: React.ReactNode;
}

const BadgeOrder = ({ status, children }: BadgeStatusProps) => {
  let label;
  let bgColor;
  let icon;
  switch (status) {
    case "pending":
      label = "Đang xử lý";
      bgColor = "black";
      icon = "robot-outline";
      break;
    case "complete":
      label = "Hoàn thành";
      bgColor = "green";
      icon = "robot-love-outline";
      break;
    case "cancel":
      label = "Đã hủy";
      bgColor = "red";
      icon = "robot-dead-outline";
      break;
    default:
      label = "Không xác định";
      bgColor = "black";
      icon = "robot-outline";
      break;
  }

  return (
    <View style={[styles.flexRow, { alignItems: "center" }]}>
      <Text style={{ color: bgColor }}>{label}</Text>
      <IconButton
        icon={icon}
        size={16}
        iconColor={bgColor}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

export default BadgeOrder;

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
});
