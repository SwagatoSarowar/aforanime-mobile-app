import { DetailsScreen } from "@/components/DetailsScreen";
import { apiBaseUrl } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { useFirebaseRead } from "@/hooks/useFirebaseRead";
import { useFirebaseRemove } from "@/hooks/useFirebaseRemove";
import { useFirebaseWrite } from "@/hooks/useFirebaseWrite";
import { getYear } from "@/lib/utils";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AnimeDetails() {
  const { user } = useUser();
  const { id } = useLocalSearchParams();

  const { data, isPending } = useFetch(`${apiBaseUrl}/anime/${id}`);

  const { itemsId: wIds, refetch: wRefetch } = useFirebaseRead(
    `users/${user!.id}/watched`
  );
  const { itemsId: lIds, refetch: lRefetch } = useFirebaseRead(
    `users/${user!.id}/watch_later`
  );

  const {
    write: addToWatched,
    isLoading: isAddToWatchedLoading,
    isSuccess,
  } = useFirebaseWrite(`users/${user?.id || "catch"}/watched/${id}`);
  const { write: addToWatchLater, isLoading: isAddToWatchLaterLoading } =
    useFirebaseWrite(`users/${user?.id || "catch"}/watch_later/${id}`);

  const {
    remove: removeFromWatchLater,
    isLoading: isRemoveFromWatchLaterLoading,
  } = useFirebaseRemove(`users/${user?.id}/watch_later/${id}`);
  const { remove: removeFromWatched, isLoading: isRemoveFromWatchedLoading } =
    useFirebaseRemove(`users/${user?.id}/watched/${id}`);

  const [rating, setRating] = useState(0);

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-dark-500">
        <ActivityIndicator color="lightblue" size="large" />
      </View>
    );
  }

  const isInWatched = wIds.includes(id);
  const isInWatchLater = lIds.includes(id);

  const body = {
    mal_id: id,
    image: data?.data?.images?.webp?.image_url,
    title: data?.data?.title_english || data?.data?.title,
    releaseYear: getYear(data?.data?.aired?.from),
  };

  const refetch = function () {
    lRefetch();
    wRefetch();
  };

  const handleAddToWatchLater = function () {
    if (isInWatched) {
      removeFromWatched();
    }
    addToWatchLater(body);
    refetch();
  };
  const handleAddToWatched = function () {
    if (!rating) return;

    if (isInWatchLater) {
      removeFromWatchLater();
    }
    addToWatched({ ...body, personal_rating: rating });
    refetch();
  };

  const handleRemoveFromWatchLater = function () {
    removeFromWatchLater();
    refetch();
  };
  const handleRemoveFromWatched = function () {
    removeFromWatched();
    refetch();
  };

  return (
    <View className="flex-1 bg-dark-500">
      <DetailsScreen
        data={data.data}
        onAddToWatched={handleAddToWatched}
        onAddToWatchLater={handleAddToWatchLater}
        rating={rating}
        onRating={setRating}
        isAddToWatchLaterLoading={isAddToWatchLaterLoading}
        isAddToWatchedLoading={isAddToWatchedLoading}
        isAddToWatchedSuccess={isSuccess}
        isInWatchLater={isInWatchLater}
        isInWatched={isInWatched}
        isRemoveFromWatchLaterLoading={isRemoveFromWatchLaterLoading}
        onRemoveFromWatchLater={handleRemoveFromWatchLater}
        onRemoveFromWatched={handleRemoveFromWatched}
        isRemoveFromWatchedLoading={isRemoveFromWatchedLoading}
      />
    </View>
  );
}
