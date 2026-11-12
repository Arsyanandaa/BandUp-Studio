import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors, homeStyles as s } from "@/styles/home";
import { tap } from "./animations";

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>["tabBar"]>>[0];
type IconName = keyof typeof Ionicons.glyphMap;

const TABS: Record<string, { label: string; icon: IconName }> = {
  home: { label: "Home", icon: "home" },
  sleep: { label: "Sleep", icon: "moon" },
  meditate: { label: "Meditate", icon: "leaf" },
  music: { label: "Music", icon: "musical-notes" },
  afsar: { label: "Afsar", icon: "person" },
};

function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      scale.value = withSequence(withTiming(0.7, { duration: 90 }), withSpring(1, { damping: 5, stiffness: 220 }));
    }
  }, [focused, scale]);

  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animated}>
      <Ionicons name={name} size={24} color={focused ? colors.white : colors.muted} />
    </Animated.View>
  );
}

export default function CustomTabBar({ state, emitter, navigateToTab }: TabBarProps) {
  const [xs, setXs] = useState<Record<string, number>>({});
  const pillX = useSharedValue(0);
  const ready = useRef(false);

  useEffect(() => {
    const x = xs[state.routes[state.index].key];
    if (x === undefined) return;
    if (!ready.current) {
      pillX.value = x;
      ready.current = true;
    } else {
      pillX.value = withSpring(x, { damping: 14, stiffness: 170 });
    }
  }, [state.index, state.routes, xs, pillX]);

  const pillStyle = useAnimatedStyle(() => ({ transform: [{ translateX: pillX.value }] }));

  return (
    <View style={s.tabBar}>
      <Animated.View style={[s.tabPillSlider, pillStyle]} />
      {state.routes.map((route, index) => {
        const tab = TABS[route.name];
        if (!tab) return null;
        const focused = state.index === index;

        const onPress = () => {
          const event = emitter.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            tap();
            navigateToTab(route.key);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={s.tabItem}
            onLayout={(e) => {
              const { x, width } = e.nativeEvent.layout;
              const center = x + (width - 52) / 2;
              setXs((prev) => (prev[route.key] === center ? prev : { ...prev, [route.key]: center }));
            }}
          >
            <View style={s.tabPill}>
              <TabIcon name={tab.icon} focused={focused} />
            </View>
            <Text style={[s.tabLabel, focused && s.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}