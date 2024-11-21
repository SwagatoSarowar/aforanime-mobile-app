import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="watched-list" />
      <Tabs.Screen name="watch-later" />
    </Tabs>
  );
}
