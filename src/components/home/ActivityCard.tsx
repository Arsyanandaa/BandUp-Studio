import { Image, ImageSourcePropType, Text } from "react-native";
import { homeStyles as s } from "@/styles/home";
import { FadeInUp, PressableScale } from "./animations";

export type Activity = {
  id: string;
  image: ImageSourcePropType;
  category: string;
  title: string;
  duration: string;
};

type Props = Activity & { index?: number; onPress?: () => void };

export default function ActivityCard({ image, category, title, duration, index = 0, onPress }: Props) {
  return (
    <FadeInUp from="right" delay={1000 + index * 150}>
      <PressableScale style={s.activityCard} onPress={onPress}>
        <Image source={image} style={s.activityImage} resizeMode="cover" />
        <Text style={s.activityCategory}>{category}</Text>
        <Text style={s.activityMeta}>
          {title} • {duration}
        </Text>
      </PressableScale>
    </FadeInUp>
  );
}