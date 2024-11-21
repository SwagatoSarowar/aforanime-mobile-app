import { CustomButton } from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function SignIn() {
  return (
    <ScrollView
      contentContainerClassName="pb-[40px]"
      className="flex-1 bg-dark-500"
    >
      <View className="flex-1">
        <View className="relative w-full h-[260px]">
          <Image source={images.signinbg} className="w-full h-full" />
          <Text className="absolute text-white bottom-10 left-6 text-2xl font-semibold text-center">
            Welcome
          </Text>
        </View>
        <View className="mx-8">
          <View className="mb-8">
            <InputField
              label="Email"
              placeholder="Enter Email"
              icon={icons.email}
            />
            <InputField
              label="Password"
              placeholder="Enter Password"
              icon={icons.lock}
              secureTextEntry
            />
          </View>

          <View className="flex gap-4">
            <CustomButton title="Sign In" />
            <View className="flex gap-4 flex-row items-center justify-between">
              <View className="h-[1px] flex-1 bg-dark-300" />
              <Text className="text-white font-bold">Or</Text>
              <View className="h-[1px] flex-1 bg-dark-300" />
            </View>
            <CustomButton
              title="Login with Google"
              iconLeft={icons.google}
              variant="outline"
              className="bg-dark-400"
            />
            <View className="flex flex-row gap-2 mt-2 justify-center">
              <Text className="text-white">Don't have an account ?</Text>
              <Link href="/(auth)/sign-up">
                <Text className="text-blue-400 font-bold">Sign up</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
