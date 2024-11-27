import { CustomButton } from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { OAuth } from "@/components/OAuth";
import { OTPInputField } from "@/components/OTPInputField";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import Toast from "react-native-toast-message";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [code, setCode] = useState("");
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    type: "input",
  });

  const handleSignupPress = async function () {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName: data.name,
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setModalStatus({ isOpen: true, type: "input" });
    } catch (err: any) {
      console.log(JSON.stringify(err));
      Toast.show({ type: "error", text1: err.errors[0].longMessage });
    }
  };

  const handleVerifyPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setModalStatus({ isOpen: true, type: "success" });
      } else {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.log(JSON.stringify(err));
      Toast.show({ type: "error", text1: err.errors[0].longMessage });
    }
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
              iconLeft={icons.person}
              value={data.name}
              onChangeText={(value) =>
                setData((cur) => ({ ...cur, name: value }))
              }
            />
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
            <CustomButton title="Sign Up" onPress={handleSignupPress} />
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
        </View>

        <ReactNativeModal isVisible={modalStatus.isOpen}>
          <View className="min-h-[350px] bg-dark-400 rounded-xl">
            {modalStatus.type === "input" ? (
              <View className="flex items-center justify-center flex-1 mx-4 gap-6">
                <Text className="text-2xl text-center text-white font-bold">
                  Verify Your Email
                </Text>
                <OTPInputField value={code} setValue={setCode} />
                <View>
                  <Text className="text-lg text-white/70 my-3 text-center">
                    Please enter the code sent to{" "}
                    {data.email || "to your email"} here.
                  </Text>
                </View>
                <CustomButton
                  variant="success"
                  title="Verify"
                  onPress={handleVerifyPress}
                />
              </View>
            ) : (
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
                    setModalStatus((cur) => ({ ...cur, isOpen: false }));
                    router.replace("/(root)/(tabs)/home");
                  }}
                />
              </View>
            )}
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
