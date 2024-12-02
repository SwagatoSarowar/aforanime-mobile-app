import { Card } from "@/components/Card";
import { InputField } from "@/components/InputField";
import { TopRatedList } from "@/components/TopRatedList";
import { apiBaseUrl, icons } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useUser();
  const [query, setQuery] = useState("");

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteFetch(
    `${apiBaseUrl}/seasons/now`
  );
  const { data: topRatedAnime, isPending } = useFetch(
    `${apiBaseUrl}/top/anime?page=1&limit=10`
  );
  const flattenData =
    data?.pages.reduce((acc, page) => acc.concat(page.data), []) || [];

  const handleSearch = function () {
    if (!query) return;

    router.replace(`/search/${query}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-500">
      <View className="mt-4">
        <FlatList
          contentContainerClassName="pb-14"
          initialNumToRender={10}
          scrollEventThrottle={32}
          onViewableItemsChanged={(info) => {
            viewableItems.value = info.viewableItems;
          }}
          showsVerticalScrollIndicator={false}
          data={flattenData}
          keyExtractor={(item) => `main-list${item?.mal_id}`}
          onEndReached={() => hasNextPage && fetchNextPage()}
          renderItem={({ item }) => (
            <View className="mb-3 mx-6">
              <Link href={`/(root)/anime/${item.mal_id}`}>
                <Card
                  image={item?.images?.webp?.image_url}
                  title={item?.title_english || item.title}
                  releaseYear={item?.aired?.from?.split("-")[0] || "N/A"}
                  score={item?.score}
                  id={item?.mal_id}
                  viewableItems={viewableItems}
                />
              </Link>
            </View>
          )}
          ListHeaderComponent={
            <View className="bg-dark-500 rounded-b-lg">
              <View className="mx-6">
                <View className="flex flex-row items-center justify-between">
                  <Text
                    className="text-white text-2xl font-bold"
                    numberOfLines={1}
                  >
                    Welcome {user?.firstName}
                  </Text>
                  <Link href="/(root)/profile">
                    <Image
                      source={{ uri: user?.imageUrl }}
                      className="h-14 w-14 rounded-full border-2 border-dark-400"
                      resizeMode="contain"
                    />
                  </Link>
                </View>
                <View className="my-3">
                  <InputField
                    icon={icons.search}
                    iconSide="right"
                    placeholder="Search for Anime"
                    onSubmitEditing={handleSearch}
                    onIconPress={handleSearch}
                    value={query}
                    onChangeText={setQuery}
                  />
                </View>
              </View>

              <TopRatedList
                data={topRatedAnime?.data?.slice(0, 10)}
                isPending={isPending}
              />

              <Text className="text-white text-2xl font-bold my-4 mx-6">
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
    </SafeAreaView>
  );
}
