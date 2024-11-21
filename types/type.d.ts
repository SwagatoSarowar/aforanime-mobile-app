import {
  ImageSourcePropType,
  TextInputProps,
  TouchableOpacityProps,
} from "react-native";

declare interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  variant?: "primary" | "success" | "danger" | "outline";
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: ImageSourcePropType;
  containerStyle?: string;
  labelStyle?: string;
  iconStyle?: string;
  inputStyle?: string;
}
