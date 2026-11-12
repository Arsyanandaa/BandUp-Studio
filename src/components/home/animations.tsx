import * as Haptics from "expo-haptics";
import { ReactNode, useEffect, useState } from "react";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import Animated, {
  FadeInRight,
  FadeInUp as EnterUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type BoxProps = { children: ReactNode; style?: StyleProp<ViewStyle> };

export const tap = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export function FadeInUp({ delay = 0, from = "bottom", children, style }: BoxProps & { delay?: number; from?: "bottom" | "right" }) {
  const entering = from === "right" ? FadeInRight : EnterUp;
  return (
    <Animated.View entering={entering.delay(delay).springify().damping(16)} style={style}>
      {children}
    </Animated.View>
  );
}

type PressProps = BoxProps & { onPress?: () => void; haptic?: boolean };

export function PressableScale({ onPress, haptic = true, children, style }: PressProps) {
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.94, { damping: 15, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 7, stiffness: 220 });
      }}
      onPress={() => {
        if (haptic) tap();
        onPress?.();
      }}
    >
      <Animated.View style={[style, animated]}>{children}</Animated.View>
    </Pressable>
  );
}

export function Pulse({ scale = 1.1, duration = 700, children, style }: BoxProps & { scale?: number; duration?: number }) {
  const value = useSharedValue(1);
  useEffect(() => {
    value.value = withRepeat(
      withSequence(withTiming(scale, { duration }), withTiming(1, { duration })),
      -1,
    );
  }, [scale, duration, value]);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: value.value }] }));
  return <Animated.View style={[style, animated]}>{children}</Animated.View>;
}

export function Wiggle({ angle = 6, duration = 600, children, style }: BoxProps & { angle?: number; duration?: number }) {
  const rotate = useSharedValue(-angle);
  useEffect(() => {
    rotate.value = withRepeat(withTiming(angle, { duration }), -1, true);
  }, [angle, duration, rotate]);
  const animated = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotate.value}deg` }] }));
  return <Animated.View style={[style, animated]}>{children}</Animated.View>;
}

type CountProps = {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  style?: StyleProp<TextStyle>;
};

export function CountUp({ value, duration = 1200, delay = 0, suffix = "", style }: CountProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const timer = setTimeout(() => {
      const start = Date.now();
      const step = () => {
        const t = Math.min((Date.now() - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, duration, delay]);

  return <Text style={style}>{display}{suffix}</Text>;
}