import { InputFieldProps } from "@/types/type";
import { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export function InputField({
  label,
  iconLeft,
  iconRight,
  containerClass,
  labelClass,
  iconLeftClass,
  iconRightClass,
  inputClass,
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
              className={`text-lg text-white font-semibold mb-3 ${labelClass}`}
            >
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-start items-center relative rounded-full bg-dark-400 border-2 border-dark-300 ${
              isInputFocused ? "border-primary" : ""
            } ${containerClass}`}
          >
            {iconLeft && (
              <Image
                resizeMode="contain"
                className={`h-6 w-6 ml-3 -mr-2 ${iconLeftClass}`}
                source={iconLeft}
              />
            )}
            <TextInput
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              ref={inputRef}
              className={`flex-grow rounded-full p-4 text-white text-xl font-bold placeholder:text-dark-300 ${inputClass}`}
              {...props}
            />
            {iconRight && (
              <Image
                resizeMode="contain"
                className={`h-6 w-6 mr-4 ${iconRightClass}`}
                source={iconRight}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
