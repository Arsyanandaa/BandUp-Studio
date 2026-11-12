import Animated, { ZoomIn } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { Pulse, Wiggle } from "./animations";

export default function StreakFlame({ size = 150 }: { size?: number }) {
  return (
    <Animated.View entering={ZoomIn.springify().damping(7)}>
      <Wiggle angle={3} duration={900}>
        <Pulse scale={1.05} duration={900}>
          <Svg width={size} height={size * 1.2} viewBox="0 0 100 120">
            <Defs>
              <LinearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#FF5A5F" />
                <Stop offset="1" stopColor="#FFA629" />
              </LinearGradient>
            </Defs>
            <Path
              d="M50 4C58 24 92 40 92 74C92 102 74 116 50 116C26 116 8 102 8 74C8 56 18 46 26 38C26 50 32 56 38 58C34 36 42 16 50 4Z"
              fill="#FFD400"
            />
            <Path
              d="M50 20C56 36 80 48 80 74C80 94 66 106 50 106C34 106 20 94 20 74C20 62 26 54 32 48C34 56 38 60 42 60C40 44 44 30 50 20Z"
              fill="url(#flame)"
            />
            <Path d="M50 62C56 70 62 76 62 84C62 91 57 96 50 96C43 96 38 91 38 84C38 76 44 70 50 62Z" fill="#FFFFFF" />
          </Svg>
        </Pulse>
      </Wiggle>
    </Animated.View>
  );
}