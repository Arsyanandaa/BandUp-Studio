import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, ZoomIn, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { CountUp, FadeInUp } from "@/components/home/animations";
import StreakFlame from "@/components/home/StreakFlame";
import { colors } from "@/styles/home";

const LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const CELL = 44;

export default function StreakScreen() {
  const { count = "0", days = "" } = useLocalSearchParams<{ count: string; days: string }>();
  const streak = Number(count);
  const status = days ? days.split(",") : [];
  const done = status.map((st, i) => (st === "done" ? i : -1)).filter((i) => i >= 0);
  const first = done[0] ?? 0;
  const pillWidth = done.length ? (done[done.length - 1] - first + 1) * CELL : 0;

  const width = useSharedValue(0);
  const pillStyle = useAnimatedStyle(() => ({ width: width.value }));

  useEffect(() => {
    width.value = withDelay(2100, withTiming(pillWidth, { duration: 700 }));
    const t = setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 2000);
    return () => clearTimeout(t);
  }, [pillWidth, width]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.close} hitSlop={12}>
        <Ionicons name="close" size={28} color={colors.white} />
      </Pressable>

      <StreakFlame />
      <CountUp value={streak} delay={600} duration={1400} style={styles.number} />
      <Animated.Text entering={FadeIn.delay(1800)} style={styles.caption}>day streak</Animated.Text>

      <View style={styles.week}>
        <View style={styles.row}>
          {LABELS.map((l, i) => (
            <Text key={l} style={[styles.label, status[i] === "today" && { color: colors.orange }]}>{l}</Text>
          ))}
        </View>
        <View style={styles.track}>
          <Animated.View style={[styles.pill, { left: first * CELL }, pillStyle]}>
            <Svg width={pillWidth || 1} height={32}>
              <Defs>
                <LinearGradient id="pill" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor="#FFA629" />
                  <Stop offset="1" stopColor="#FF5A5F" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="32" fill="url(#pill)" />
            </Svg>
          </Animated.View>
          <View style={styles.row}>
            {LABELS.map((l, i) => (
              <View key={l} style={styles.cell}>
                {status[i] === "done" ? (
                  <Animated.View entering={ZoomIn.delay(2400 + i * 120).springify().damping(8)}>
                    <Ionicons name="checkmark" size={20} color={colors.white} />
                  </Animated.View>
                ) : (
                  <View style={styles.dot} />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>

      <FadeInUp delay={3000}>
        <Text style={styles.message}>Streak kamu keren! Teruskan tiap hari.</Text>
      </FadeInUp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", padding: 20 },
  close: { position: "absolute", top: 56, left: 20 },
  number: { fontFamily: "Poppins_700Bold", fontSize: 96, color: colors.orange, marginTop: 8 },
  caption: { fontFamily: "Poppins_600SemiBold", fontSize: 22, color: colors.orange, marginBottom: 36 },
  week: { width: CELL * 7 },
  row: { flexDirection: "row" },
  label: { width: CELL, textAlign: "center", fontFamily: "Poppins_600SemiBold", fontSize: 12, color: colors.muted },
  track: { height: 40, marginTop: 8, justifyContent: "center" },
  pill: { position: "absolute", height: 32, borderRadius: 16, overflow: "hidden" },
  cell: { width: CELL, height: 40, alignItems: "center", justifyContent: "center" },
  dot: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.card },
  message: { fontFamily: "Poppins_400Regular", fontSize: 15, color: colors.white, textAlign: "center", marginTop: 36 },
});