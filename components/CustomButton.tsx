import { CustomButtonProps } from "@/types/type";
import { Image, Text, TouchableOpacity } from "react-native";

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
  className,
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={`w-full flex flex-row justify-center items-center gap-4 rounded-full p-4 ${getVariantStyle(
        variant
      )} ${className}`}
    >
      {iconLeft && <Image source={iconLeft} />}
      <Text className="text-white text-lg font-semibold">{title}</Text>
      {iconRight && <Image source={iconRight} />}
    </TouchableOpacity>
  );
}
