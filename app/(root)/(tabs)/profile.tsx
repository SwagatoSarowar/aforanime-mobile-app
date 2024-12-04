import { CustomButton } from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { LogoutModal } from "@/components/LogoutModal";
import { icons, images } from "@/constants";
import { usePickImage } from "@/hooks/usePickImage";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { pickImage, image, setImage } = usePickImage();
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUplaodLoading] = useState(false);

  const handleUpdatePress = async function () {
    if (!userInfo.firstName) return;

    try {
      setLoading(true);
      await user?.update({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName || "",
      });

      Toast.show({ type: "success", text1: "Profile successfully updated." });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1:
          err?.errors?.[0]?.longMessage ||
          "Semthing went wrong while updating.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadProfileImagePress = async function () {
    if (!image) return;
    try {
      setImageUplaodLoading(true);
      await user?.setProfileImage({ file: image });

      Toast.show({ type: "success", text1: "Profile image uploaded." });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1:
          err?.errors?.[0]?.longMessage ||
          "Semthing went wrong while updating.",
      });
    } finally {
      setImageUplaodLoading(false);
      setImage(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-500">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[50px]"
        className="mx-6"
      >
        <View className="flex">
          <View className="flex flex-row gap-x-2">
            <TouchableOpacity
              className="p-4 mt-4"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            >
              <Image
                source={icons.backarrow}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="text-white self-center text-4xl leading-none mt-6 font-semibold">
              Your Profile
            </Text>
          </View>
          <TouchableOpacity onPress={pickImage}>
            <View className="flex items-center my-8 self-center relative">
              <Image
                source={
                  image
                    ? { uri: image }
                    : user?.imageUrl
                    ? { uri: user.imageUrl }
                    : images.placeholder
                }
                resizeMode="contain"
                className="h-40 w-40 rounded-full border-4 border-primary"
              />
              <View className="bg-white p-1 rounded-lg absolute bottom-2 right-4">
                <Image source={icons.galleryedit} className="w-6 h-6" />
              </View>
            </View>
          </TouchableOpacity>
          {image && (
            <TouchableOpacity
              onPress={handleUploadProfileImagePress}
              className="bg-success flex items-center justify-center mx-auto px-8 py-3 -mt-4 mb-4 rounded-2xl h-12"
            >
              {imageUploadLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
              )}
            </TouchableOpacity>
          )}
          <View className="bg-dark-400 px-4 py-6 rounded-2xl mb-8">
            <InputField
              label="First Name"
              icon={icons.edit}
              iconSide="right"
              containerStyle={{ backgroundColor: "#363c47" }}
              value={userInfo.firstName || ""}
              onChangeText={(value) =>
                setUserInfo((cur) => ({ ...cur, firstName: value }))
              }
            />
            <InputField
              label="Last Name"
              icon={icons.edit}
              iconSide="right"
              containerStyle={{ backgroundColor: "#363c47" }}
              value={userInfo.lastName || ""}
              onChangeText={(value) =>
                setUserInfo((cur) => ({ ...cur, lastName: value }))
              }
            />
            <UnEditableField
              label="Email"
              value={user?.emailAddresses?.[0].emailAddress || ""}
              icon={icons.edit}
            />
            <UnEditableField
              label="Email Status"
              value="Verified"
              icon={icons.edit}
              valueStyle={{ color: "#0aff7c" }}
            />
          </View>
          <CustomButton
            title="Update"
            variant="success"
            onPress={handleUpdatePress}
            isLoading={loading}
            disabled={
              !userInfo.firstName ||
              (userInfo.firstName === user?.firstName &&
                userInfo.lastName === user?.lastName)
            }
          />
          <CustomButton
            className="mt-6"
            title="Log Out"
            variant="danger"
            onPress={() => setModalOpen(true)}
          />
        </View>

        <LogoutModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </ScrollView>
    </SafeAreaView>
  );
}

const UnEditableField = function ({
  label,
  icon,
  value,
  valueStyle,
}: {
  label: string;
  icon: ImageSourcePropType;
  value: string;
  valueStyle?: StyleProp<TextStyle>;
}) {
  return (
    <View className="mt-3">
      <Text className="text-lg text-white font-semibold mb-3">{label}</Text>
      <View className="flex flex-row justify-start items-center relative rounded-full bg-[#363c47] border-2 border-dark-300 opacity-50">
        <Text
          style={valueStyle}
          numberOfLines={1}
          className="w-[90%] text-white text-xl font-bold py-4 pl-4"
        >
          {value}
        </Text>

        <Image resizeMode="contain" className="h-6 w-6 -mr-2" source={icon} />
      </View>
    </View>
  );
};
