import { CustomButtonProps } from "@/type";
import cn from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title = "Click me",
  isLoading,
  leftIcon,
  onPress,
  style,
  textStyle,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        "custom-btn disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        style,
      )}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon}

      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
