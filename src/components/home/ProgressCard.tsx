import { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { homeAssets } from "@/constants/homeAssets";
import { colors, homeStyles as s } from "@/styles/home";
import { CountUp, FadeInUp } from "./animations";

type Props = {
  percent: number;
  totalLabel: string;
  totalValue: string;
  details: string[];
};

const SIZE = 100;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ProgressCard({ percent, totalLabel, totalValue, details }: Props) {
  const target = Math.min(Math.max(percent, 0), 100);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(500, withTiming(target / 100, { duration: 1400, easing: Easing.out(Easing.cubic) }));
  }, [target, progress]);

  const ringProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  return (
    <FadeInUp delay={500}>
      <ImageBackground source={homeAssets.progressBg} style={s.progressCard} resizeMode="cover">
        <View style={s.progressContent}>
          <View style={s.progressRing}>
            <Svg width={SIZE} height={SIZE} style={{ transform: [{ rotate: "-90deg" }] }}>
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke={colors.white}
                strokeOpacity={0.25}
                strokeWidth={STROKE}
                fill="none"
              />
              <AnimatedCircle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke={colors.primary}
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                animatedProps={ringProps}
                fill="none"
              />
            </Svg>
            <CountUp value={target} delay={500} duration={1400} suffix="%" style={s.progressPercent} />
          </View>
          <View style={s.progressInfo}>
            <Text style={s.progressLabel}>{totalLabel}</Text>
            <Text style={s.progressValue}>{totalValue}</Text>
            {details.map((d) => (
              <Text key={d} style={s.progressSub}>{d}</Text>
            ))}
          </View>
        </View>
      </ImageBackground>
    </FadeInUp>
  );
}