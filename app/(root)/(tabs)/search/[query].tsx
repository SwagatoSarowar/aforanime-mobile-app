import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>This is search page and you searched for {query}</Text>
    </SafeAreaView>
  );
}
