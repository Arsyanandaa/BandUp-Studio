import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { Stack } from "expo-router";

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="choose-band" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="daily-goal" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="choose-starter" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="rest-day" options={{ gestureEnabled: false }} />
      </Stack>
    </ThemeProvider>
  );
};