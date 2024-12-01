import { icons } from "@/constants";
import { CardProps } from "@/types/type";
import { Image, Text, View } from "react-native";

export function Card({ image, title, releaseYear, score }: CardProps) {
  return (
    <View className="flex flex-row items-center justify-center bg-dark-400 rounded-lg shadow-md shadow-black">
      <View className="w-full">
        <View className="flex flex-row items-center justify-between gap-4 mr-3">
          <Image
            source={{
              uri: image,
            }}
            className="w-[85px] h-[120px] rounded-l-lg"
          />

          <View className="flex flex-col gap-y-5 flex-1">
            <Text
              className="text-xl fontsemidbold text-white"
              numberOfLines={1}
            >
              {title}
            </Text>

            <View className="flex flex-row items-center gap-8">
              <View className="flex flex-row items-center gap-x-2">
                <Image source={icons.calendar} className="h-4 w-4" />
                <Text className="text-md text-white" numberOfLines={1}>
                  {releaseYear}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <Text className="bg-primary px-1 text-sm text-white font-bold rounded-md">
                  Score
                </Text>
                <Text className="text-md text-white" numberOfLines={1}>
                  {score}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
