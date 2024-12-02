import { InputFieldProps } from "@/types/type";
import { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export function InputField({
  label,
  icon,
  iconStyle,
  iconSide = "left",
  containerStyle,
  labelStyle,
  inputStyle,
  onIconPress,
  ...props
}: InputFieldProps) {
  const inputRef = useRef<TextInput>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full my-2">
          {label && (
            <Text
              style={labelStyle}
              className="text-lg text-white font-semibold mb-3"
            >
              {label}
            </Text>
          )}
          <View
            style={containerStyle}
            className={`flex flex-row justify-start items-center relative rounded-full bg-dark-400 border-2 border-dark-300 ${
              isInputFocused ? "border-primary" : ""
            }`}
          >
            {icon && iconSide === "left" && (
              <TouchableOpacity onPress={onIconPress}>
                <Image
                  style={iconStyle}
                  resizeMode="contain"
                  className="h-6 w-6 ml-3 -mr-2"
                  source={icon}
                />
              </TouchableOpacity>
            )}
            <TextInput
              keyboardAppearance="dark"
              numberOfLines={1}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              style={inputStyle}
              ref={inputRef}
              placeholderTextColor="#55595D"
              className="w-[90%] rounded-full p-4 text-white text-xl font-bold"
              {...props}
            />
            {icon && iconSide === "right" && (
              <TouchableOpacity onPress={onIconPress}>
                <Image
                  style={iconStyle}
                  resizeMode="contain"
                  className="h-6 w-6 -mr-2"
                  source={icon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
