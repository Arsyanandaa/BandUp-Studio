import { Tabs } from "expo-router";
import CustomTabBar from "@/components/home/CustomTabBar";

export const unstable_settings = { initialRouteName: "home" };

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="sleep" />
      <Tabs.Screen name="meditate" />
      <Tabs.Screen name="music" />
      <Tabs.Screen name="afsar" />
    </Tabs>
  );
}