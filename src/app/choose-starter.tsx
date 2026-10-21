import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingStyles } from "../styles/onboarding";

// Type untuk satu karakter starter
type Starter = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

// Array of objects, ditaruh di luar komponen supaya tidak dibuat ulang tiap render
const STARTERS: Starter[] = [
  {
    id: "owl",
    title: "Owl Scholar",
    subtitle: "+10% XP in Reading",
    image: require("../../assets/images/owl-scholar.png"),
  },
  {
    id: "cat",
    title: "Ninja Cat",
    subtitle: "+15s Speaking Timer",
    image: require("../../assets/images/ninja-cat.png"),
  },
  {
    id: "fox",
    title: "Robo Fox",
    subtitle: "1 Extra Life per day",
    image: require("../../assets/images/robo-fox.png"),
  },
];

// Fungsi custom: cek apakah starter ini yang sedang dipilih
const isStarterSelected = (
  selectedId: string | null,
  starterId: string,
): boolean => selectedId === starterId;

const ChooseStarterScreen = () => {
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);

  return (
    <ImageBackground
      source={require("../../assets/images/bg-night.jpg")}
      resizeMode="cover"
      style={onboardingStyles.background}
    >
      <SafeAreaView style={onboardingStyles.safeArea}>
        <ScrollView
          contentContainerStyle={[onboardingStyles.container, styles.container]}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <View style={styles.arrowContainer}>
              <View style={styles.arrowShaft} />
              <View style={styles.arrowChevron} />
            </View>
          </TouchableOpacity>

          <View style={onboardingStyles.headerContainer}>
            <Text style={[onboardingStyles.screenTitle, styles.title]}>
              Choose your{"\n"}Starter
            </Text>
            <Text style={[onboardingStyles.screenSubtitle, styles.subtitle]}>
              Set your goal, you can change it later.
            </Text>
          </View>

          <View style={onboardingStyles.optionsContainer}>
            {STARTERS.map((starter) => {
              const isSelected = isStarterSelected(selectedStarter, starter.id);
              return (
                <TouchableOpacity
                  key={starter.id}
                  style={[styles.card, isSelected && styles.cardSelected]}
                  onPress={() => setSelectedStarter(starter.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={starter.image}
                      style={styles.cardImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{starter.title}</Text>
                    <Text style={styles.cardSubtitle}>{starter.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footerContainer}>
            <Link href="/rest-day" asChild>
              <TouchableOpacity
                disabled={selectedStarter === null}
                style={StyleSheet.flatten([
                  onboardingStyles.nextButton,
                  styles.nextButton,
                  { opacity: selectedStarter === null ? 0.5 : 1 },
                ])}
              >
                <Text style={onboardingStyles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  arrowContainer: {
    width: 24,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowShaft: {
    position: "absolute",
    width: 20,
    height: 3.5,
    backgroundColor: "#ffffff",
    borderRadius: 3,
    right: 0,
  },
  arrowChevron: {
    position: "absolute",
    left: 0,
    width: 12,
    height: 12,
    borderLeftWidth: 3.5,
    borderBottomWidth: 3.5,
    borderColor: "#ffffff",
    transform: [{ rotate: "45deg" }],
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 14,
  },
  card: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(149, 164, 252, 0.5)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: "100%",
    height: 110,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  cardSelected: {
    backgroundColor: "#95A4FC",
    borderColor: "#C4CDFF",
    shadowColor: "#8B9FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 80, // Offset for the image width to keep text centered visually
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#E0E7FF", // Slightly muted white/blue
    fontWeight: "500",
  },
  footerContainer: {
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 18,
  },
});

export default ChooseStarterScreen;
