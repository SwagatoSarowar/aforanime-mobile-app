import { Card } from "@/components/Card";
import { icons } from "@/constants";
import { useFirebaseRead } from "@/hooks/useFirebaseRead";
import { useUser } from "@clerk/clerk-expo";
import { useIsFocused } from "@react-navigation/native";
import { Link } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

export default function Watchlater() {
  const isFocused = useIsFocused();
  const { user } = useUser();
  const { data, refetch, isLoading } = useFirebaseRead(
    `users/${user!.id}/watch_later`
  );

  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <View className="flex-1 bg-dark-500">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      ) : (
        <FlatList
          refreshing={isLoading}
          onRefresh={refetch}
          contentContainerClassName="pb-[50px] mx-6"
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item: any) => item.mal_id}
          ListHeaderComponent={() => (
            <View className="my-6 bg-dark-400 rounded-xl shadow-md shadow-black">
              <Text
                className="text-white text-xl font-semibold py-4 text-center"
                numberOfLines={2}
              >
                Anime You Want to Watch Later
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="mb-3">
              <Link href={`/(root)/anime/${item.mal_id}`}>
                <Card
                  image={item?.image}
                  title={item?.title}
                  releaseYear={item?.releaseYear}
                  score={item?.score}
                />
              </Link>
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{ height: Dimensions.get("screen").height - 400 }}
              className="flex-1 justify-center items-center"
            >
              <View className="flex items-center gap-y-4">
                <Image
                  source={icons.empty}
                  resizeMode="contain"
                  className="h-20 w-20 opacity-30"
                />
                <Text className="text-dark-300 text-xl font-bold text-center">
                  You dont have any anime to wath later.
                </Text>
              </View>
            </View>
          }
        />
      )}
    </View>
  );
}
