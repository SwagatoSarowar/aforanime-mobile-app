import { DetailsScreen } from "@/components/DetailsScreen";
import { useFetch } from "@/hooks/useFetch";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AnimeDetails() {
  const { id } = useLocalSearchParams();
  const { data, isPending } = useFetch(`https://api.jikan.moe/v4/anime/${id}`);

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-dark-500">
        <ActivityIndicator color="lightblue" size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark-500">
      <DetailsScreen data={data.data} />
    </View>
  );
}
