import { CustomButton } from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { icons, images } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    profileImage: user?.imageUrl,
  });

  console.log(user?.imageUrl);

  return (
    <ScrollView
      contentContainerClassName="pb-[150px]"
      className="flex-1 bg-dark-500"
    >
      <SafeAreaView className="mx-6">
        <View className="flex">
          <Text className="text-white text-4xl mt-6 font-semibold">
            Your Profile
          </Text>
          <View className="flex items-center my-8 self-center relative">
            <Image
              source={
                user?.imageUrl ? { uri: user.imageUrl } : images.placeholder
              }
              resizeMode="contain"
              className="h-40 w-40 rounded-full border-4 border-primary"
            />
            <View className="bg-white p-1 rounded-lg absolute bottom-2 right-4">
              <Image source={icons.galleryedit} className="w-6 h-6" />
            </View>
          </View>
          <View className="bg-dark-400 px-4 py-6 rounded-2xl mb-8">
            <InputField
              label="First Name"
              containerClass="bg-[#363c47]"
              iconRight={icons.edit}
              value={userInfo.firstName || ""}
              onChangeText={(value) =>
                setUserInfo((cur) => ({ ...cur, firstName: value }))
              }
            />
            <InputField
              label="Last Name"
              containerClass="bg-[#363c47]"
              iconRight={icons.edit}
              value={userInfo.lastName || ""}
              onChangeText={(value) =>
                setUserInfo((cur) => ({ ...cur, lastName: value }))
              }
            />
            <InputField
              label="Email"
              containerClass="bg-[#363c47]"
              iconRight={icons.edit}
              value={user?.emailAddresses[0].emailAddress || ""}
              editable={false}
              inputClass="opacity-80"
              iconRightClass="opacity-50"
            />
            <InputField
              label="Email Status"
              containerClass="bg-[#363c47]"
              iconRight={icons.edit}
              iconRightClass="opacity-50"
              editable={false}
              inputClass="text-green-400 opacity-80"
              value="Verified"
            />
          </View>
          <CustomButton
            title="Update"
            variant="success"
            disabled={
              !userInfo.firstName ||
              (userInfo.firstName === user?.firstName &&
                userInfo.lastName === user?.lastName)
            }
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
