import { Card } from "@/components/Card";
import { InputField } from "@/components/InputField";
import { apiBaseUrl, icons } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { query: searchedQuery } = useLocalSearchParams();
  const [query, setQuery] = useState("");

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const { data, isPending } = useFetch(
    `${apiBaseUrl}/anime?q=${searchedQuery}`
  );

  const handleSearch = function () {
    if (!query) return;

    router.replace(`/search/${query}`);
  };

  const uniqueData = data?.data?.filter(
    (item: any, index: any, self: any[]) => {
      return (
        self.findIndex(
          (obj: { mal_id: any }) => obj?.mal_id === item.mal_id
        ) === index
      );
    }
  );

  return (
    <SafeAreaView className="flex-1 bg-dark-500">
      <FlatList
        contentContainerClassName="pb-20"
        scrollEventThrottle={32}
        onViewableItemsChanged={(info) => {
          viewableItems.value = info.viewableItems;
        }}
        showsVerticalScrollIndicator={false}
        data={searchedQuery ? uniqueData : []}
        ListEmptyComponent={() => (
          <View
            style={{ height: Dimensions.get("screen").height - 350 }}
            className="flex-1 justify-center items-center"
          >
            {isPending ? (
              <ActivityIndicator size="large" color="lightblue" />
            ) : !searchedQuery ? (
              <View className="flex items-center gap-y-4">
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  className="h-16 w-16 opacity-40"
                />
                <Text className="text-dark-300 text-2xl font-bold mx-6">
                  Search to see the anime list.
                </Text>
              </View>
            ) : (
              <View className="flex items-center gap-y-4">
                <Image
                  source={icons.notfound}
                  resizeMode="contain"
                  className="h-16 w-16 opacity-20"
                />
                <Text className="text-dark-300 text-2xl font-bold">
                  No Anime Found
                </Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => `search-list-${item?.mal_id}`}
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

            <Text
              className="text-white text-2xl font-bold mt-4 mb-6 mx-6 italic"
              numberOfLines={2}
            >
              {searchedQuery && `"${searchedQuery}"`}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
