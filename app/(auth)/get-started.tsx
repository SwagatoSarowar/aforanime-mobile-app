import { CustomButton } from "@/components/CustomButton";
import { OAuth } from "@/components/OAuth";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetStarted() {
  return (
    <View className="flex-1 h-full bg-dark-500">
      <ImageBackground className="h-full" source={images.getstartedbg}>
        <SafeAreaView className="flex h-full justify-end px-[30px]">
          <View>
            <Text className="text-center text-white font-bold text-[32px]">
              Let's get started
            </Text>
            <Text className="mt-10 text-center text-lg font-medium text-dark-100">
              Your anime adventure begins here. Sign up or log in to start
              creating your watchlist today!
            </Text>
          </View>

          <View className="my-10 flex gap-4">
            <CustomButton
              title="Sign Up"
              onPress={() => router.replace("/(auth)/sign-up")}
            />
            <View className="flex gap-4 flex-row items-center justify-between">
              <View className="h-[1px] flex-1 bg-dark-300" />
              <Text className="text-white font-bold">Or</Text>
              <View className="h-[1px] flex-1 bg-dark-300" />
            </View>

            <OAuth />

            <View className="flex flex-row gap-2 mt-2 justify-center">
              <Text className="text-white">Already have an account ?</Text>
              <Link href="/(auth)/sign-in">
                <Text className="text-blue-400 font-bold">Log in</Text>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
