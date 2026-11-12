import { ImageBackground, Text } from "react-native";
import { homeAssets } from "@/constants/homeAssets";
import { homeStyles as s } from "@/styles/home";
import { FadeInUp } from "./animations";

export default function HomeHeader({ name }: { name: string }) {
  return (
    <ImageBackground source={homeAssets.headerBg} style={s.headerWrap} resizeMode="cover">
      <FadeInUp delay={100}>
        <Text style={s.headerTitle}>The Ocean Moon</Text>
      </FadeInUp>
      <FadeInUp delay={250} style={s.headerGreetingRow}>
        <Text style={s.headerHello}>Hello, </Text>
        <Text style={s.headerName}>{name}</Text>
      </FadeInUp>
      <FadeInUp delay={400}>
        <Text style={s.headerSubtitle}>Teruskan langkah kecilmu, hari ini juga berarti</Text>
      </FadeInUp>
    </ImageBackground>
  );
}