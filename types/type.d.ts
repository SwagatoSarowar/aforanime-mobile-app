import { SetStateAction } from "react";
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
  ViewToken,
} from "react-native";
import { SharedValue } from "react-native-reanimated";

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
  onIconPress?: () => void;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
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
  viewableItems?: SharedValue<ViewToken[]>;
  id?: string | number;
}

declare interface RatingProps {
  defaultRating?: number;
  onRating?: Dispatch<React.SetStateAction<number>>;
  showInitialText?: boolean;
}

declare interface DetailsScreenProps {
  data: any;
  rating?: number;
  onRating?: Dispatch<SetStateAction<number>>;
  onAddToWatchLater?: () => void;
  onRemoveFromWatchLater?: () => void;
  isAddToWatchLaterLoading?: boolean;
  isRemoveFromWatchLaterLoading?: boolean;
  isAddToWatchLaterSuccess?: boolean;
  onAddToWatched?: () => void;
  onRemoveFromWatched?: () => void;
  isAddToWatchedLoading?: boolean;
  isRemoveFromWatchedLoading?: boolean;
  isAddToWatchedSuccess?: boolean;
  isInWatched?: boolean;
  isInWatchLater?: boolean;
}
