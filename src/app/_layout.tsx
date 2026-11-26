import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  router,
  useRootNavigationState,
  useSegments,
} from "expo-router"; // BARU: tambah router, useRootNavigationState, useSegments
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react"; // BARU
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { AuthProvider, useAuth } from "@/context/auth-context"; // BARU: tambah useAuth
import { UserProvider } from "@/context/user-context";

SplashScreen.preventAutoHideAsync();

// BARU: ini satpamnya
function AuthGate() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const navState = useRootNavigationState();

  useEffect(() => {
    if (!navState?.key) return; // navigasi belum siap, tunggu
    if (loading) return; // satpam masih ngecek, tahan dulu

    const first = (segments as string[])[0];
    const isPublicPage =
      first === undefined || first === "login" || first === "register";

    if (!session && !isPublicPage) {
      router.replace("/login");
    } else if (session && isPublicPage) {
      router.replace("/choose-band");
    }
  }, [session, loading, segments, navState?.key]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <AnimatedSplashOverlay />
          <AuthGate />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen
              name="choose-band"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="daily-goal"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="choose-starter"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="rest-day"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="your-name"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="ready"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="streak" options={{ animation: "fade" }} />
            <Stack.Screen
              name="reading"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="listening"
              options={{ animation: "slide_from_right" }}
            />
          </Stack>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}