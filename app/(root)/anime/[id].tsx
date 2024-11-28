import { icons } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { getDuration, getYear } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeDetails() {
  const { id } = useLocalSearchParams();
  const imageHeight = (Dimensions.get("screen").width / 300) * 450;
  const { data, isPending } = useFetch(`https://api.jikan.moe/v4/anime/${id}`);

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-dark-500">
        <ActivityIndicator color="lightblue" size="large" />
      </View>
    );
  }

  const {
    title,
    images,
    score,
    scored_by,
    rank,
    popularity,
    type,
    aired,
    status,
    episodes,
    duration,
    genres,
    trailer,
    synopsis,
  } = data?.data;

  return (
    <View className="flex-1 bg-dark-500">
      <TouchableOpacity
        className="absolute bg-dark-400/90 p-3 rounded-full top-10 left-6 z-50"
        onPress={() => router.replace("/(root)/(tabs)/home")}
      >
        <Image source={icons.backarrow} className="h-6 w-6" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        contentContainerClassName="pb-[100px]"
        className="flex-1 bg-dark-500"
      >
        <View style={{ height: imageHeight }} className="relative">
          <Image
            source={{ uri: images?.webp?.large_image_url }}
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
            {title}
          </Text>
        </View>
        <SafeAreaView className="-mt-10">
          {/* ========================== SCORE AND RANKING =========================== */}
          <View className="mx-6 mb-4">
            <View className="flex flex-row justify-between">
              <View className="flex gap-1 items-stretch">
                <Text className="bg-primary text-white uppercase text-xs font-semibold text-center p-1">
                  Score
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-white text-3xl text-center font-black"
                >
                  {score}
                </Text>
              </View>
              <View className="flex gap-1 items-stretch">
                <Text className="bg-warning uppercase text-xs font-semibold text-center p-1">
                  rankded
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-white text-3xl text-center font-black"
                >
                  {rank}
                </Text>
              </View>
              <View className="flex gap-1 items-stretch">
                <Text className="bg-pink-600 text-white uppercase text-xs font-semibold text-center p-1">
                  popularity
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-white text-3xl text-center font-black"
                >
                  {popularity}
                </Text>
              </View>
            </View>
          </View>

          {/* ========================== TYPE AND STATUS =========================== */}
          <View className="bg-dark-400 py-4">
            <View className="flex flex-row items-center justify-between mx-6">
              <Text className="text-white">
                {type},{getYear(aired.from)}
              </Text>
              <Text className="text-white">{status}</Text>
              <Text className="text-white">
                {episodes} ep, {getDuration(duration)}
              </Text>
            </View>
          </View>

          {/* ========================== GENRES =========================== */}
          <View className="py-4">
            <View className="flex flex-row justify-between items-center mx-6">
              {genres.map((genre: any, index: number) => (
                <Fragment key={genre.mal_id}>
                  <Text className="text-[#009DFF] font-semibold">
                    {genre.name}
                  </Text>
                  {index < 2 && (
                    <View className="bg-[#009DFF] h-2 w-2 rounded-full" />
                  )}
                </Fragment>
              ))}
            </View>
          </View>

          {/* ========================== TRAILER =========================== */}
          {/* <View></View> */}

          {/* ========================== SYNOPSIS =========================== */}
          <View className="bg-dark-400">
            <View className="mx-6 py-4">
              <Text className="text-white text-lg font-medium text-justify">
                {synopsis}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
