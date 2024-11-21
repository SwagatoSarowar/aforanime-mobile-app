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
  icon,
  containerStyle,
  labelStyle,
  iconStyle,
  inputStyle,
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
          <Text
            className={`text-lg text-white font-semibold mb-3 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative rounded-full bg-dark-400 border-2 border-dark-300 ${
              isInputFocused ? "border-primary" : ""
            } ${containerStyle}`}
          >
            {icon && (
              <Image
                resizeMode="contain"
                className={`h-6 w-6 ml-3 -mr-2 ${iconStyle}`}
                source={icon}
              />
            )}
            <TextInput
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              ref={inputRef}
              style={{ color: "white" }}
              className={`flex-grow rounded-full p-4 font-semibold placeholder:text-dark-300 ${inputStyle}`}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
