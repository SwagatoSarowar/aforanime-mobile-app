import { CustomButton } from "@/components/CustomButton";
import { onboardingContent } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex >= onboardingContent.length - 1;

  return (
    <View className="flex-1 h-full bg-dark-500">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/get-started")}
        className="flex w-full justify-end items-end p-6 absolute top-10 -left-4 z-10"
      >
        <Text className="text-white text-md font-bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={setActiveIndex}
        renderPagination={(index, total, context) => (
          <View
            key={index}
            className="w-full flex items-center absolute bottom-48"
          >
            <View className="flex gap-2 flex-row justify-between">
              {Array.from({ length: total }).map((_, i) => (
                <View
                  key={i}
                  className={`h-1 w-10 rounded-full ${
                    i === index ? "bg-blue-500" : "bg-dark-300"
                  }`}
                />
              ))}
            </View>
          </View>
        )}
      >
        {onboardingContent.map((slide) => (
          <ImageBackground
            key={slide.id}
            className="h-full"
            source={slide.background}
          >
            <SafeAreaView className="flex h-full justify-center px-[30px]">
              <View>
                <Text className="text-center text-white font-bold text-[32px]">
                  {slide.title}
                </Text>
                <Text className="mt-10 text-center text-lg font-medium text-secondary">
                  {slide.description}
                </Text>
              </View>
            </SafeAreaView>
          </ImageBackground>
        ))}
      </Swiper>
      <View className="absolute bottom-16 w-full px-6">
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          className="mb-10"
          onPress={() => {
            isLastSlide
              ? router.replace("/(auth)/get-started")
              : swiperRef.current?.scrollBy(1);
          }}
        />
      </View>
    </View>
  );
}
