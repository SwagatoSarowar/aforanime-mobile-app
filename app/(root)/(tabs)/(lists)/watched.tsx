import { Card } from "@/components/Card";
import { useFetch } from "@/hooks/useFetch";
import { getYear } from "@/lib/utils";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Watched() {
  const { data, isPending } = useFetch(
    "https://api.jikan.moe/v4/anime?limit=20"
  );
  return (
    <View className="flex-1 bg-dark-500">
      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      ) : (
        <FlatList
          contentContainerClassName="pb-[50px] mx-6"
          showsVerticalScrollIndicator={false}
          data={data?.data}
          keyExtractor={(item) => item.mal_id}
          ListHeaderComponent={() => (
            <View className="my-6 bg-dark-400 rounded-xl shadow-md shadow-black">
              <Text
                className="text-white text-xl font-semibold py-4 text-center"
                numberOfLines={2}
              >
                Anime You Already Watched
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="mb-3">
              <Link href={`/(root)/anime/${item.mal_id}`}>
                <Card
                  image={item?.images?.webp?.image_url}
                  title={item?.title_english || item.title}
                  releaseYear={getYear(item?.aired?.from) || "N/A"}
                  score={item?.score}
                />
              </Link>
            </View>
          )}
        />
      )}
    </View>
  );
}
