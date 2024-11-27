import { icons } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeDetails() {
  const { id } = useLocalSearchParams();
  const { data, isPending } = useFetch(`https://api.jikan.moe/v4/anime/${id}`);
  const imageHeight = (Dimensions.get("screen").width / 300) * 450;

  return (
    <View className="flex-1 bg-dark-500 justify-center items-center">
      <View className="absolute bg-dark-500/80 p-3 rounded-full top-10 left-6 z-50">
        <Link href="/(root)/(tabs)/home">
          <Image source={icons.backarrow} className="h-6 w-6" />
        </Link>
      </View>
      {isPending ? (
        <ActivityIndicator size="large" color="lightblue" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          contentContainerClassName="pb-[100px]"
          className="flex-1 bg-dark-500"
        >
          <View style={{ height: imageHeight }} className="relative">
            <Image
              source={{ uri: data?.data?.images?.webp?.large_image_url }}
              className="h-full"
            />
            <LinearGradient
              colors={["transparent", "#212529"]}
              className="absolute w-full h-full"
            />
            <Text
              className="absolute bottom-8 text-white font-bold text-3xl mx-6"
              numberOfLines={2}
            >
              {data?.data?.title}
            </Text>
          </View>
          <SafeAreaView className="mx-6">
            <Text className="text-base font-semibold text-white">
              {data?.data?.synopsis}
            </Text>
          </SafeAreaView>
        </ScrollView>
      )}
    </View>
  );
}
