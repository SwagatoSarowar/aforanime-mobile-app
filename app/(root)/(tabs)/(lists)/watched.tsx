import { Card } from "@/components/Card";
import { icons } from "@/constants";
import { useFirebaseRead } from "@/hooks/useFirebaseRead";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

export default function Watched() {
  const { user } = useUser();
  const { data, isLoading } = useFirebaseRead(`users/${user!.id}/watched`);

  return (
    <View className="flex-1 bg-dark-500">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      ) : (
        <FlatList
          contentContainerClassName="pb-[50px] mx-6"
          showsVerticalScrollIndicator={false}
          data={data.length}
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
                  source={icons.notfound}
                  resizeMode="contain"
                  className="h-16 w-16 opacity-30"
                />
                <Text className="text-dark-300 text-xl text-center font-bold">
                  You haven't added any watched anime yet.
                </Text>
              </View>
            </View>
          }
        />
      )}
    </View>
  );
}
