import { OTPInputFieldProps } from "@/types/type";
import { StyleSheet, Text } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20, gap: 6 },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 45,
    fontSize: 26,
    borderWidth: 2,
    borderColor: "#00000030",
    backgroundColor: "#212529",
    textAlign: "center",
    borderRadius: 8,
    color: "white",
  },
  focusCell: {
    borderColor: "#6741D9",
  },
});

export function OTPInputField({
  value,
  setValue,
  cellCount = 6,
}: OTPInputFieldProps) {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      testID="my-code-input"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
}
