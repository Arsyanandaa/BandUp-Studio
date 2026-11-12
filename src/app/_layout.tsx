import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });
  if (!fontsLoaded) return null;
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="choose-band" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="daily-goal" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="choose-starter" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="rest-day" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="streak" options={{ animation: "fade" }} />
        <Stack.Screen name="reading" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="listening" options={{ animation: "slide_from_right" }} />
      </Stack>
    </ThemeProvider>
  );
}
