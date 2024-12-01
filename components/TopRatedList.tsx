import { router } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const sWidth = Dimensions.get("screen").width;

export function TopRatedList({
  data,
  isPending,
}: {
  data: any;
  isPending: boolean;
}) {
  const scrollX = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View>
      <Text className="text-white text-2xl font-bold mb-2 mx-6">Top Rated</Text>
      {isPending ? (
        <View className="h-[250px] items-center justify-center">
          <ActivityIndicator color="lightblue" size="large" />
        </View>
      ) : (
        <Animated.FlatList
          scrollEventThrottle={16}
          removeClippedSubviews={false}
          keyExtractor={(item) => item.mal_id}
          onScroll={handleScroll}
          data={data}
          renderItem={({ item, index }) => (
            <TopRatedAnimeCard item={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      )}
    </View>
  );
}

const TopRatedAnimeCard = function ({
  item,
  index,
  scrollX,
}: {
  item: any;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * sWidth, index * sWidth, (index + 1) * sWidth],
            [-(sWidth * 0.5), 0, sWidth * 0.5],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * sWidth, index * sWidth, (index + 1) * sWidth],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * sWidth, index * sWidth, (index + 1) * sWidth],
        [0.3, 1, 0.3],
        Extrapolation.CLAMP
      ),
    }),
    []
  );

  return (
    <Animated.View
      className="items-center justify-center h-[250px]"
      style={[
        {
          width: sWidth,
        },
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={() => router.replace(`/(root)/anime/${item.mal_id}`)}
        className="px-2 py-3 gap-y-2 rounded-md bg-dark-400"
      >
        <Image
          source={{ uri: item?.images?.webp?.image_url }}
          resizeMode="contain"
          className="h-[200px] w-[150px] rounded-lg"
        />
        <Text
          className="text-white text-center font-semibold text-lg w-[150px]"
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

/* =============================== OLD CODE (KEEPING FOR FUTURE REFERENCE IF NEEDED) ============================ */

/* export function TopRatedList({
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
} */

/* const TopRatedAnimeCard = function ({
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
 */
