import { Image, Text, View } from "react-native";
import { homeAssets } from "@/constants/homeAssets";
import { homeStyles as s } from "@/styles/home";
import { CountUp, FadeInUp, PressableScale, Wiggle } from "./animations";

type Props = { count: number; label?: string; onPress?: () => void };

export default function StreakBadge({ count, label = "Streak Days", onPress }: Props) {
  return (
    <PressableScale onPress={onPress} style={{ flex: 1 }}>
      <FadeInUp delay={700} style={[s.badge, { flex: 1 }]}>
        <View>
          <CountUp value={count} delay={900} duration={900} style={s.badgeNumber} />
          <Text style={s.badgeLabel}>{label}</Text>
        </View>
        <Wiggle style={s.badgeFlame}>
          <Image source={homeAssets.tracker.flameStreak} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
        </Wiggle>
      </FadeInUp>
    </PressableScale>
  );
}