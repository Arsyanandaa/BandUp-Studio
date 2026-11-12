import { Image, Text, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { homeAssets } from "@/constants/homeAssets";
import { homeStyles as s } from "@/styles/home";
import { FadeInUp, Pulse } from "./animations";

export type DayStatus = "done" | "today" | "pending" | "rest";
export type WeekDay = { label: string; status: DayStatus };
type Props = { days: WeekDay[]; streakText: string };

export default function WeeklyStreak({ days, streakText }: Props) {
  return (
    <FadeInUp delay={600} style={s.weekly}>
      <View style={s.weeklyLabels}>
        {days.map((d) => (
          <Text key={d.label} style={s.weeklyLabel}>{d.label}</Text>
        ))}
      </View>

      <View style={s.weeklyTrack}>
        {days.map((d, i) => {
          const done = d.status === "done";
          const today = d.status === "today";
          const prevDone = days[i - 1]?.status === "done";
          const nextDone = days[i + 1]?.status === "done";

          const circle = (
            <View style={[s.weeklyCircle, done && s.weeklyCircleDone, today && s.weeklyCircleToday]}>
              {done && (
                <Animated.View entering={ZoomIn.delay(1000 + i * 90).springify().damping(8)}>
                  <Image source={homeAssets.tracker.flame} style={s.weeklyFlame} resizeMode="contain" />
                </Animated.View>
              )}
            </View>
          );

          return (
            <FadeInUp key={d.label} delay={800 + i * 80} style={s.weeklyCell}>
              {done && (
                <View
                  style={[
                    s.weeklySegment,
                    !prevDone && s.weeklySegmentStart,
                    !nextDone && s.weeklySegmentEnd,
                  ]}
                />
              )}
              {today ? <Pulse scale={1.15}>{circle}</Pulse> : circle}
            </FadeInUp>
          );
        })}
      </View>

      <View style={s.weeklyFooter}>
        <View style={s.weeklyFooterLeft}>
          <Image source={homeAssets.tracker.flameSmall} style={s.weeklyIcon} resizeMode="contain" />
          <Text style={s.weeklyFooterText}>{streakText}</Text>
        </View>
        <View style={s.weeklyFooterRight}>
          <Image source={homeAssets.tracker.badge1} style={s.weeklyIcon} resizeMode="contain" />
          <Image source={homeAssets.tracker.badge2} style={s.weeklyIcon} resizeMode="contain" />
        </View>
      </View>
    </FadeInUp>
  );
}