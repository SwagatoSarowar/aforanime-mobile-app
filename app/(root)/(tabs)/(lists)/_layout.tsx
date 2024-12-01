import { router, Stack, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListLayout() {
  return (
    <SafeAreaView className="flex-1 bg-dark-500">
      <View className="my-4">
        <View className="mx-auto bg-secondary p-2 rounded-full flex flex-row items-center justify-center gap-x-2">
          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/(lists)/watched")}
            className={`py-2 px-4 rounded-full ${
              usePathname() === "/watched" ? "bg-primary" : ""
            }`}
          >
            <Text className="text-white text-xl font-bold">Watched List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/(lists)/watchlater")}
            className={`py-2 px-4 rounded-full ${
              usePathname() === "/watchlater" ? "bg-primary" : ""
            }`}
          >
            <Text className="text-white text-xl font-bold">Watch Later</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="watched" />
        <Stack.Screen name="watchlater" />
      </Stack>
    </SafeAreaView>
  );
}
