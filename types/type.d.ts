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
  label?: string;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  containerClass?: string;
  labelClass?: string;
  iconLeftClass?: string;
  iconRightClass?: string;
  inputClass?: string;
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
