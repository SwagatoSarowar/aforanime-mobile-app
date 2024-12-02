import { icons } from "@/constants";
import { getDuration, getVariantStyle, getYear } from "@/lib/utils";
import { CustomButtonProps, DetailsScreenProps } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { CustomButton } from "./CustomButton";
import { Rating } from "./Rating";

const sWidth = Dimensions.get("screen").width;

const imageWidth = sWidth;
const imageHeight = 400;

export function DetailsScreen({
  data,
  rating: defaultRating,
  onRating,
  onAddToWatchLater,
  onRemoveFromWatchLater,
  isAddToWatchLaterLoading = false,
  isRemoveFromWatchLaterLoading = false,
  onAddToWatched,
  onRemoveFromWatched,
  isAddToWatchedLoading = false,
  isRemoveFromWatchedLoading = false,
  isAddToWatchedSuccess = false,
  isInWatchLater = false,
  isInWatched = false,
}: DetailsScreenProps) {
  const {
    title_english,
    title,
    images,
    score,
    rank,
    popularity,
    type,
    aired,
    status,
    episodes,
    duration,
    genres,
    synopsis,
    rating: pgRating,
    producers,
    licensors,
    studios,
    mal_id,
  } = data;

  const { user } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(20);
  const imageOpacity = useSharedValue(1);
  const imageScale = useSharedValue(1.1);

  const insets = useSafeAreaInsets();

  const animatedTitleStyle = useAnimatedStyle(
    () => ({
      opacity: titleOpacity.value,
      transform: [{ translateX: titleTranslateX.value }],
    }),
    []
  );

  const animatedImageStyle = useAnimatedStyle(
    () => ({
      opacity: imageOpacity.value,
      transform: [{ scale: imageScale.value }],
    }),
    []
  );

  const handleAnimatedScroll = useAnimatedScrollHandler((event) => {
    titleOpacity.value = interpolate(
      event.contentOffset.y,
      [imageHeight - 50, imageHeight + 50],
      [0, 1]
    );

    titleTranslateX.value = interpolate(
      event.contentOffset.y,
      [imageHeight - 50, imageHeight + 50],
      [20, 0],
      Extrapolation.CLAMP
    );

    imageOpacity.value = interpolate(
      event.contentOffset.y,
      [0, imageHeight],
      [1, 0]
    );

    imageScale.value = interpolate(
      event.contentOffset.y,
      [0, imageHeight],
      [1.1, 1],
      Extrapolation.CLAMP
    );
  });

  useEffect(() => {
    if (isAddToWatchedSuccess) setIsModalOpen(false);
  }, [isAddToWatchedSuccess]);

  return (
    <>
      <View
        className="absolute bg-dark-500 z-50 rounded-full left-2"
        style={{ top: insets.top }}
      >
        <Pressable onPress={() => router.back()} className="p-4">
          <Image
            source={icons.backarrow}
            className="h-6 w-6"
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <Animated.View
        style={[
          { position: "absolute", top: 0, left: 0, transformOrigin: "top" },
          animatedImageStyle,
        ]}
      >
        <Image
          style={{ height: imageHeight, width: imageWidth }}
          source={{ uri: images?.webp?.large_image_url }}
        />
        <LinearGradient
          colors={["transparent", "#212529"]}
          className="absolute w-full h-full"
        />
      </Animated.View>
      <SafeAreaView className="flex-1">
        <Animated.View
          className="shadow-black shadow-lg bg-dark-500 absolute p-4 z-10 border-b-2 border-dark-100/20"
          style={[
            {
              paddingTop: insets.top + 10,
              width: imageWidth,
            },
            animatedTitleStyle,
          ]}
        >
          <Text
            className="text-white text-2xl font-bold ml-14 mr-6"
            numberOfLines={1}
          >
            {title_english || title}
          </Text>
        </Animated.View>
        <Animated.ScrollView
          onScroll={handleAnimatedScroll}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          contentContainerClassName="pb-[100px]"
        >
          <View style={{ marginTop: imageHeight }}>
            <Text
              className="text-white font-bold text-3xl mx-6 -translate-y-10"
              numberOfLines={1}
            >
              {title_english || title}
            </Text>
            {/* ========================== SCORE AND RANKING =========================== */}
            <View className="mx-6">
              <View className="flex flex-row justify-between">
                <View className="flex gap-1 items-stretch">
                  <Text className="bg-primary text-white uppercase text-sm font-black rounded-md text-center p-1">
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
                  <Text className="bg-warning uppercase text-sm font-black rounded-md text-center p-1">
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
                  <Text className="bg-pink-600 text-white uppercase text-sm font-black rounded-md text-center p-1">
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

            {/* ========================== ACTION BUTTONS =========================== */}
            <View className="flex items-center gap-4 py-4 bg-dark-500 mx-6">
              {isInWatchLater ? (
                <ActionButton
                  title="Remove From Watch Later"
                  icon={icons.trash}
                  onPress={onRemoveFromWatchLater}
                  variant="danger"
                  isLoading={isRemoveFromWatchLaterLoading}
                />
              ) : (
                <ActionButton
                  title="Add To Watch Later"
                  icon={icons.add}
                  onPress={onAddToWatchLater}
                  isLoading={isAddToWatchLaterLoading}
                />
              )}

              {isInWatched ? (
                <ActionButton
                  title="Remove From Watched"
                  icon={icons.trash}
                  onPress={onRemoveFromWatched}
                  variant="danger"
                  isLoading={isRemoveFromWatchedLoading}
                />
              ) : (
                <ActionButton
                  title="Add To Watched List"
                  icon={icons.heart}
                  onPress={() => setIsModalOpen(true)}
                  variant="success"
                />
              )}
            </View>

            {/* ========================== TYPE, STATUS, EPISODE AND PGR =========================== */}
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
              <View className="border-t border-dark-500 mt-3 pt-3">
                <Text className="mx-6 text-center text-white">{pgRating}</Text>
              </View>
            </View>

            {/* ========================== GENRES =========================== */}
            <View className="bg-dark-500">
              <View className="mx-6">
                <FlatList
                  data={genres}
                  contentContainerClassName="mx-auto py-4"
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={({ item }) => (
                    <Text className="text-[#009DFF] text-lg font-bold">
                      {item.name}
                    </Text>
                  )}
                  ItemSeparatorComponent={() => (
                    <View className="bg-[#009DFF] h-2.5 w-2.5 rounded-full self-center mx-3" />
                  )}
                />
              </View>
            </View>

            {/* ========================== SYNOPSIS =========================== */}
            <View className="bg-dark-400 mb-2">
              <View className="mx-6 py-4">
                <Text className="text-dark-100 text-2xl font-bold mb-2 text-center">
                  [Synopsis]
                </Text>
                <Text className="text-white text-lg font-medium text-justify">
                  {synopsis}
                </Text>
              </View>
            </View>
          </View>
          {/* ====================== PRODUCERS, LICENSORS AND STUDIOS ================= */}

          {producers.length > 0 && (
            <View className="bg-dark-500 py-2 mx-6">
              <Text className="text-dark-100 font-bold text-xl mb-1">
                Producers:
              </Text>
              <Text className="text-white italic text-base">
                {producers?.map((p: any) => p?.name).join(", ")}
              </Text>
            </View>
          )}
          {licensors.length > 0 && (
            <View className="bg-dark-500 py-2 mx-6">
              <Text className="text-dark-100 font-bold text-xl mb-1">
                Licensors:
              </Text>
              <Text className="text-white italic text-base">
                {licensors?.map((p: any) => p?.name).join(", ")}
              </Text>
            </View>
          )}
          {studios.length > 0 && (
            <View className="bg-dark-500 py-2 mx-6">
              <Text className="text-dark-100 font-bold text-xl mb-1">
                Studios:
              </Text>
              <Text className="text-white italic text-base">
                {studios?.map((p: any) => p?.name).join(", ")}
              </Text>
            </View>
          )}

          {/* ====================== RATING MODAL ================= */}
          <ReactNativeModal isVisible={isModalOpen}>
            <View className="min-h-[300px] bg-dark-400 rounded-xl">
              <View className="flex items-center justify-center flex-1 mx-4 gap-6">
                <View>
                  <Text className="text-white text-center my-6 text-xl capitalize font-semibold">
                    Give{" "}
                    <Text className="text-warning italic font-bold normal-case">
                      "{title_english || title}"
                    </Text>{" "}
                    your personal rating.
                  </Text>
                  <Rating defaultRating={defaultRating} onRating={onRating} />
                </View>
                <View className="flex flex-row gap-4">
                  <CustomButton
                    className="flex-1"
                    title="Rate"
                    variant="success"
                    onPress={onAddToWatched}
                    isLoading={isAddToWatchedLoading}
                  />
                  <CustomButton
                    className="flex-1"
                    title="Cancel"
                    variant="danger"
                    onPress={() => setIsModalOpen(false)}
                  />
                </View>
              </View>
            </View>
          </ReactNativeModal>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
}

const ActionButton = function ({
  variant,
  title,
  icon,
  isLoading = false,
  onPress,
}: {
  variant?: CustomButtonProps["variant"];
  title: string;
  icon?: ImageSourcePropType;
  isLoading?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      className={`${getVariantStyle(variant)} px-4 py-3 rounded-xl`}
      onPress={onPress}
    >
      {isLoading && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator color="white" />
        </View>
      )}
      <View
        style={{ opacity: isLoading ? 0 : 1 }}
        className="flex flex-row items-center gap-3"
      >
        <Image source={icon} resizeMode="contain" className="h-6 w-6" />
        <Text className="text-white text-lg font-semibold text-center">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
