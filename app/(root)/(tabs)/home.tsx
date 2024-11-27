import { Card } from "@/components/Card";
import { CustomButton } from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { TopRatedList } from "@/components/TopRatedList";
import { icons } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteFetch("https://api.jikan.moe/v4/seasons/now");
  const { data: topRatedAnime, isPending } = useFetch(
    "https://api.jikan.moe/v4/top/anime?page=1&limit=10"
  );

  const flattenData =
    data?.pages.reduce((acc, page) => acc.concat(page.data), []) || [];

  return (
    <SafeAreaView className="flex-1 bg-dark-500">
      <View className="mx-6 mt-4">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={flattenData}
          keyExtractor={(item) => item.mal_id}
          onEndReached={() => hasNextPage && fetchNextPage()}
          renderItem={({ item }) => (
            <View className="mb-3">
              <Link href={`/(root)/anime/${item.mal_id}`}>
                <Card
                  image={item?.images?.webp?.image_url}
                  title={item?.title_english || item.title}
                  releaseYear={item?.aired?.from?.split("-")[0] || "N/A"}
                  score={item?.score}
                />
              </Link>
            </View>
          )}
          ListHeaderComponent={
            <View className="bg-dark-500 rounded-b-lg">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-white text-2xl font-bold">
                  Welcome {user?.firstName}
                </Text>
                <TouchableOpacity
                  className="bg-danger rounded-full p-3"
                  onPress={() => setModalOpen(true)}
                >
                  <Image source={icons.logout} className="h-6 w-6" />
                </TouchableOpacity>
              </View>
              <View className="my-3">
                <InputField
                  iconLeft={icons.search}
                  iconLeftClass="ml-4"
                  placeholder="Search for Anime"
                />
              </View>

              <TopRatedList
                data={topRatedAnime?.data?.slice(0, 10)}
                isPending={isPending}
              />

              <Text className="text-white text-2xl font-bold my-4">
                Latest Anime
              </Text>
            </View>
          }
          ListFooterComponent={
            <View className="py-4 items-center justify-center">
              <ActivityIndicator color="lightblue" size="large" />
            </View>
          }
        />
      </View>
      <ReactNativeModal isVisible={modalOpen}>
        <View className="min-h-[300px] bg-dark-400 rounded-xl">
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
    </SafeAreaView>
  );
}
