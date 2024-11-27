import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

const TopRatedAnimeCard = function ({
  activeItem,
  item,
}: {
  activeItem: any;
  item: any;
}) {
  const zoomIn: any = {
    0: {
      scale: 0.9,
    },
    1: {
      scale: 1,
    },
  };
  const zoomOut: any = {
    0: {
      scale: 1,
    },
    1: {
      scale: 0.9,
    },
  };

  return (
    <Link href={`/(root)/anime/${item.mal_id}`}>
      <Animatable.View
        duration={500}
        animation={activeItem?.mal_id === item?.mal_id ? zoomIn : zoomOut}
        className="p-2 h-[250px] w-[161px] rounded-md bg-dark-400 mr-2"
      >
        <Image
          source={{ uri: item?.images?.webp?.image_url }}
          resizeMode="contain"
          className="h-[200px] w-[145px] rounded-lg"
        />
        <Text
          className="text-white text-center font-semibold text-lg my-3"
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </Animatable.View>
    </Link>
  );
};

export function TopRatedList({
  data,
  isPending,
}: {
  data: any;
  isPending: boolean;
}) {
  const [activeItem, setActiveItem] = useState<any>(data?.[0]);

  return (
    <View>
      <Text className="text-white text-2xl font-bold mb-2">Top Rated</Text>
      {isPending ? (
        <View className="h-[250px] items-center justify-center">
          <ActivityIndicator color="lightblue" size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.mal_id}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setActiveItem(viewableItems[0].item);
            }
          }}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TopRatedAnimeCard item={item} activeItem={activeItem} />
          )}
        />
      )}
    </View>
  );
}
