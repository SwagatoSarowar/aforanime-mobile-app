import { CustomButton } from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignupPress = function () {
    console.log(formData);
  };

  return (
    <ScrollView
      contentContainerClassName="pb-[40px]"
      className="flex-1 bg-dark-500"
    >
      <View className="flex-1">
        <View className="relative w-full h-[260px]">
          <Image source={images.signupbg} className="w-full h-full" />
          <Text className="absolute text-white bottom-10 left-6 text-2xl font-semibold text-center">
            Create Your Account
          </Text>
        </View>
        <View className="mx-8">
          <View className="mb-8">
            <InputField
              label="Name"
              placeholder="Enter Name"
              icon={icons.person}
              value={formData.name}
              onChangeText={(value) =>
                setFormData((cur) => ({ ...cur, name: value }))
              }
            />
            <InputField
              label="Email"
              placeholder="Enter Email"
              icon={icons.email}
              value={formData.email}
              onChangeText={(value) =>
                setFormData((cur) => ({ ...cur, email: value }))
              }
            />
            <InputField
              label="Password"
              placeholder="Enter Password"
              icon={icons.lock}
              value={formData.password}
              onChangeText={(value) =>
                setFormData((cur) => ({ ...cur, password: value }))
              }
              secureTextEntry
            />
          </View>

          <View className="flex gap-4">
            <CustomButton title="Sign Up" onPress={handleSignupPress} />
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
              <Text className="text-white">Already have an account ?</Text>
              <Link href="/(auth)/sign-in">
                <Text className="text-blue-400 font-bold">Log in</Text>
              </Link>
            </View>
          </View>
        </View>
        <ReactNativeModal>
          <View className="min-h-[350px] bg-dark-400 rounded-xl">
            <View className="flex items-center justify-center flex-1 mx-4 gap-6">
              <Image
                source={images.check}
                resizeMode="contain"
                className="h-24 w-24"
              />
              <View>
                <Text className="text-3xl text-center text-white font-bold">
                  Verified
                </Text>
                <Text className="text-lg text-white/70 my-3 text-center">
                  You have successfully verified your account.
                </Text>
              </View>
              <CustomButton
                title="Browse home"
                onPress={() => {
                  router.replace("/(root)/(tabs)/home");
                }}
              />
            </View>
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
