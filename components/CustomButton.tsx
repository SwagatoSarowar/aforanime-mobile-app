import { CustomButtonProps } from "@/types/type";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const getVariantStyle = function (variant: CustomButtonProps["variant"]) {
  switch (variant) {
    case "danger":
      return "bg-danger";
    case "success":
      return "bg-success";
    case "outline":
      return "border-2 border-white/50";
    default:
      return "bg-primary";
  }
};

export function CustomButton({
  title,
  iconLeft,
  iconRight,
  variant = "primary",
  isLoading = false,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={`w-full flex flex-row justify-center items-center gap-4 rounded-full p-4 disabled:opacity-60 ${getVariantStyle(
        variant
      )} ${className}`}
    >
      {iconLeft && (
        <Image className="h-6 w-6" resizeMode="contain" source={iconLeft} />
      )}
      <View className="h-8 justify-center">
        {isLoading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <Text className="text-white text-lg font-semibold">{title}</Text>
        )}
      </View>
      {iconRight && (
        <Image className="h-6 w-6" resizeMode="contain" source={iconRight} />
      )}
    </TouchableOpacity>
  );
}
