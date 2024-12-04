import { useAuth } from "@clerk/clerk-expo";
import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { CustomButton } from "./CustomButton";

export function LogoutModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { signOut } = useAuth();

  return (
    <ReactNativeModal isVisible={modalOpen}>
      <View className="min-h-[300px] w-full bg-dark-400 rounded-xl">
        <View className="flex items-center justify-center flex-1 mx-4 gap-6">
          <Text className="text-3xl text-center text-white font-bold">
            Are You Sure ?
          </Text>
          <View>
            <Text className="text-lg text-white/70 my-3 text-center">
              You will be signed out of the app. Do you want to proceed ?
            </Text>
          </View>
          <View className="flex flex-row gap-4">
            <CustomButton
              className="flex-1"
              title="Yes"
              variant="danger"
              onPress={() => signOut()}
            />
            <CustomButton
              className="flex-1"
              title="Cancel"
              variant="success"
              onPress={() => setModalOpen(false)}
            />
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
}
