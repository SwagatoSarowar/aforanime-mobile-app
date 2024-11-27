import { CustomButton } from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { OAuth } from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [data, setData] = useState({ email: "", password: "" });
  const { signOut } = useAuth();

  const handleSigninPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        Toast.show({
          type: "success",
          text1: "Login Complete.",
          visibilityTime: 1500,
          onHide: () => router.replace("/(root)/(tabs)/home"),
        });
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.log(JSON.stringify(err));
      Toast.show({ type: "error", text1: err.errors[0].longMessage });
    }
  }, [isLoaded, data]);

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
              iconLeft={icons.email}
              value={data.email}
              onChangeText={(value) =>
                setData((cur) => ({ ...cur, email: value }))
              }
            />
            <InputField
              label="Password"
              placeholder="Enter Password"
              iconLeft={icons.lock}
              value={data.password}
              onChangeText={(value) =>
                setData((cur) => ({ ...cur, password: value }))
              }
              secureTextEntry
            />
          </View>

          <View className="flex gap-4">
            <CustomButton title="Sign In" onPress={handleSigninPress} />
            <View className="flex gap-4 flex-row items-center justify-between">
              <View className="h-[1px] flex-1 bg-dark-300" />
              <Text className="text-white font-bold">Or</Text>
              <View className="h-[1px] flex-1 bg-dark-300" />
            </View>

            <OAuth />

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
