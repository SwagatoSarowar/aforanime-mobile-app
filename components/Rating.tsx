import { images } from "@/constants";
import { RatingProps } from "@/types/type";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const _ratings = [
  {
    rating: 1,
    icon: images.star1ball,
    silhouette: images.dragonballsilhouette,
  },
  {
    rating: 2,
    icon: images.star2ball,
    silhouette: images.dragonballsilhouette,
  },
  {
    rating: 3,
    icon: images.star3ball,
    silhouette: images.dragonballsilhouette,
  },
  {
    rating: 4,
    icon: images.star4ball,
    silhouette: images.dragonballsilhouette,
  },
  {
    rating: 5,
    icon: images.star5ball,
    silhouette: images.dragonballsilhouette,
  },
  {
    rating: 6,
    icon: images.star6ball,
    silhouette: images.dragonballsilhouette,
  },
  {
    rating: 7,
    icon: images.star7ball,
    silhouette: images.dragonballsilhouette,
  },
  {
    rating: 8,
    icon: images.dragonballgroup,
    silhouette: images.dragonballgroupsilhouette,
  },
  {
    rating: 9,
    icon: images.dragonballgroupwithaura,
    silhouette: images.dragonballgroupsilhouette,
  },
  {
    rating: 10,
    icon: images.shenron,
    silhouette: images.shenronsilhouette,
  },
];

const ratingTerms = [
  "Terrible",
  "Awful",
  "Bad",
  "Mediocre",
  "Average",
  "Decent",
  "Good",
  "Great",
  "Amazing",
  "A Masterpiece",
];

export function Rating({
  defaultRating = 0,
  onRating,
  showInitialText = false,
}: RatingProps) {
  const [rating, setRating] = useState(defaultRating || 0);

  const handleRatingPress = function (
    currentRating: number,
    clickedRating: number
  ) {
    if (currentRating === clickedRating) {
      setRating(0);
      onRating && onRating(0);
    } else {
      setRating(clickedRating);
      onRating && onRating(clickedRating);
    }
  };

  return (
    <View>
      <View className="flex flex-row items-center mx-auto gap-[2px]">
        {_ratings.map((r) => (
          <Pressable
            key={r.rating}
            onPress={() => handleRatingPress(rating, r.rating)}
          >
            <Image
              key={r.rating}
              source={rating < r.rating ? r.silhouette : r.icon}
              className={`${
                r.rating === 10
                  ? "w-9 h-16"
                  : r.rating === 9
                  ? "w-10 h-10"
                  : r.rating === 8
                  ? "w-9 h-9"
                  : "w-7 h-7"
              } ${rating < r.rating ? "opacity-30" : ""}`}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </View>
      <View className="h-8">
        {rating !== 0 ? (
          <Text className="text-warning font-semibold flex flex-row items-center text-xl text-center">
            {ratingTerms[rating - 1]}
          </Text>
        ) : (
          showInitialText && (
            <Text className="text-dark-100 mt-3 italic font-semibold text-xs text-center">
              Give your personal Rating
            </Text>
          )
        )}
      </View>
    </View>
  );
}
