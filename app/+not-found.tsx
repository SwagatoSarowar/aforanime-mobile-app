import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function NotFound() {
  return (
    <View className="flex-1 justify-center px-6 bg-dark-500">
      <Text className="text-4xl font-bold text-center text-white">
        Not Found
      </Text>
      <Text className="text-center mt-4 mb-12 text-white">
        Requested Route Not Found
      </Text>
      <Button title="Go back" onPress={() => router.push("/")} />
    </View>
  );
}
