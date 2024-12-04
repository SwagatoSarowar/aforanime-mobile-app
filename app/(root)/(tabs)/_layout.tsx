import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const _tabs = [
  {
    name: "home",
    title: "Home",
    icon: icons.home,
  },
  {
    name: "(lists)",
    title: "Lists",
    icon: icons.listcheck,
  },
  {
    name: "search/[query]",
    title: "Search",
    icon: icons.search2,
  },
  {
    name: "profile",
    title: "Profile",
    icon: icons.profile,
  },
];

const TabIcon = function ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) {
  return (
    <View>
      <View
        className={`p-4 rounded-full ${focused ? "bg-primary" : "opacity-50"}`}
      >
        <Image source={source} className="w-6 h-6" resizeMode="contain" />
      </View>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#2B3035",
          borderColor: "#55595D77",
          borderTopWidth: 2,
        },
        tabBarLabelPosition: "beside-icon",
      }}
    >
      {_tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon key={tab.name} source={tab.icon} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
