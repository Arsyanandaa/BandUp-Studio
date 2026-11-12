import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/user-context";
import { onboardingStyles } from "../styles/onboarding";

const TREE_IMAGE = require("../../assets/images/tree.png");

const ReadyScreen = () => {
  const { name: contextName } = useUser();
  const params = useLocalSearchParams<{ name?: string }>();
  const [dots, setDots] = useState(".........");
  const [isLoaded, setIsLoaded] = useState(false);

  // Nama tersinkron dari context atau route params
  const displayName = contextName || params.name || "Zoe";

  // Animasi progress bar loading
  const progressAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animasi progress bar mengisi dari 0% ke 100%
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3500,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setIsLoaded(true);
        Animated.timing(buttonFadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }
    });

    // Animasi titik-titik pada teks loading
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 9 ? "..." : prev + ".."));
    }, 450);

    return () => clearInterval(interval);
  }, [progressAnim, buttonFadeAnim]);

  const widthInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["4%", "100%"],
  });

  const handleFinish = () => {
    // Lanjut ke tabs (home)
    router.replace("/(tabs)/home" as any);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg-night.jpg")}
      resizeMode="cover"
      style={onboardingStyles.background}
    >
      <SafeAreaView style={onboardingStyles.safeArea}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Ready, {displayName}?</Text>
            <Text style={styles.subtitle}>
              Your Journey{"\n"}Begins now!
            </Text>
          </View>

          {/* Tree Illustration */}
          <View style={styles.treeContainer}>
            <Image
              source={TREE_IMAGE}
              style={styles.treeImage}
              resizeMode="contain"
            />
          </View>

          {/* Footer Section: Loading or Next Button */}
          <View style={styles.footerContainer}>
            {isLoaded ? (
              <Animated.View
                style={[styles.buttonWrapper, { opacity: buttonFadeAnim }]}
              >
                <TouchableOpacity
                  style={[onboardingStyles.nextButton, styles.nextButton]}
                  onPress={handleFinish}
                  activeOpacity={0.8}
                >
                  <Text style={onboardingStyles.nextButtonText}>
                    Selanjutnya
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <View style={styles.loadingWrapper}>
                <View style={styles.loadingBarTrack}>
                  <Animated.View
                    style={[styles.loadingBarFill, { width: widthInterpolate }]}
                  />
                </View>
                <Text style={styles.loadingText}>
                  Loading Your Adventure{dots}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#c4cdff",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
  },
  treeContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "auto",
    overflow: "visible",
  },
  treeImage: {
    width: "120%",
    height: 330,
    maxWidth: 460,
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    minHeight: 70,
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 18,
    backgroundColor: "#95A4FC",
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingWrapper: {
    width: "100%",
    alignItems: "center",
  },
  loadingBarTrack: {
    width: "92%",
    maxWidth: 340,
    height: 28,
    backgroundColor: "rgba(90, 105, 140, 0.55)",
    borderRadius: 999,
    padding: 3.5,
    overflow: "hidden",
  },
  loadingBarFill: {
    height: "100%",
    backgroundColor: "#7DF9FF",
    borderRadius: 999,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  loadingText: {
    color: "#c4cdff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 14,
    letterSpacing: 0.3,
  },
});

export default ReadyScreen;
