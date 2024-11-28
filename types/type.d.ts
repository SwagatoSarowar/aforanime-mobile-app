import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

declare interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  variant?: "primary" | "success" | "danger" | "outline";
  isLoading?: boolean;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: ImageSourcePropType;
  iconSide?: "left" | "right";
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconLeftStyle?: StyleProp<ImageStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

declare interface OTPInputFieldProps {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<any>>;
  cellCount?: number;
}

declare interface CardProps {
  image?: string;
  title?: string;
  releaseYear?: string;
  score?: string;
  className?: string;
}
